---
title: "From the Abstract Model to a Stan Implementation"
date: 2026-06-14
author: "Jeff Helzner"
slug: "seu-sensitivity-foundations-part-2-estimating-sensitivity-from-choices"
description: "Turning the abstract SEU sensitivity model into a concrete Stan implementation, and naming the modeling choices the implementation commits us to."
summary: "Three choices turn the abstract softmax-over-expected-utility model into something we can fit: how features map to subjective probabilities, how ordered utilities are parameterized, and which priors we place on the resulting parameters."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","stan","bayesian-modeling","series:seu-sensitivity-foundations"]
series: "Foundations of SEU Sensitivity"
part: 2
draft: true
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html">
        <meta name="robots" content="noindex, nofollow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "From the Abstract Model to a Stan Implementation",
          "description": "Turning the abstract SEU sensitivity model into a concrete Stan implementation, and naming the modeling choices the implementation commits us to.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-06-14",
          "dateModified": "2026-05-14",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Stan", "Bayesian decision model", "softmax choice", "linear feature mapping", "Dirichlet prior", "lognormal prior"]
        }
        </script>
---

::: {.series-nav}
**Foundations of SEU Sensitivity** · Part 2 of 3  
[Part 1](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) · Part 2 · [Part 3](seu-sensitivity-foundations-03-when-measurement-is-meaningful.html)
:::

The previous post introduced the abstract object the SEU sensitivity framework is built around. Each alternative has an expected utility, choices are governed by a softmax over those expected utilities, and a single positive parameter `alpha` controls how sharply choices concentrate on the alternative that the expected-utility ranking favors. Low `alpha` corresponds to nearly uniform choice; high `alpha` approaches deterministic SEU maximization.

That description is useful as an interpretive frame, but it is not yet a model we can fit. To compute anything from observed choices, we have to make three additional decisions.

First, the abstract model takes the subjective probabilities `psi` as given. Real applications do not. We need to say where `psi` comes from.

Second, the abstract model requires utilities that are ordered and standardized to the unit interval. We need a parameterization that enforces those constraints and that we can put priors on.

Third, every parameter in a Bayesian model needs a prior. The choice of prior matters here in a particular way, because the priors on `alpha`, on the feature-to-belief mapping, and on the utility increments jointly determine what kinds of decision behavior the model regards as plausible before any data arrive.

This post walks through each of these three choices as the `m_0` Stan model makes them. The point is not to retrace the Stan source line by line — the foundational implementation report does that. The point is to name the choices, say what each one commits us to, and what could in principle be changed.

## What the Stan program estimates

It helps to start with the parameter block, because every later decision is a decision about one of these three objects.

```stan
parameters {
  real<lower=0> alpha;     // Sensitivity
  matrix[K, D] beta;       // Feature-to-probability mapping
  simplex[K-1] delta;      // Utility increments
}
```

There are three groups of parameters. `alpha` is the sensitivity scalar from Part 1, constrained to be non-negative. `beta` is a `K x D` matrix that will convert the `D`-dimensional feature vector of each alternative into a probability distribution over `K` possible consequences. `delta` is a `(K-1)`-simplex that will become the spacing between ordered utilities on the unit interval.

Nothing in the abstract framework forced these particular objects to exist. They are the answer the `m_0` model gives to the three modeling questions above. The remainder of this post discusses each one.

## Choice 1: A linear-in-features softmax for subjective probabilities

The first decision is how features of an alternative determine the decision maker's beliefs about its possible consequences.

The `m_0` model takes a simple route. Each alternative has a feature vector `w[r]` of dimension `D`. The model multiplies that vector by `beta` and pushes the result through a softmax:

```stan
psi[i] = softmax(beta * x[i]);
```

Equivalently,

$$
\psi_{r,k} \;=\; \frac{\exp(\beta_{k,\cdot} \cdot w_r)}{\sum_{j=1}^{K} \exp(\beta_{j,\cdot} \cdot w_r)}.
$$

This embeds three substantive commitments worth naming.

