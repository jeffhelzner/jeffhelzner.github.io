---
title: "Probing the SEU Model: A Bayesian Workflow Tour"
date: 2026-07-01
author: "Jeff Helzner"
slug: "seu-sensitivity-foundations-part-3-when-measurement-is-meaningful"
description: "Probing the m_0 SEU sensitivity model with the modern Bayesian workflow: prior predictive checks, parameter recovery, simulation-based calibration, and posterior predictive checks."
summary: "Four checks ask four different questions of the same model. Together they tell us whether an SEU sensitivity estimate is something we should be willing to interpret."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","bayesian-workflow","sbc","posterior-predictive-checks","series:seu-sensitivity-foundations"]
series: "Foundations of SEU Sensitivity"
part: 3
draft: true
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-03-when-measurement-is-meaningful.html">
        <meta name="robots" content="noindex, nofollow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Probing the SEU Model: A Bayesian Workflow Tour",
          "description": "Probing the m_0 SEU sensitivity model with the modern Bayesian workflow: prior predictive checks, parameter recovery, simulation-based calibration, and posterior predictive checks.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-07-01",
          "dateModified": "2026-05-14",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-03-when-measurement-is-meaningful.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Bayesian workflow", "prior predictive", "parameter recovery", "simulation-based calibration", "SBC", "posterior predictive checks"]
        }
        </script>
---

::: {.series-nav}
**Foundations of SEU Sensitivity** · Part 3 of 3  
[Part 1](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) · [Part 2](seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html) · Part 3
:::

Part 1 introduced the abstract sensitivity idea. Part 2 turned it into a Stan program by committing to a feature-to-probability map, an ordered-utility parameterization, and a set of priors. With that implementation in hand, the natural next question is whether the resulting posterior is something we should trust.

A posterior is just an answer the model gives to the data. It is only as good as the model that produced it. Asking *"does this model behave the way a useful model should behave?"* is the job of the **modern Bayesian workflow**, and the foundational reports run four checks on `m_0` that together address that question:

1. **Prior predictive checks** — does the model produce plausible decision behavior *before* seeing any data?
2. **Parameter recovery** — given data the model itself generates, can the model recover the parameters that generated it?
3. **Simulation-based calibration (SBC)** — do the model's posteriors have the right *calibration*, not just the right point estimates?
4. **Posterior predictive checks (PPC)** — does the fitted model reproduce features of the actual observed data?

Each check interrogates a different aspect of the model. None is decorative; failure on any of them changes what an eventual `alpha` estimate is allowed to mean.

## Prior predictive: is the model plausible before data?

Before fitting any choices, we can ask what kind of decision behavior the model expects to see. Sampling parameters from the priors and simulating choices yields a *prior predictive distribution* over observable outcomes — the rate at which SEU-maximizing alternatives get chosen, the spread of expected utilities across problems, the apparent decisiveness of the simulated chooser.

The foundational report runs this check for `m_0` on a small but realistic design: `M = 25` problems with `K = 3` consequences, `D = 5` features, `R = 15` distinct alternatives, and 2–5 alternatives per problem. Each prior draw produces a complete synthetic data set.

The headline summary is that under the `m_0` priors, the *rate at which the SEU-maximizing alternative is chosen* ranges from about **12% to 92%** across simulations, with a mean near **43%**. Compare that to the random-choice baseline of `1/3 ≈ 33%` for problems with three alternatives on average. Two things are worth noting.

First, the range is wide. The model is not committing in advance to any particular regime. It allows for prior draws where the simulated decision maker looks nearly random (12%) and prior draws where the decision maker is highly sensitive (92%). The Lognormal(0, 1) prior on `alpha`, paired with the weakly informative priors on `beta` and `delta`, expresses genuine uncertainty across the regimes named in Part 1.

Second, the mean is not far from the baseline. On average, the model expects choices that look modestly biased toward the SEU-favored alternative, not strongly biased and not adversarial. The simulations show no pathologies: no degenerate distributions over choices, no impossible utility orderings, no numerical breakdowns.

