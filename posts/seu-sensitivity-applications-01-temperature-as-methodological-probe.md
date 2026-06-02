---
title: "Probing SEU Sensitivity With LLM Temperature: Design and Model Checks"
date: 2026-06-01
author: "Jeff Helzner"
slug: "seu-sensitivity-applications-part-1-temperature-as-methodological-probe"
description: "Background, study design, prior calibration, and model checking for the initial GPT-4o temperature study, which applies the SEU Sensitivity framework to real LLM choice data."
summary: "Before any temperature result can be read, the measurement device has to be set up: a defensible task, a calibrated prior, identifiable parameters for the quantity of interest, and adequacy checks that constrain what the eventual estimate is allowed to mean."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","temperature","series:seu-sensitivity-applications"]
series: "Applying SEU Sensitivity to LLM Decisions"
part: 1
draft: false
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-applications-01-temperature-as-methodological-probe.html">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Probing SEU Sensitivity With LLM Temperature: Design and Model Checks",
          "description": "Background, study design, prior calibration, and model checking for the initial GPT-4o temperature study.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-06-01",
          "dateModified": "2026-06-01",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-applications-01-temperature-as-methodological-probe.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "LLM temperature", "AI decision evaluation", "GPT-4o", "Bayesian decision model", "prior calibration", "parameter recovery"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to LLM Decisions** · Part 1 of 2  
Part 1 · [Part 2](seu-sensitivity-applications-02-result-that-did-not-travel.html)
:::

The [foundations series](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) developed the SEU Sensitivity framework as a graded way to ask how strongly a decision maker's observed choices track subjective expected utility differences. The framework is deliberately narrower than a theory of intelligence or rationality. It estimates a single sensitivity parameter, `alpha`, under a stated reference standard, and asks whether that estimate is uncertain, interpretable, and adequate for the task at hand.

The natural next question is what happens when the framework is applied to real LLM choice data. This series describes the first two pilot studies in that programme. The present post sets up the initial GPT-4o temperature study: the question it asks, the experimental design, the prior calibration, and the model checking that has to be in place before any `alpha` estimate is allowed to be read substantively. The companion post turns to results — both for GPT-4o and for a follow-up Claude study on the same insurance task that did not reproduce the GPT-4o pattern.

These pilots are best read as probes of the measurement device — the `m_0` family of models introduced in [Part 2 of the foundations series](seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html) — rather than as substantive claims about LLM cognition. Underlying technical detail lives in two reports: [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html) and [Temperature and SEU Sensitivity: Claude × Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html). The blog posts link into specific sections of those reports wherever the high-level summary abstracts away a choice that an interested reader might want to inspect.

## Why this pilot, and why temperature

The first pilot used LLM sampling temperature as the experimental lever. The choice was driven primarily by methodological convenience: temperature is exposed by the provider's API, it plausibly changes the stochasticity of the LLM's outputs, and varying it gives a clean source of manipulation under which something should change if the framework is detecting anything at all. For a first empirical application of `m_0`-family models, an easy-to-manipulate factor was preferable to a domain-rich one whose interpretation would have competed for attention with the measurement question.

There was also an informal hypothesis in the background. In the softmax SEU sensitivity model, the parameter `alpha` governs how sharply choices concentrate on alternatives that the model ranks higher in subjective expected utility. In an LLM, sampling temperature affects the entropy of next-token selection. If consistency with rational choice (as measured by `alpha`) decreases as creativity (as measured by temperature) increases — the kind of trade-off that has informal currency in discussions of LLM behaviour — one would expect estimated `alpha` to decrease as temperature rises. This is a coherent directional hypothesis, but it is not mechanistically clean. Temperature can in principle affect intermediate reasoning, the language of intermediate claim assessments, and final answer selection at once, and the present design does not separate these channels. The pathway from token-sampling entropy to choice-level sensitivity is sketched more formally in the [introduction to the initial study](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-introduction).

What the study primarily asks, then, is whether the measurement device picks up a structured change in choice behaviour when the easiest available lever is moved. Either answer is informative. A non-detection would constrain what the framework can do at this scale; a detection would establish that the workflow runs end-to-end on real LLM data and produce a comparative result that can be tested in a different setting.

## Experimental design

The study used GPT-4o in an insurance claims triage task. In each decision problem, the model was presented with a small set of insurance claims and asked which one to forward for investigation. The choice was structured as a two-stage prompting pipeline: each claim was first assessed individually by the LLM, producing a short natural-language evaluation, and the four assessments were then assembled into a choice prompt that asked the LLM to select exactly one claim to forward. The full study design — sample size rationale, task and conditions, prompts — is documented in [§Experimental Design](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-design) of the technical report.

