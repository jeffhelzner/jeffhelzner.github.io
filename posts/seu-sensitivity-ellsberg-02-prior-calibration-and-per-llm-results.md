---
title: "Prior Calibration, Model Checks, and the Per-LLM Ellsberg Results"
date: 2026-06-08
author: "Jeff Helzner"
slug: "seu-sensitivity-ellsberg-part-2-prior-calibration-and-per-llm-results"
description: "The K = 4 prior recalibration, validation focused on alpha, and the per-condition results for the GPT-4o and Claude 3.5 Sonnet Ellsberg studies."
summary: "GPT-4o shows a clear broad decline in alpha as temperature increases on the Ellsberg gambles. Claude shows no such decline. The same qualitative shape as the insurance pair holds, in a task family that was designed to put the SEU standard itself under pressure."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","ellsberg","gpt-4o","claude","temperature","series:seu-sensitivity-ellsberg"]
series: "Applying SEU Sensitivity to Ellsberg-Style Decisions"
part: 2
draft: false
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Prior Calibration, Model Checks, and the Per-LLM Ellsberg Results",
          "description": "The K = 4 prior recalibration, validation focused on alpha, and the per-condition results for the GPT-4o and Claude 3.5 Sonnet Ellsberg studies.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-06-08",
          "dateModified": "2026-06-08",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Ellsberg paradox", "GPT-4o", "Claude 3.5 Sonnet", "LLM temperature", "prior calibration", "parameter recovery", "Bayesian decision model"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to Ellsberg-Style Decisions** · Part 2 of 3  
[Part 1](seu-sensitivity-ellsberg-01-from-insurance-to-urns.html) · Part 2 · Part 3
:::

[Part 1](seu-sensitivity-ellsberg-01-from-insurance-to-urns.html) set out the choice of Ellsberg-style urn gambles as the next task family, the historical and interpretive weight that Ellsberg's example carries, and the scope of what the studies in this series do and do not measure. This post turns to the measurement device: the prior recalibration that the change of consequence space forces, the validation that licenses comparing per-condition `alpha` posteriors, and the per-LLM headline results for both Ellsberg studies. [Part 3](seu-sensitivity-ellsberg-03-factorial-synthesis.html) reads the four resulting cells — LLM crossed with task — as a single comparative picture.

The two technical reports drawn on here are [Temperature and SEU Sensitivity: Ellsberg Study](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html) (Claude 3.5 Sonnet) and [Temperature and SEU Sensitivity: GPT-4o × Ellsberg Study](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html) (GPT-4o). As in the previous series, the post links into specific sections of those reports wherever the high-level summary abstracts away a choice an interested reader might want to inspect.

## A new prior for the K = 4 task

The model fit in both Ellsberg studies is the same softmax-over-expected-utility model used in the insurance pair. The structural form is unchanged; what changes is the prior on `alpha`.

The reason is the change in the consequence space. The insurance task had `K = 3` consequences (forward to investigation, decline, hold) and the [`m_01` variant](seu-sensitivity-applications-01-temperature-as-methodological-probe.html) used the prior `Lognormal(3.0, 0.75)`, calibrated so that the prior-implied SEU-maximization rate sat near 78% under the insurance design. Carrying that prior unchanged into the Ellsberg setting would change its interpretation: with `K = 4` and a random-choice baseline of `1/4` rather than `1/3`, the same `alpha` value implies a different SEU-maximization rate. A prior that was "moderately informative about reasonably EU-aligned LLM choices" in the insurance setting would no longer be calibrated to that target on the Ellsberg task.

The fix, in both Ellsberg studies, is a recalibrated variant called `m_02`: structurally identical to `m_0` and `m_01`, with a slightly wider lognormal prior on `alpha` of `Lognormal(3.5, 0.75)`. The calibration was done by the same prior-predictive grid search procedure used in the initial study — for each candidate prior, draw values of `alpha`, simulate choice data under the actual study design, and record the implied SEU-maximization rate. The selected prior implies a rate of approximately 76% under the Ellsberg design, within a few percentage points of the insurance studies' 78%. The prior has a median near `alpha = 33` and a 90% interval roughly `[7, 150]`. The full grid and discussion are in [§Prior Predictive Grid Search](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#prior-predictive-grid-search) of the Claude report; the GPT-4o study uses the same `m_02` prior so that any cross-LLM comparison on the Ellsberg task is not confounded by a difference in prior or model variant.

