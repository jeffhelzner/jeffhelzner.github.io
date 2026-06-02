---
title: "What the GPT-4o Temperature Result Showed, and Why It Did Not Travel to Claude"
date: 2026-06-01
author: "Jeff Helzner"
slug: "seu-sensitivity-applications-part-2-result-that-did-not-travel"
description: "Results of the initial GPT-4o temperature study, a follow-up Claude study on the same insurance task that did not reproduce the pattern, and what the contrast licenses by way of conclusion."
summary: "The GPT-4o study found a clear broad decline in estimated SEU sensitivity as temperature increased. The same task with Claude produced no such pattern. The contrast — and its caveats — is what the framework is built to expose."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","replication","series:seu-sensitivity-applications"]
series: "Applying SEU Sensitivity to LLM Decisions"
part: 2
draft: false
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-applications-02-result-that-did-not-travel.html">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "What the GPT-4o Temperature Result Showed, and Why It Did Not Travel to Claude",
          "description": "Results of the initial GPT-4o temperature study, a follow-up Claude study on the same insurance task, and what the contrast licenses by way of conclusion.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-06-01",
          "dateModified": "2026-06-01",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-applications-02-result-that-did-not-travel.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Claude", "GPT-4o", "LLM replication", "temperature", "AI decision evaluation", "hierarchical model"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to LLM Decisions** · Part 2 of 2  
[Part 1](seu-sensitivity-applications-01-temperature-as-methodological-probe.html) · Part 2
:::

[Part 1](seu-sensitivity-applications-01-temperature-as-methodological-probe.html) set up the initial GPT-4o temperature study: an insurance claims triage task, five temperature conditions, a calibrated prior, parameter recovery for `alpha` at the application's scale, and posterior predictive adequacy at every temperature. With that scaffolding in place, the per-condition `alpha` posteriors can be compared as inference rather than as raw numbers. This post takes up that comparison, then turns to a follow-up study that held the task fixed and changed the LLM, and closes with what the two studies — read together — license by way of conclusion.

## What the GPT-4o study found

The headline pattern is the one a reader of [Part 1](seu-sensitivity-applications-01-temperature-as-methodological-probe.html) would expect to look for. Posterior medians for `alpha` were highest at temperature `0.0` and lowest at temperature `1.5`, with the intermediate temperatures falling between those endpoints. The full posterior summaries are in [§Posterior Summaries](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-posterior-summaries). The forest plot makes the per-condition uncertainty visible alongside the central tendency.