The first is **linearity in features**. The log-odds of each consequence are taken to be a linear function of the feature representation. Whether that assumption is innocuous depends on how the features were constructed. In an LLM-based study where features come from a high-dimensional embedding projected to a smaller space, a linear softmax may already be quite flexible. In a domain with hand-crafted features that interact non-trivially, a linear map can be restrictive. The foundational report notes the alternatives — a nonlinear function in place of `beta * w`, hierarchical variation in `beta` across problem types, or constraints on `beta` informed by domain knowledge — but the default model uses the linear form because it is interpretable and computationally cheap.

The second is **a shared coefficient matrix**. The same `beta` applies to every alternative. The model does not learn one mapping for one alternative and a different mapping for another; it learns a single rule that turns feature vectors into belief vectors. That is what gives the model leverage: when two alternatives appear in different problems, their estimated beliefs are tied together through `beta`.

The third is a familiar **identifiability subtlety**. The softmax is invariant to adding the same constant to every row of `beta`, so only the contrasts between rows of `beta` are identified from `psi`. The `m_0` model does not pin one row to zero; it leaves the redundancy and relies on the prior on `beta` to keep the sampler well-behaved. The consequence for interpretation is that individual entries of `beta` should not be read in isolation — only differences between rows, or the induced probabilities `psi`, are meaningful.

What we get in exchange for these commitments is something quite useful: a way to let observed features carry information about beliefs without having to elicit `psi` directly, and a single object — `beta` — that the data can refine as more choices are observed.

## Choice 2: Ordered utilities built from a simplex

The second decision is how to parameterize utilities so that the SEU machinery still has the interpretation we want.

Part 1 emphasized that the sensitivity parameter `alpha` only has a stable meaning once the utility scale is fixed. If we are allowed to multiply every utility difference by a constant, we can offset that by dividing `alpha` by the same constant, and the model produces identical choice probabilities. The standardization that fixes this is the convention that the worst consequence has utility 0, the best has utility 1, and the intermediate consequences are ordered between them.

The `m_0` model enforces both the ordering and the standardization through an incremental construction:

```stan
upsilon = cumulative_sum(append_row(0, delta));
```

Here `delta` is a `(K-1)`-simplex (non-negative entries summing to 1). Prepending a zero and taking the cumulative sum produces a vector `upsilon` of length `K` with `upsilon[1] = 0`, `upsilon[K] = 1`, and `upsilon[k] <= upsilon[k+1]` for every `k`. Ordering and standardization come out automatically, by construction.

This is one of several possible parameterizations. We could have parameterized the interior utilities directly with constraints, or used an `ordered` vector and rescaled. The simplex-and-cumulative-sum route has the practical advantage that it makes the *spacing* the unknown, which is the quantity a prior on utilities should naturally express.

This is where the third group of choices — the priors — starts to bite. The default prior on the utility increments is

```stan
delta ~ dirichlet(rep_vector(1, K-1));
```

a symmetric Dirichlet with concentration 1, which is uniform over the simplex. Every valid configuration of utility spacings is equally likely a priori. For the moderate case `K = 3`, this means the middle utility has a prior mean of 0.5 and a prior standard deviation of roughly 0.29 — broad but not pathological.

Two things are worth flagging about this default. The prior is intentionally weakly informative; it expresses no preference for how utilities should be spaced. And it has a subtle dependence on `K`: as `K` grows, the marginal distribution of each increment concentrates around `1/(K-1)`, which means interior utilities cluster more tightly around equally spaced values. For larger `K`, a different concentration parameter may better express the prior uncertainty one actually has.

## Choice 3: A lognormal prior on alpha

The third decision is the prior on the sensitivity parameter itself.

The default in `m_0` is

```stan
alpha ~ lognormal(0, 1);
```

Lognormal is a natural choice because it has positive support, matching the constraint `alpha >= 0`. With location 0 and scale 1, the median is 1, the mean is about 1.65, and the 95% interval is approximately `[0.14, 7.1]`.