Two consequences of this calibration are worth flagging up front, because they shape what the comparisons later in this series can and cannot claim.

First, cross-*task* comparisons of `alpha` *magnitudes* — comparing the level of `alpha` on insurance to the level on Ellsberg — are not what the calibration is designed to support. The insurance studies use `m_01` with `Lognormal(3.0, 0.75)` and `K = 3`; the Ellsberg studies use `m_02` with `Lognormal(3.5, 0.75)` and `K = 4`. An `alpha` of, say, 80 implies different choice probabilities under those two configurations, because the softmax operates over different-sized simplices. What the calibration *is* designed to support is parallel interpretation of within-task contrasts across the two studies — the sign and shape of how `alpha` moves with temperature inside a single task family.

Second, cross-*LLM* comparisons on the Ellsberg task can use the per-condition `alpha` posteriors directly, because both Ellsberg cells share `m_02`, `Lognormal(3.5, 0.75)`, `K = 4`, the same gamble pool, the same feature pipeline, and the same `R = 30`. Within the Ellsberg task, the two LLM cells are as close to a clean apples-to-apples comparison as the design permits, modulo the temperature-grid difference treated in [Part 3](seu-sensitivity-ellsberg-03-factorial-synthesis.html).

## Validation focused on alpha

Before the per-condition `alpha` posteriors can be read as inference, the model has to be shown to recover `alpha` at the application's actual scale and to do so with calibrated uncertainty.