The experimental factor was sampling temperature, set to five levels — `0.0`, `0.3`, `0.7`, `1.0`, `1.5` — each treated as an independent data collection. The study used 100 base decision problems, drawn from a pool of `R = 30` distinct claims, with each problem presented three times under different position orderings; this counterbalancing yielded 300 choice observations per temperature condition and 1,500 in total. The position counterbalancing addressed a problem in an earlier pilot in which unparseable responses had effectively been mapped to a default position. In the revised design, unparseable responses are recorded as missing rather than silently converted into choices, and the final dataset had no missing observations at any temperature.

Alternatives entered the SEU Sensitivity model through a two-stage feature pipeline. The natural-language assessments were embedded with `text-embedding-3-small` and then projected to 32 dimensions via PCA fit on the pooled set of embeddings across all five temperature conditions. The pooled basis ensures that the conditions share a common coordinate system; it also implies, as the [feature-construction note](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-design) discusses, that any temperature-induced variation in the assessment text is absorbed into the features the choice model sees. The application therefore measures the behaviour of the whole assessment-and-choice pipeline under each temperature condition, not a temperature effect on the choice stage in isolation.

### A worked example

A single decision problem makes the two-stage pipeline concrete. The [report's worked example](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-design) traces problem `P0001` at `T = 0.0`. Four claims were presented to GPT-4o:

| ID    | Brief description |
|-------|-------------------|
| C004  | Emergency-room visit for a sports injury; documentation aligns with the reported injury. |
| C001  | Homeowner water-damage claim; photos appear inconsistent with the reported burst pipe. |
| C024  | $60,000 business-property theft claim; no forced entry, restricted key access, cameras non-functional. |
| C009  | Auto hail-damage claim; corroborated by weather data and consistent with typical hail damage. |

Each claim was first sent through an assessment prompt; the resulting GPT-4o text was embedded, projected through the pooled PCA basis, and used as the alternative's feature vector in the choice model. The four assessments were then inserted into a choice prompt that asked the LLM to forward exactly one claim. Across the three position-counterbalanced presentations of `P0001`, GPT-4o selected `C024` every time, despite the position to be typed changing across presentations. That position-invariant, content-tracking pattern is exactly what the counterbalancing design is intended to expose: a model whose choices were driven by position rather than content would not reproduce the same selection under reshuffling. The worked example also makes visible that the choice prompt sees the LLM's own assessments, not the raw claim text, which is the reason the embedded assessments are what the SEU model uses as features.

## Prior calibration

A model can produce a posterior whether or not its prior is well matched to the application. Calibrating the prior to the study design is part of what makes the eventual estimate interpretable.

The application fits a model variant called `m_01`, which is structurally identical to the foundational `m_0` model from [Part 2 of the foundations series](seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html) but uses a more informative prior on `alpha`. The generic foundational prior — `Lognormal(0, 1)` — was chosen for breadth in simulation work, including regimes in which the decision maker is nearly random. For LLM choice data on this task, that prior places too much mass in a region where choices would be approximately random, and it produces non-negligible mass on very large `alpha` values that caused softmax overflow under the actual study design. The full motivation is in [§Model and Prior Calibration](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-model).

The interpretive anchor used to choose a replacement prior is the **SEU-maximizer selection rate**: for each candidate prior, the report draws values of `alpha`, simulates choice data under the actual study design, and records the fraction of problems in which the simulated agent picks the alternative with the highest expected utility under the model. This summary turns an abstract change of prior into an observable claim about decision behaviour. A prior whose implied SEU-max rate sat near the random-choice baseline would be assuming a near-random decision maker in advance; a prior whose implied rate sat at the ceiling would be assuming near-perfect EU alignment in advance.

The grid search over twelve candidate lognormal hyperparameter pairs is summarised below.

![Prior predictive grid search over lognormal hyperparameters for alpha. Each point is a candidate prior, evaluated by the SEU-maximizer selection rate it implies under the actual study design. The selected prior, `Lognormal(3.0, 0.75)`, balances informativeness with sufficient coverage of the plausible parameter range.](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study_files/figure-html/fig-grid-search-output-1.svg){#fig-grid-search fig-alt="Prior predictive grid-search plot showing implied SEU-maximizer selection rates for twelve candidate lognormal priors on alpha."}

The selected prior is `Lognormal(3.0, 0.75)`. Its median sits near `alpha = 20`, its 90% interval spans roughly `[5.5, 67]`, and it implies an SEU-max rate of approximately 78% — well above the random-choice baseline, consistent with the expectation that an LLM in this task will make reasonably EU-aligned choices, but still allowing substantial uncertainty about how sharp that alignment is. It also avoids the extreme upper-tail values that produced numerical issues under the foundational prior.

## Validation focused on `alpha`

The next question is whether the model can recover the parameter of interest under the actual study design. The foundational reports validated `m_0` at a smaller scale (`M = 25`, `D = 5`); the application study repeats parameter recovery and simulation-based calibration at the application's actual scale (`M = 300`, `K = 3`, `D = 32`, `R = 30`). The full procedure is in [§Model Validation](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-validation).

For the temperature comparison, the primary inferential target is `alpha`, and recovery for `alpha` is comfortably fit for purpose under the application's design. Because true `alpha` lies on a wide multiplicative scale under the `Lognormal(3.0, 0.75)` prior, the report anchors interpretation on relative metrics: across 20 recovery iterations, relative bias is within roughly ±10% of the mean true value, relative RMSE is well below 25%, and 90% credible-interval coverage is at nominal. Visually, the recovered values track the identity line tightly.

![Recovery of the sensitivity parameter alpha under the m_01 prior and the application's actual study design. Left: true versus estimated values with the identity line. Right: 90% credible intervals per iteration, coloured by whether they contain the true value.](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study_files/figure-html/fig-alpha-recovery-output-1.svg){#fig-alpha-recovery fig-alt="Two-panel recovery figure for alpha: true-versus-estimated scatter on the left and 90% credible intervals per iteration on the right."}

The decomposition of expected utility into feature effects (`beta`) and utility increments (`delta`) carries the same partial-identification issue that the [foundational recovery report](https://jeffhelzner.github.io/seu-sensitivity/foundations/04_parameter_recovery.html) documented for `m_0`: those components are harder to identify than `alpha` itself, and recovery of `delta` in particular is weaker. There is a structural reason for this, but it would be a detour for the blog series; readers who want to engage with it should consult the technical reports directly. For present purposes it is enough to note that the temperature comparison is a comparative claim about `alpha` across conditions that share the same prior, features, and design, and that the partial identification of the other components does not undermine that comparison. The construct-validity discussion in [§Discussion](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#construct-validity-of-) lays out what `alpha` should and should not be read as in this design.

Simulation-based calibration complements parameter recovery by asking whether the posterior correctly represents uncertainty, not just whether point estimates are reasonable. Under the application's actual design, the SBC rank distribution for `alpha` is consistent with uniformity, both visually and on the formal calibration tests. This is the result that licenses treating posterior credible intervals for `alpha` as honest statements about uncertainty when the temperature conditions are compared in the next post.

## MCMC diagnostics and posterior predictive checks

Two further checks live between validation and substantive interpretation: diagnostics for the sampler used to fit each per-temperature posterior, and posterior predictive checks for the fitted models.

MCMC diagnostics across the five temperature fits — R̂, effective sample sizes, divergent transitions — are clean. The 1–2 divergent transitions observed at the two highest temperature levels amount to less than 0.05% of post-warmup transitions, comfortably within acceptable bounds. The full diagnostic table is in [§MCMC Diagnostics](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#mcmc-diagnostics-2). Had the diagnostics looked otherwise — sustained R̂ inflation, many divergent transitions, or low effective sample size — the per-condition posteriors could not be trusted as samples from the intended target, and the comparison across conditions would have to be set aside until the sampling problem was resolved.

Posterior predictive checks ask whether the fitted model can reproduce features of the observed choice data. The report computes three complementary summaries — log-likelihood, modal choice frequency, and mean predicted probability of the chosen alternative — and reports the implied posterior predictive p-values at each temperature level. All fifteen p-values fall in the interval `[0.3, 0.65]`, providing no evidence of systematic misfit at any temperature. The full table and a discussion of what these checks are and are not capable of supporting are in [§Posterior Predictive Checks](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#posterior-predictive-checks). Posterior predictive adequacy is not a proof that the model captures the internal mechanism by which temperature affects the LLM; it is the weaker, and still necessary, claim that the model's choice-level predictions are compatible with the choices that were actually observed. If the checks had pointed the other way, the natural reading would have been serious model mis-specification, and the per-temperature `alpha` estimates would not have been a credible basis for the temperature comparison.

With the design specified, the prior calibrated, `alpha` shown to be identifiable at the application's scale, the posterior shown to be calibrated under simulation, the sampler well-behaved, and the fitted models adequate to the observed choices, the comparison across temperature conditions is set up to be read as inference rather than as a number produced by fiat. [Part 2](seu-sensitivity-applications-02-result-that-did-not-travel.html) turns to that comparison — first for GPT-4o, then for the follow-up study on Claude — and to what the contrast between the two studies licenses by way of conclusion.

## Sources

This post draws on [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html), with background from the [foundations series](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) and the foundational reports cited there.