A more substantive prior predictive check — and one worth flagging — would compare these prior predictions to any data we already have. If real choices in our domain regularly produce SEU-rates above the prior's 92nd percentile, that is *prior–data conflict*, and it warns us that the default priors are mis-specified for the application. The Lognormal(0, 1) on `alpha` is the place where this most often shows up. In the temperature study, for example, observed choice data sit far above the regime the default prior emphasizes, which is exactly why that study replaces the default with `Lognormal(3.0, 0.75)`.

## Parameter recovery: can the model find what it put in?

The next check is a kind of self-test. If we generate synthetic data from the model itself — sampling parameters from the priors, then sampling choices from the resulting likelihood — can the model recover the parameters that generated it?

The foundational report runs this exercise systematically on `m_0`. The results are uneven across parameters, in a way that turns out to be informative.

**`alpha` recovers well.** Across simulation runs, the posterior for `alpha` tends to cover the true generating value, and the posterior mean tracks it closely. This is encouraging, because `alpha` is the parameter that the framework is built to estimate.

**`beta` and `delta` recover less cleanly.** Posteriors for individual entries of `beta` are wider than for `alpha`, and posterior means do not track the truth as tightly. The same is true, less dramatically, for `delta`.

There is a structural reason for this. The decision-relevant signal at every problem flows through the composition `alpha * eta_r = alpha * (psi_r^T upsilon)`. Choice probabilities are invariant to a lot of joint movement in `(alpha, beta, delta)` that leaves this composition unchanged. The likelihood pins down something close to the *product* well, and the data needed to disentangle the factors are substantial. With `M = 25` problems, the data simply do not contain enough information to localize `beta` and `delta` precisely on their own.

The design implication is that if the goal is to interpret entries of `beta` — for example, to claim that one feature has a stronger effect on beliefs than another — a `M = 25` study will rarely support it. If the goal is to estimate `alpha`, the design is roughly adequate. The foundational design-extension report goes further on this and quantifies how `M` and the number of alternatives per problem affect each parameter's recovery.

## SBC: are the posteriors calibrated, not just close?

Parameter recovery answers a *point-estimate* question: does the posterior land near the truth? It does not directly answer a *calibration* question: do my 90% intervals contain the true value 90% of the time? A model can have well-located point estimates and still be miscalibrated — typically by being overconfident, which is the failure mode that matters most when intervals will be interpreted as uncertainty.

