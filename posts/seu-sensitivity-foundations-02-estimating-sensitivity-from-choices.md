---
title: "Estimating SEU Sensitivity From Choices"
date: 2026-06-14
author: "Jeff Helzner"
slug: "seu-sensitivity-foundations-part-2-estimating-sensitivity-from-choices"
description: "How observed choices become evidence about sensitivity to subjective expected utility, and why the result should be treated as an uncertain estimate."
summary: "A sensitivity estimate is not assigned directly to a decision maker. It is inferred from observed choices through a model of beliefs, utilities, expected utilities, and probabilistic choice."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","bayesian-modeling","series:seu-sensitivity-foundations"]
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
          "headline": "Estimating SEU Sensitivity From Choices",
          "description": "How observed choices become evidence about sensitivity to subjective expected utility, and why the result should be treated as an uncertain estimate.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-06-14",
          "dateModified": "2026-05-02",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Bayesian decision model", "prior predictive analysis", "AI decision evaluation", "uncertainty"]
        }
        </script>
---

::: {.series-nav}
**Foundations of SEU Sensitivity** · Part 2 of 3  
[Part 1](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) · Part 2 · [Part 3](seu-sensitivity-foundations-03-when-measurement-is-meaningful.html)
:::

The previous post introduced the main interpretive idea behind SEU Sensitivity. Once subjective expected utility is used as a reference standard, we can ask how strongly a decision maker's choices track expected-utility differences. The sensitivity parameter `alpha` captures that relationship: low `alpha` corresponds to weak sensitivity, high `alpha` corresponds to more consistent choice of expected-utility-favored alternatives, and the limiting cases connect random choice to deterministic SEU maximization.

That interpretation is useful, but it leaves a measurement question unanswered.

In real applications, we do not get to observe sensitivity directly. We observe choices. A model, an AI assistant, a person, or a human-machine process is presented with decision problems and selects alternatives. From those choices, we have to infer how the decision maker is related to the SEU standard.

That is why the SEU Sensitivity framework is Bayesian. The result is not a naked score. It is an estimate with uncertainty.

## What the model observes

The initial implementation, called `m_0` in the foundational reports, begins with a study design.

There is a collection of decision problems. Each problem presents a subset of alternatives. Each alternative has observable features. The decision maker chooses one of the available alternatives in each problem.

That setup is deliberately general. It can represent paired comparisons, multi-alternative tasks, insurance triage options, policy choices, or experimental prompts where an AI system must choose among possible actions. The model does not require that every alternative appear in every problem. It only needs to know which alternatives were available and which one was chosen.

From the observer's point of view, the data look simple: here are the alternatives, here are their features, here are the choice sets, and here are the observed choices.

The work of the model is to connect those observations to the SEU structure.

## From features to beliefs

SEU requires beliefs about consequences. If an alternative is chosen, what consequences might follow, and with what probabilities?

The `m_0` model treats those beliefs as latent. They are not directly observed. Instead, each alternative's features are used to generate a probability distribution over possible consequences.

The foundational implementation uses a softmax mapping. A matrix of coefficients, called `beta`, maps features into subjective probabilities over consequences. In plainer terms, `beta` represents how the model thinks features of an alternative bear on the decision maker's beliefs about what will happen if that alternative is chosen.

For example, in an insurance triage setting, features might describe signals of claim complexity, severity, documentation, or litigation risk. The model would use those features to estimate the decision maker's implicit probability distribution over possible consequence categories. The exact application may differ, but the modeling role is the same: features become evidence about beliefs.

This is a modeling assumption. A linear softmax mapping is not the only possible way to connect features to subjective probabilities. A different application might use a nonlinear mapping, domain constraints, or hierarchical structure. The foundational report uses the simple version because it is a clear starting point and because it keeps the core sensitivity idea visible.

## From consequences to utilities

SEU also requires utilities. Consequences have to be evaluated, not merely predicted.

The model assumes ordered consequences and constructs utilities on a standardized 0-to-1 scale. The worst consequence has utility 0. The best consequence has utility 1. Intermediate consequences receive utilities between those endpoints.

The implementation represents the spacing between utilities through increments. Those increments are constrained to be nonnegative and to sum to 1, which guarantees that the utility vector is ordered and standardized. This is the concrete counterpart of the scale convention described in the previous post.

This matters because the sensitivity parameter only has a stable interpretation once the utility scale is fixed. Without standardization, sensitivity and utility scale would be confounded. With standardization, `alpha` can be interpreted as sensitivity to expected-utility differences on a common scale.

## From beliefs and utilities to expected utilities

Once the model has a probability distribution over consequences and a utility value for each consequence, it can compute the expected utility of each alternative.

The expected utility of an alternative is the probability-weighted average of the utilities of its possible consequences. In the notation of the reports, this is the dot product of the subjective probability vector and the utility vector.

This is where the SEU standard enters the statistical model. The model does not merely ask which alternative was chosen. It asks how the observed choice relates to the expected utilities implied by the estimated beliefs and utilities.

If an alternative has higher expected utility than another, a more sensitive decision maker should be more likely to choose it. The strength of that tendency is governed by `alpha`.

## From expected utilities to choices

The final step is the probabilistic choice rule.

For each decision problem, the model computes the expected utilities of the available alternatives. It then applies the softmax choice rule with sensitivity `alpha`. The result is a probability distribution over the available choices.