Parameter recovery for `m_02` was run at the Ellsberg studies' design parameters (`M ≈ 300`, `K = 4`, `D = 32`, `R = 30`). In the Claude study's recovery report, across the 20 iterations the relative-scale metrics for `alpha` are fit for purpose: 90% credible intervals contain the true value at the nominal rate, and the RMSE is small relative to the spread the prior places on `alpha`. The GPT-4o study reproduces the recovery at the same design parameters and reports relative bias within roughly ±10% and 90% coverage at nominal. The detail is in [§Parameter Recovery](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#parameter-recovery) of the Claude report and the corresponding [section](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#parameter-recovery) of the GPT-4o report.

The recovery picture for the other model components — the feature weights `beta` and the utility increments `delta` — carries the same partial-identification pattern documented in the foundational reports for `m_0` and inherited by `m_01` and `m_02`. As in the previous applications series, the temperature comparison here is a within-task, within-LLM comparison of `alpha` across conditions that share the same prior, features, and design, and the partial identification of the other components does not undermine that comparison. Readers who want to engage with the `beta`–`delta` identification issues should consult the [foundational recovery report](https://jeffhelzner.github.io/seu-sensitivity/foundations/04_parameter_recovery.html); the present series sets them aside.

Simulation-based calibration for `m_02` was run at the Ellsberg design at reduced scale (75 iterations). The rank distribution for `alpha` is consistent with uniformity (χ² *p* = 0.18), and the overall count of nominally significant rank tests across all 132 parameters (9) is consistent with the binomial chance expectation. The details are in the [SBC appendix](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#appendix-sbc-results-for-m_02) of the Claude report. The GPT-4o study inherits this SBC result rather than rerunning it, since SBC tests the sampler under the prior and likelihood — both of which are identical across the two Ellsberg cells.

Together, parameter recovery and SBC support treating the per-condition `alpha` posteriors as honest statements about uncertainty when the temperature conditions are compared within each LLM. Two further checks live between this validation and substantive interpretation.

MCMC diagnostics across all ten fits (five GPT-4o + five Claude) are clean. Divergent transition rates are at most about 0.15% across conditions, R̂ values for `alpha` are well below the conventional 1.01 threshold throughout, and effective sample sizes and E-BFMI are comfortably in range. The full diagnostic tables are in [§MCMC Diagnostics](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#mcmc-diagnostics) of the Claude report and [§MCMC Diagnostics](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#mcmc-diagnostics) of the GPT-4o report. Had any condition shown sustained R̂ inflation, many divergent transitions, or low effective sample size, the per-condition posterior could not have been read as a sample from the intended target, and the comparison across conditions would have to be set aside until the sampling problem was resolved.

Posterior predictive checks ask whether the fitted model can reproduce features of the observed choice data. Three complementary summaries — log-likelihood, modal choice frequency, and mean predicted probability of the chosen alternative — are computed at every temperature in both studies. All fifteen p-values in the Claude study fall in `[0.30, 0.60]`; all fifteen in the GPT-4o study fall in `[0.32, 0.53]`. Neither study shows evidence of systematic misfit at any temperature. The detail is in [§Posterior Predictive Checks](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#posterior-predictive-checks) of the Claude report and [§Posterior Predictive Checks](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#posterior-predictive-checks) of the GPT-4o report.

The reason to belabor these checks is the same as in the previous series. Sometimes a model fails to detect a structured pattern because it is inadequate for the data; sometimes the model is adequate and the pattern is not there. A useful measurement framework should help tell those two cases apart. In both Ellsberg studies, at every temperature condition, the model is adequate. Whatever pattern appears — or fails to appear — in the per-condition `alpha` posteriors is a property of the data rather than of the measurement device.

## GPT-4o on Ellsberg gambles

The GPT-4o × Ellsberg study uses temperatures `{0.0, 0.3, 0.7, 1.0, 1.5}` — the same grid as the insurance study. Posterior summaries by condition are in [§Posterior Summaries](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#posterior-summaries) of the report; the forest plot puts the per-condition uncertainty alongside the central tendency.

![Forest plot of posterior `alpha` distributions across the five temperature conditions for GPT-4o on the Ellsberg gambles. Points are posterior medians; thick bars span the 50% credible interval and thin bars the 90% credible interval. `alpha` declines from approximately 114 at `T = 0.0` to approximately 54 at `T = 1.5`, with the largest separation between `T = 1.0` and `T = 1.5`.](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study_files/figure-html/fig-forest-output-1.svg){#fig-gpt4o-ellsberg-forest fig-alt="Forest plot showing posterior alpha for GPT-4o on Ellsberg gambles at temperatures 0.0, 0.3, 0.7, 1.0, and 1.5; alpha is highest at 0.0 (around 114) and declines toward 1.5 (around 54), with substantial overlap among the four lower-temperature conditions."}

The headline pattern is the qualitative shape that a reader of the insurance studies would expect to look for. Posterior medians for `alpha` are 114 at `T = 0.0`, 111 at `T = 0.3`, 104 at `T = 0.7`, 87 at `T = 1.0`, and 54 at `T = 1.5`. The aggregate slope `Δalpha/ΔT`, computed as in the insurance study via a draw-wise OLS line through the five `alpha` values, has a posterior median of approximately `−48`, a 90% credible interval of `[−90, −13]` excluding zero, and `P(slope < 0) ≈ 0.98`. The full monotonicity analysis is in [§Monotonicity Analysis](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#monotonicity-analysis) of the report.

The local picture is, as in the insurance study, less tidy than the global one. The pairwise probabilities for adjacent low/mid-temperature comparisons are modest — `P(alpha(0.0) > alpha(0.3)) ≈ 0.53`, `P(alpha(0.3) > alpha(0.7)) ≈ 0.58`, `P(alpha(0.7) > alpha(1.0)) ≈ 0.68` — while the high-temperature comparisons are clean: `P(alpha(1.0) > alpha(1.5)) ≈ 0.91` and `P(alpha(0.0) > alpha(1.5)) ≈ 0.98`. The probability of strict monotonic decrease across all five levels is about `0.09`, driven primarily by overlap among the four lower-temperature conditions. The pairwise table is in [§Pairwise Comparisons](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#pairwise-comparisons). The honest summary is that the global decline is real and is dominated by the gap between `T = 1.0` and `T = 1.5`, not a step-by-step decline at every adjacent pair.

One robustness question is whether the negative global slope depends on having the high-temperature `T = 1.5` condition in the grid at all. The Anthropic API does not permit `T > 1.0`, and so the Claude side of the cross-LLM comparison in Part 3 cannot include that condition. The GPT-4o report computes a matched-range slope restricted to `T ∈ [0.0, 1.0]` for symmetry: the posterior median is `≈ −33`, the 90% credible interval is `[−111, 37]`, and `P(slope < 0) ≈ 0.77`. The negative direction survives the restriction, though the 90% interval now includes zero — exactly what one would expect when the most informative endpoint is dropped. The restricted analysis is in [§Restricted-Range Slope](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#restricted-range-slope-t-in-0.0-1.0).

The qualitative pattern from the GPT-4o × Insurance study reappears on the Ellsberg task: under a different task family and a different prior calibrated to its consequence space, GPT-4o's choices concentrate more sharply on the SEU-maximizing alternative at low temperature than at high temperature.

## Claude on Ellsberg gambles

The Claude × Ellsberg study uses the Anthropic-permitted grid `{0.0, 0.2, 0.5, 0.8, 1.0}`. The forest plot tells the story.

![Forest plot of posterior `alpha` distributions across the five temperature conditions for Claude 3.5 Sonnet on the Ellsberg gambles. Points are posterior medians; thick bars span the 50% credible interval and thin bars the 90% credible interval. Estimates alternate between higher values at `T = 0.0` and `T = 0.5` and lower values at `T = 0.2` and `T = 0.8`, with `T = 1.0` intermediate.](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study_files/figure-html/fig-forest-output-1.svg){#fig-claude-ellsberg-forest fig-alt="Forest plot showing posterior alpha for Claude on Ellsberg gambles at temperatures 0.0, 0.2, 0.5, 0.8, and 1.0; estimates alternate between higher values at 0.0 and 0.5 and lower values at 0.2 and 0.8, with 1.0 intermediate."}

The per-condition posterior medians do not decline monotonically with temperature. They are 88 at `T = 0.0`, 58 at `T = 0.2`, 87 at `T = 0.5`, 55 at `T = 0.8`, and 69 at `T = 1.0`. The posteriors overlap substantially, and no clear ordering by temperature emerges. The full table is in [§Posterior Summaries](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#posterior-summaries) of the report.

The global slope quantifies the comparison. The draw-wise OLS slope `Δalpha/ΔT` has a posterior median of approximately `−19`, a 90% credible interval of `[−65, 24]`, and `P(slope < 0) ≈ 0.77`. The 90% interval comfortably spans zero. The probability of strict monotonic decrease across all five Claude conditions is approximately `0.009`. The full monotonicity analysis is in [§Monotonicity Analysis](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#monotonicity-analysis) of the report.

It is tempting to read the alternating sequence of posterior medians as a genuine non-monotonic temperature response. The report's discussion in [§The Non-Monotonic Pattern](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#the-non-monotonic-pattern) does not support that reading. With about 300 observations per condition and the posterior widths the model returns, sampling variability is a viable explanation for the local pattern, and the pairwise comparisons do not reach a level that would force a structured non-monotonic mechanism on the data. The honest summary is not that Claude has a complex non-monotonic temperature response on this task; it is that on this task Claude does not exhibit the negative temperature–`alpha` relationship that GPT-4o does.

This is the same shape of result that the Claude × Insurance study returned: model adequate, alpha posteriors overlapping, no clear monotonic temperature trend, and no clean directional aggregate slope. The Claude report's [within-LLM comparison across tasks](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#within-llm-comparison-across-tasks-claude) puts the two Claude cells side by side on the same temperature grid `{0.0, 0.2, 0.5, 0.8, 1.0}` and reports that within Claude the non-replication of the GPT-4o pattern is not task-specific.

## The same qualitative shape as the insurance pair

Stepping back from the per-condition detail, the qualitative shape of the two Ellsberg studies is the shape of the two insurance studies. GPT-4o exhibits a clear broad decline in estimated `alpha` as temperature increases, with a global negative slope whose 90% credible interval excludes zero; Claude exhibits no such decline, with a global slope whose interval comfortably spans zero. The pattern observed under one task family carries through under a second task family that was historically constructed to put the SEU standard itself under pressure.

That carry-through is not, on its own, a cross-LLM attribution. The Ellsberg studies share with the insurance studies the property that the GPT-4o cells use one provider's temperature scale and one set of design parameters, while the Claude cells use another — and the four cells were fit independently, with no shared parameters across them. To read the cross-LLM contrast as a substantive claim about how temperature interacts with `alpha` in each model, the cells have to be put together. That is the work of [Part 3](seu-sensitivity-ellsberg-03-factorial-synthesis.html).

## Sources

This post draws on [Temperature and SEU Sensitivity: Ellsberg Study](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html) and [Temperature and SEU Sensitivity: GPT-4o × Ellsberg Study](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html), with background from the [foundations series](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) and the previous [applications series](seu-sensitivity-applications-01-temperature-as-methodological-probe.html).