![Forest plot of posterior `alpha` distributions across the five temperature conditions for GPT-4o. Points are posterior medians; thick bars span the 50% credible interval and thin bars the 90% credible interval.](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study_files/figure-html/fig-forest-output-1.svg){#fig-gpt4o-forest fig-alt="Forest plot showing posterior alpha for GPT-4o at temperatures 0.0, 0.3, 0.7, 1.0, and 1.5; alpha is highest at 0.0 and declines toward 1.5, with overlapping intervals at 0.3 and 0.7."}

### Global slope

The aggregate question — whether `alpha` declines with temperature on the whole — is summarised by the posterior over a draw-wise linear slope `Δalpha/ΔT`. For each posterior draw, the report fits an ordinary least-squares line through the five `alpha` values and records the slope; the collection of slopes across draws is the posterior the report displays. (This is a derived quantity, not a regression model in its own right.) The result, in [§Monotonicity Analysis](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#sec-monotonicity), is a posterior median of approximately `-31` with a 90% credible interval of `[-66, -8]` and `P(slope < 0) ≈ 0.99`.

![Posterior distribution of the draw-wise slope `Δalpha/ΔT` for GPT-4o across temperatures `0.0`–`1.5`. The 90% credible interval lies entirely below zero.](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study_files/figure-html/fig-slope-output-1.svg){#fig-gpt4o-slope fig-alt="Posterior distribution of the global slope of alpha against temperature for GPT-4o, with the entire 90% credible interval to the left of zero."}

So at the global level the evidence for a negative relationship is strong. The local pattern is less tidy: `T = 0.3` and `T = 0.7` are nearly indistinguishable, and the probability that `alpha` is strictly decreasing across all five temperature levels is only about `0.12`, driven almost entirely by the overlap between the two intermediate conditions. Collapsing `T = 0.3` and `T = 0.7` into a single intermediate level raises the probability of the resulting coarser ordering to about `0.38`. The headline directional claim — `alpha` decreases with temperature on the whole — is much better supported than any fine-grained claim about every adjacent step.

### A design-induced correlation caveat

There is a subtler caveat about how confidently the conditions can be compared, set out in the [Independence Caveat](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#pairwise-comparisons) within the pairwise-comparisons section. The five temperature conditions in this study draw their decision problems from a single fixed pool of `R = 30` insurance claims. Whatever is idiosyncratic about that particular pool — the embedding geometry that happens to fall out of those texts, the spread of expected utilities across alternatives, the typical gap between the best and second-best option — shifts every condition's estimate in the same direction. Fitting `m_01` independently at each temperature treats the five datasets as the only sources of evidence and so reports five posterior summaries that look statistically unrelated even though they share a common, unmodelled nuisance factor.

The practical consequence is that the pairwise comparisons across temperature conditions, which treat the per-temperature posteriors as if they were independent, slightly overstate how confidently we can resolve between-temperature differences. The same point applies, more mildly, to the global-slope summary above, which is also a function of independent per-condition fits. A hierarchical version of the model — for example one that writes `log alpha(T) = γ₀ + γ₁ · T + η` with a small condition-level random effect — would handle this on two fronts: it makes the common effect of the shared claim pool a single estimated quantity, so design-induced shifts cancel out of between-condition contrasts; and it borrows strength across conditions for the systematic effect of interest, producing a single calibrated uncertainty statement about the temperature–sensitivity relationship. As [§Next Steps](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#next-steps) of the technical report notes, this hierarchical extension has already been developed; the underlying machinery is laid out in foundational reports 8 through 12, available from the [SEU Sensitivity project page](https://jeffhelzner.github.io/seu-sensitivity/), and it will be the subject of a separate blog series. The qualitative direction of the headline result is not threatened by the caveat, but the fine-grained ordering across adjacent temperatures should be read as more provisional than independent fits make it look.

## A natural follow-up: hold the task, vary the LLM

A single pilot, however carefully checked, cannot tell us whether the pattern travels. Temperature was always a probe of the measurement device rather than a deep substantive commitment, and there are several reasons the relationship could plausibly turn out to be model-specific: provider APIs implement temperature in different decoding stacks; post-training regimes differ; the stage of the decision pipeline most affected by sampling randomness could differ. The cleanest way to put the framework's portability to a first test is to hold the task fixed and change the LLM.

That is the design of the second pilot, [Temperature and SEU Sensitivity: Claude × Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html). The task is the same insurance triage task used in [Part 1](seu-sensitivity-applications-01-temperature-as-methodological-probe.html). The choice model is the same `m_01` variant under the same `Lognormal(3.0, 0.75)` prior on `alpha`. The same 100 base problems, three position-counterbalanced presentations, and pooled-PCA feature pipeline are used. The only intentional change is the underlying LLM: Claude 3.5 Sonnet (Anthropic) in place of GPT-4o (OpenAI).

One design parameter does change for reasons outside the experimenter's control. The Anthropic API supports temperature values in `[0.0, 1.0]`, against OpenAI's `[0.0, 2.0]`. The Claude study uses temperatures `{0.0, 0.2, 0.5, 0.8, 1.0}` rather than the GPT-4o study's `{0.0, 0.3, 0.7, 1.0, 1.5}`. The narrower span reduces statistical power to detect a large temperature effect and complicates direct numerical comparisons of slope magnitudes; nothing about it threatens the qualitative reading.

## What the Claude study found

The Claude `alpha` estimates do not exhibit a clear negative relationship with temperature. Posterior medians are roughly `74` at `T = 0.0`, drop to `55` at `T = 0.2`, rise back to `77` at `T = 0.5` and `74` at `T = 0.8`, and fall again to `57` at `T = 1.0`. The posteriors overlap substantially, and no clear ordering by temperature emerges. The full summary table is in [§Posterior Summaries](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html#sec-posterior-summaries) of the Claude report.

The cross-study comparison plot puts the two patterns side by side under the same task and choice model.

![Cross-study comparison isolating the LLM effect. Left: GPT-4o on the insurance task shows a clear decline in `alpha` as temperature increases. Right: Claude on the same task shows a flat, non-monotonic pattern.](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study_files/figure-html/fig-cross-study-output-1.svg){#fig-cross-study fig-alt="Two-panel cross-study plot. Left panel shows alpha declining with temperature for GPT-4o; right panel shows a flat, non-monotonic pattern for Claude on the same insurance task."}

The global slope quantifies the contrast. For Claude, the posterior median slope is approximately `-3.6`, the 90% credible interval is `[-54, 39]`, and `P(slope < 0) ≈ 0.56` — barely above chance. The probability of strict monotonic decrease across all five Claude temperature levels is below `0.01`. A formal cross-study comparison reported in [§Comparison with Initial Temperature Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html#sec-comparison) puts `P(GPT-4o slope < Claude slope) ≈ 0.82`. The temperature-sensitivity relationship observed for GPT-4o on this task did not reproduce when the same task was run with Claude.

It is tempting to read the up-and-down sequence of Claude posterior medians as a genuine non-monotonic response to temperature. The oscillation analysis in [§Characterising the Oscillatory Pattern](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html#sec-characterising-oscillation) does not support that reading: no individual pairwise comparison reaches a conventionally notable level, and the pattern is consistent with posterior noise around a roughly flat function. The honest summary is not that Claude has a complex temperature-response curve on this task; it is that on this task Claude does not exhibit the negative temperature–sensitivity relationship that GPT-4o does.

### The model still fit Claude's data

The natural worry to rule out is that the absence of a temperature trend is an artefact of model failure on Claude's data. The adequacy checks do not support that reading. Study-specific parameter recovery for `alpha` under the Claude design is fit for purpose on the relative metrics that anchor cross-study comparison; the differences in absolute recovery numbers between the two reports reflect the random seeds of two synthetic recoveries drawn from the same prior, not anything LLM-specific. The simulation-based calibration of `alpha` under this prior and likelihood was already established in the initial GPT-4o study and is inherited validly here; SBC tests the sampler under the prior and likelihood, both of which are identical across the two applications. Posterior predictive p-values across the five Claude conditions fall in `[0.3, 0.7]`, indicating no systematic misfit. The detail is in [§Model Validation](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html#sec-model-validation) and [§Posterior Predictive Checks](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html#sec-posterior-predictive-checks) of the Claude report.

Sometimes a model fails to detect an effect because it is inadequate for the data; sometimes the model is adequate and the hypothesised effect is not present. A useful measurement framework should help tell those two cases apart. In the Claude study the model is adequate and the hypothesised effect is, at the resolution this design supports, not present.

## Reading the contrast

The temperature parameter exposed by provider APIs is not, on this evidence, a portable behavioural instrument. The same nominal temperature need not imply the same effective sampling entropy across providers; it need not affect the same stage of a multi-stage decision pipeline in the same way across providers; and the LLM's post-training regime can in principle regularise task behaviour so that surface expression varies under temperature without the selected alternative varying. The Claude report's discussion in [§Why Does the Effect Differ Across LLMs?](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html#sec-why-differ) lists these candidate explanations more fully. The present designs cannot adjudicate among them and do not try to.

The contrast also illustrates what the comparative reading of `alpha` is, and what it is not. The reading the two studies support is a within-design one: under a shared task, prior, feature pipeline, and choice model, GPT-4o's choices on this task concentrate more sharply on the alternative ranked highest by the fitted utility at low temperature than at high temperature, and Claude's choices on this task do not show that pattern. That is a comparative claim about `alpha` under a fixed measurement device. It is not a claim that the absolute level of `alpha` certifies one LLM as more rational than another in some context-free sense. The construct-validity layering — between within-model consistency, comparative claims under a shared design, and absolute claims about EU rationality — is laid out at greater length in the [construct-validity discussion](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html#construct-validity-of-) of the initial-study report.

The methodological value of the contrast is that the framework was able to detect a structured relationship when one was present and to refuse to support one when the data did not contain it. That is not a flashy finding, but it is the kind of finding that distinguishes an evaluation framework from a scoreboard.

## What comes next

Two threads run forward from these two pilots.

The first is the hierarchical extension already mentioned in connection with the design-induced correlation caveat. The model in question — `h_m01` — is the `m_01` likelihood extended across experimental cells, with cell-specific `alpha`-values regressed on cell covariates and a shared scale parameter. It addresses the shared-pool nuisance directly and frames between-condition contrasts as regression effects on `log alpha`, giving a single calibrated uncertainty statement for the temperature–sensitivity relationship rather than five independent fits stitched together after the fact. The construction and validation of `h_m01` are spelled out in foundational reports 8 through 12 on the [SEU Sensitivity project page](https://jeffhelzner.github.io/seu-sensitivity/), and they will be the subject of a separate blog series.

The second is the natural substantive next step for the applications programme. The insurance triage task served well as a vehicle for the first methodological tests, but it is not the most informative setting for asking what the framework can tell us about an LLM's relationship to a stated decision standard. A planned next applications series moves the underlying task to **Ellsberg-style decision problems**, where the structure of the decision setting makes the EU standard sharper and the comparison across LLMs and conditions more directly interpretable. The corresponding technical reports are [GPT-4o × Ellsberg](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html) and [Ellsberg study](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html).

The value of these first two pilots is not that every result generalised. It is that the framework made the generalisation question measurable.

## Sources

This post draws on [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html) and [Temperature and SEU Sensitivity: Claude × Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html), with background from the [foundations series](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) and the SEU Sensitivity project's foundational reports.