Simulation-based calibration ([Talts et al., 2018](https://arxiv.org/abs/1804.06788)) is the standard way to check this. The recipe: simulate many `(theta_true, y)` pairs from the prior and likelihood, fit the model to each `y` to get a posterior over `theta`, and record the *rank* of `theta_true` within that posterior. If the model is calibrated, those ranks should be uniformly distributed.

The reader's guide for SBC rank histograms is short:

- **Flat** — calibration is good.
- **U-shaped** — the model is *overconfident*: the true value falls in the tails too often, meaning intervals are too narrow.
- **Dome / inverted-U** — the model is *underconfident*: intervals are too wide.
- **Ramp** — the model is *biased*: posteriors systematically over- or under-shoot the truth.

For `m_0`, the SBC results align with the recovery picture. `alpha` shows broadly well-calibrated ranks, with mild departures consistent with the moderate posterior width seen in recovery. Some entries of `beta` show flatter, wider rank distributions, again reflecting the weak identification of individual entries from a small `M`.

The take-away is the same as for recovery, but with a sharper edge: SBC tells us that uncertainty in `alpha` reported by `m_0` can be interpreted as uncertainty, not as a placeholder for "the sampler converged but we have no idea what the interval means."

## Posterior predictive checks: does the fitted model match the data?

The first three checks all use synthetic data. PPC is the first check that uses the actual data being analyzed. Having fit the model to observed choices, we sample synthetic choices from the posterior predictive distribution and compare summary statistics of those replicated data sets to the same statistics computed on the observed data.

The `m_0` Stan program emits three discrepancy statistics in `generated quantities`, evaluated on both the observed choices and posterior-replicated choices:

- **`ll`** — model log-likelihood on the choices.
- **`modal`** — the fraction of problems in which the alternative with highest posterior choice probability matches the observed choice.
- **`prob`** — the mean posterior probability assigned to the actually-chosen alternative.

Each statistic gets a posterior predictive *p-value*: the fraction of posterior-replicated data sets whose statistic is at least as extreme as the observed value. A p-value near 0 or 1 is a flag that the model cannot reproduce that feature of the data; values comfortably in the interior of `[0, 1]` are reassuring.

A worked example helps. The temperature study's [Posterior Predictive Checks section](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#posterior-predictive-checks) reports all three statistics across five sampling temperatures. Every p-value lands in roughly `[0.30, 0.65]`. The model is not implausibly close to the data (which would suggest overfitting) and not far away (which would suggest misspecification). It reproduces these three features adequately.

One caveat is worth stating plainly. Passing PPC on these three statistics is *necessary* for trusting the fit, but it is not sufficient. PPC tests only the discrepancies one chooses to compute. A model that reproduces likelihood, modal accuracy, and chosen-alternative probability could still fail to reproduce a discrepancy we did not check — for example, the within-problem distribution of choices when more than one alternative is plausible. PPC is a confidence-building exercise, not a final verdict.

## What the four checks tell us together

Prior predictive, recovery, SBC, and PPC ask four different questions:

- *Is the model plausible before data?* Yes for `m_0` — wide range of decision behavior, no pathologies.
- *Can the model recover its own parameters?* `alpha` well; `beta` and `delta` only weakly at small `M`.
- *Are the resulting posteriors calibrated?* Yes for `alpha`; the `beta` posteriors are honestly wide.
- *Does the fitted model match observed data on chosen statistics?* In the temperature application, yes.

That is what it takes to use a sensitivity estimate as evidence rather than as a number. It is not enough that the sampler converged. It is not enough that the posterior interval looks reasonable. The model has to behave the right way *across* all four checks before the estimate it produces can be interpreted with confidence.

## Where this leaves the broader program

The three posts in this series have concentrated on the `m_0` model: a single decision maker, a single block of decision problems with consequence features, and a softmax-over-expected-utility likelihood. This is intentional. `m_0` is the workhorse that everything else in the foundational program either generalizes or compares to.

There are two natural directions of generalization, both of which the foundational reports work out in detail.

The first is to enrich the model of utilities. The `m_1` variant moves to the Anscombe–Aumann setting with risky choices, where utility differences become directly identifiable from observed lotteries rather than inferred jointly with `alpha`. That sharpens both interpretation and identifiability.

The second is to model multiple decision makers jointly. The `h_m01` family of hierarchical models lets `alpha` (and other parameters) vary across decision makers while pooling information about the common structure. This is the natural framework for studying how sensitivity differs across, say, AI systems with different training, or across temperatures of the same system.

The next series in this blog moves from foundations into applications, beginning with the temperature study that already appeared in this post as an illustration of PPC. The workflow developed across these three posts — abstract model, concrete implementation, Bayesian probes — is what the applied work assumes and builds on.

## Sources

This post draws on the foundational [Prior Predictive Analysis](https://jeffhelzner.github.io/seu-sensitivity/foundations/03_prior_predictive_analysis.html), [Parameter Recovery](https://jeffhelzner.github.io/seu-sensitivity/foundations/04_parameter_recovery.html), and [Simulation-Based Calibration](https://jeffhelzner.github.io/seu-sensitivity/foundations/06_simulation_based_calibration.html) reports. The PPC discussion uses the [Initial Temperature Study](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#posterior-predictive-checks) as a worked example. The bridge to `m_1` and hierarchical models points to later reports in the [SEU Sensitivity Foundations](https://jeffhelzner.github.io/seu-sensitivity/) site.