An observed choice is treated as one draw from that distribution.

This is what makes the model statistical rather than purely classificatory. A lower expected-utility choice is not impossible. It is just less probable when `alpha` is high. When `alpha` is low, expected-utility differences have less influence on choice probabilities.

Across many observed choices, the model learns about `alpha` and the other parameters. If choices repeatedly favor the alternatives with higher estimated expected utility, the posterior distribution for `alpha` will tend to move upward. If choices look weakly related to expected utility, the posterior will support lower sensitivity values.

## Why priors enter the story

Because this is a Bayesian model, it begins with prior distributions over the parameters.

The default `m_0` implementation uses a lognormal prior for `alpha`, a standard normal prior for the feature-to-probability coefficients `beta`, and a symmetric Dirichlet prior for the utility increments. These are not meant to be final truths about every application. They are default assumptions that make the model operational while allowing a broad range of behavior.

The third foundational report asks what these priors imply before any data are observed. That is the purpose of prior predictive analysis.

A prior predictive analysis simulates possible datasets from the model before conditioning on real observations. It asks: if these priors were true, what kinds of choices would we expect to see?

This is a crucial step because priors are not just abstract probability distributions over parameters. They imply behavior. A prior that seems harmless on `alpha`, `beta`, or utility increments might imply that the decision maker almost always chooses randomly, or almost always chooses the SEU maximizer, or produces some other pattern that is implausible for the intended application.

The foundational prior predictive analysis finds that the default priors cover a useful range: near-random choice, moderate sensitivity, and strong SEU maximization. The prior does not force the model into one behavioral regime. It also avoids obvious pathologies such as invalid expected utilities or degenerate choice probabilities.

## What the prior predictive check tells us

The prior predictive report uses a moderate study design: 25 decision problems, 3 consequences, 5 feature dimensions, 15 distinct alternatives, and between 2 and 5 alternatives per problem. Under the default priors, simulated decision makers select the SEU-maximizing alternative more often than random choice on average, but with substantial variation.

That variation is the point. Before seeing data, the model allows weak, moderate, and strong sensitivity. It does not assume the answer.

The simulations also confirm the theoretical behavior from the first foundational report. Higher `alpha` is associated with a greater probability of selecting the SEU-maximizing alternative. Very low `alpha` produces near-random behavior. Very high `alpha` produces near-deterministic SEU maximization.

This gives the model a sanity check before it is used for inference. If the prior predictive distribution had failed to include plausible observed behaviors, the model would need revision before being applied.

## Why the estimate remains uncertain

Even with a sensible model and a reasonable prior, observed choices are finite. A small study cannot reveal everything about a decision maker's beliefs, utilities, and sensitivity. Some choice sets are more informative than others. Some alternatives may have nearly equal expected utilities, making choices less revealing about sensitivity. Some parameter combinations can produce similar expected-utility rankings.

For this reason, the output of the model should be a posterior distribution, not only a point estimate.

The posterior distribution tells us which parameter values remain plausible after observing the choices. A narrow posterior for `alpha` indicates that the data strongly constrain sensitivity. A wide posterior indicates that the observed choices leave substantial uncertainty.

That uncertainty is not a nuisance to be hidden. It is part of the measurement.

In AI evaluation, this is especially important. It is tempting to rank systems by a single number. But if the uncertainty around the estimates is large, then apparent differences may not support strong conclusions. Conversely, if uncertainty is small, a sensitivity estimate can support more confident comparison.

## What choices can and cannot identify

The `m_0` model estimates more than sensitivity. It also estimates the feature-to-belief mapping and the utility spacing. These parameters matter because they determine the expected utilities to which choices are supposed to be sensitive.

But decisions under uncertainty do not always identify those components equally well. Choices reveal expected utilities indirectly. They do not separately show exactly which part came from beliefs and which part came from utilities.

This issue becomes more important in the next post, which discusses parameter recovery. The short version is that `alpha`, the primary sensitivity parameter, can be recovered well in the foundational validation study. The decomposition of expected utility into beliefs and utilities is harder. That does not make the sensitivity framework unusable, but it does affect how results should be interpreted.

For now, the key point is simpler: a sensitivity estimate is an inference from observed choices under a model. It depends on the decision design, the assumed relationship between features and beliefs, the utility parameterization, the priors, and the amount of data.

## The bridge to meaningful measurement

This measurement setup gets us from observed choices to posterior uncertainty about sensitivity. But one more question remains.

When should we trust the number?

A model can always produce an estimate. That does not mean the estimate is meaningful. The observed decision maker may not be well described by the model. The study design may be too weak. The priors may be inappropriate for the domain. The model may recover some parameters but not others. The posterior may look precise for the wrong reason, or too diffuse to support the intended conclusion.

This is why the foundational reports do not stop with implementation. They include prior predictive analysis and parameter recovery. Those checks are part of what turns a formal model into an evaluative tool.

The next post focuses on that adequacy question. Before the framework can support empirical claims about AI decision behavior, we need evidence that the model can produce interpretable estimates in the kinds of settings where we want to use it.

## Sources

This post draws primarily on [Concrete Implementation: The m_0 Stan Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/02_concrete_implementation.html) and [Prior Predictive Analysis](https://jeffhelzner.github.io/seu-sensitivity/foundations/03_prior_analysis.html), with the abstract interpretation from [Abstract Formulation of the SEU Sensitivity Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html).