What does that mean substantively? Recall from Part 1 the three regimes implied by the sensitivity parameter. Very low `alpha` produces nearly uniform random choice. Moderate `alpha` produces probabilistic choice that visibly favors higher expected-utility alternatives. Very high `alpha` produces near-deterministic SEU maximization. A Lognormal(0, 1) prior on `alpha` places non-trivial mass across all three of these regimes. It does not assume in advance that the decision maker is nearly random, nor that the decision maker is nearly an SEU maximizer.

That breadth is appropriate as an exploratory default but it is also the prior that most often needs adjustment in real applications. A study of LLM decision behavior, for example, may have prior reasons to expect substantial sensitivity — the temperature study replaces this default with `Lognormal(3.0, 0.75)`, whose median sits near 20 rather than 1, because the foundational default places almost all of its mass well below the regime where LLM choice data actually live. The next post returns to how that kind of mismatch is detected and corrected; the point here is only that the prior on `alpha` is the one most directly tied to a substantive assumption about the application domain.

The default prior on `beta` is similarly weakly informative: each entry receives an independent standard normal. In log-odds units, that places roughly 95% of coefficients within `±2`, allowing probability ratios per unit feature change up to about `e^2 ≈ 7.4` — moderately informative, but not narrow.

## Putting the pieces together

With `psi`, `upsilon`, and `alpha` in hand, the rest of the model is mechanical. Expected utilities are computed as inner products,

$$
\eta_r \;=\; \psi_r^{\top}\, \upsilon \;=\; \sum_{k=1}^{K} \psi_{r,k}\, \upsilon_k,
$$

and choice probabilities follow the softmax rule from Part 1,

$$
\chi_{m,r} \;=\; \frac{\exp(\alpha \cdot \eta_r)}{\sum_{j \in \text{problem } m} \exp(\alpha \cdot \eta_j)}.
$$

The full model block is correspondingly compact:

```stan
model {
  // Priors
  alpha ~ lognormal(0, 1);
  to_vector(beta) ~ std_normal();
  delta ~ dirichlet(rep_vector(1, K-1));

  // Likelihood
  for (m in 1:M) {
    y[m] ~ categorical(chi[m]);
  }
}
```

Every commitment to subjective expected utility lives in that last loop. The model treats each observed choice `y[m]` as a draw from the categorical distribution over alternatives in problem `m`, with probabilities given by `softmax(alpha * eta_problem)`. If observed choices repeatedly favor alternatives whose model-implied expected utility is higher, the posterior for `alpha` will tend upward. If choices look weakly related to the expected-utility ranking, the posterior will support lower sensitivity values.

## What we have committed to

It is worth pausing on the explicit list, because the rest of this series turns on it.

The `m_0` model assumes:

- The log-odds of each consequence are *linear* in the features of an alternative, with the same coefficient matrix used across all alternatives.
- Utilities are *ordered* on the standardized `[0, 1]` interval, parameterized by a Dirichlet-distributed simplex of increments.
- The sensitivity parameter `alpha` follows a *lognormal* prior with substantial mass across the random / moderate / sharp regimes.
- The feature-to-belief coefficients follow weakly informative independent standard normal priors.
- Conditional on `psi` and `upsilon`, choices in different problems are *exchangeable*: the same alternative appearing in two problems shares its expected utility but is not required to be chosen identically.

None of these is forced by the abstract framework from Part 1. Each was made because it is interpretable and computationally clean. Each could be changed — and in some applications should be.

That brings us to the question of whether the implementation works. We have a model. We have priors. We have a way to compute a posterior. But none of that is yet evidence that the posterior we will eventually report is one we should trust.

The next post takes up that question. It is organized around the modern Bayesian workflow: prior predictive checks, parameter recovery, simulation-based calibration, and posterior predictive checks. Each of those four steps interrogates a different aspect of the modeling choices laid out above — and the foundational reports run them on `m_0` precisely so that later applications inherit a model whose behavior we already understand.

## Sources

This post draws primarily on [Concrete Implementation: The m_0 Stan Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/02_concrete_implementation.html), with background from [Abstract Formulation of the SEU Sensitivity Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html). The applied prior choice mentioned briefly above is from the [Initial Temperature Study](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html).
