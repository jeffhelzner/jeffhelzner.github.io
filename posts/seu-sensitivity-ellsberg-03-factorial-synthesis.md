---
title: "Factorial Synthesis: What Travels, What Does Not, and What the Design Cannot Decide"
date: 2026-06-08
author: "Jeff Helzner"
slug: "seu-sensitivity-ellsberg-part-3-factorial-synthesis"
description: "Reading the four cells of the 2x2 LLM-by-task design together: a dominant LLM main effect, a secondary task main effect, and an uninformative interaction."
summary: "Across both tasks, GPT-4o shows a clear negative temperature-alpha slope and Claude does not. The cross-task contrast is weaker, and the data are too noisy to decide whether the structure is additive or interactive. The framework's value is not that every first result generalizes; it is that the generalization question becomes measurable."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","ellsberg","factorial","gpt-4o","claude","series:seu-sensitivity-ellsberg"]
series: "Applying SEU Sensitivity to Ellsberg-Style Decisions"
part: 3
draft: false
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-ellsberg-03-factorial-synthesis.html">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Factorial Synthesis: What Travels, What Does Not, and What the Design Cannot Decide",
          "description": "Reading the four cells of the 2x2 LLM-by-task design together: a dominant LLM main effect, a secondary task main effect, and an uninformative interaction.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-06-08",
          "dateModified": "2026-06-08",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-ellsberg-03-factorial-synthesis.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Ellsberg paradox", "factorial design", "GPT-4o", "Claude 3.5 Sonnet", "LLM evaluation", "hierarchical model"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to Ellsberg-Style Decisions** · Part 3 of 3  
[Part 1](seu-sensitivity-ellsberg-01-from-insurance-to-urns.html) · [Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html) · Part 3
:::

[Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html) established the per-LLM Ellsberg results: a clear broad decline in `alpha` for GPT-4o as temperature increases, no such decline for Claude. The qualitative shape mirrors the insurance pair from the [previous applications series](seu-sensitivity-applications-02-result-that-did-not-travel.html). With both Ellsberg cells in hand alongside the two insurance cells, the natural object of analysis is the 2×2 design that crosses LLM (GPT-4o vs. Claude 3.5 Sonnet) with task (insurance triage vs. Ellsberg gambles).

This post takes that 2×2 design as a single comparative picture. It reads what the LLM and task factors contribute, what an interaction analysis can and cannot license here, and what limitations the design carries forward into any next step. The underlying machinery is in the [Factorial Synthesis](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html) report; the present post abstracts the headline picture and links into the report's sections where the abstraction loses detail an interested reader might want.

## The 2×2 design and an important caveat

The four cells are summarized in the table below. Each cell is an independent Bayesian fit at the design parameters and prior appropriate for its task; the synthesis loads the per-condition `alpha` posteriors from those fits and combines derived summaries across them.

| Cell | LLM | Task | K | Model variant | Temperature grid |
|------|-----|------|---|--------------|-----------------|
| (1,1) | GPT-4o | Insurance | 3 | `m_01` | {0.0, 0.3, 0.7, 1.0, 1.5} |
| (1,2) | GPT-4o | Ellsberg | 4 | `m_02` | {0.0, 0.3, 0.7, 1.0, 1.5} |
| (2,1) | Claude 3.5 Sonnet | Insurance | 3 | `m_01` | {0.0, 0.2, 0.5, 0.8, 1.0} |
| (2,2) | Claude 3.5 Sonnet | Ellsberg | 4 | `m_02` | {0.0, 0.2, 0.5, 0.8, 1.0} |

The caveat that needs to be on the page before any cross-cell statement is the following. The synthesis combines posterior draws from four independently fitted models, with no shared parameters across cells. It is not a single hierarchical model. Between-cell contrasts therefore carry more uncertainty than the within-cell statements that Part 2 reported, and the right reading of the cross-cell probabilities below is as comparative summaries rather than as posterior probabilities of a unified parameter. A hierarchical extension — one in which `log alpha` is regressed on cell covariates inside a single likelihood — would tighten these between-cell contrasts and is the subject of a future blog series, drawing on foundational reports 8 through 12 from the [SEU Sensitivity project page](https://jeffhelzner.github.io/seu-sensitivity/). The synthesis here is explicitly exploratory.

The per-cell global slopes, reproduced from the previous posts and from the [§Monotonicity Summary](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html#monotonicity-summary) of the report, are the following.

| Cell | Median slope | 90% CI | P(slope < 0) | P(strict monotonic decrease) |
|------|--------------|--------|--------------|-------------------------------|
| GPT-4o × Insurance | −30.8 | [−65.5, −8.3] | 0.991 | 0.125 |
| GPT-4o × Ellsberg | −48.0 | [−90.2, −12.5] | 0.984 | 0.090 |
| Claude × Insurance | −3.6 | [−53.6, 38.5] | 0.560 | 0.008 |
| Claude × Ellsberg | −18.8 | [−65.3, 24.5] | 0.766 | 0.009 |

The within-cell evidence concentrates on a single qualitative split: the two GPT-4o cells show clear negative slopes (`P(slope < 0) > 0.98` in both), and the two Claude cells do not (`P(slope < 0) ≈ 0.56` and `≈ 0.77`).

## LLM main effect: the dominant pattern

Holding the task fixed, the LLM contrast asks whether GPT-4o's slope is more negative than Claude's. The relevant figure puts the two slopes side by side within each task.

![Cross-LLM slope comparison within each task. Top row: GPT-4o slopes; bottom row: Claude slopes. Within both tasks, GPT-4o's posterior global slope is more negative than Claude's, with `P(GPT-4o slope < Claude slope) ≈ 0.82` (insurance) and `≈ 0.80` (Ellsberg).](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis_files/figure-html/fig-llm-effect-output-1.svg){#fig-llm-effect fig-alt="Cross-LLM slope comparison plot showing GPT-4o's slope distribution to the left of Claude's within both the insurance task and the Ellsberg task."}

The two within-task LLM probabilities are `P(GPT-4o slope < Claude slope) ≈ 0.817` on insurance and `≈ 0.797` on Ellsberg. The detail is in [§LLM Main Effect](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html#llm-main-effect) of the report. The directional claim is consistent across tasks; the magnitude is moderate rather than decisive. This gap between the within-cell evidence (`P > 0.98` for GPT-4o's slope being negative) and the between-cell evidence (`P ≈ 0.80` for the cross-LLM ordering) is exactly the slack that the independent-fits caveat above predicts. Independent fits give up sharing of information across cells, and the cross-cell posterior pays for it in width.

Read together with the per-cell evidence in [Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html), the LLM factor accounts for most of the qualitative variation across the four cells. GPT-4o shows a clear negative temperature–`alpha` slope on both tasks; Claude shows at best a weak negative trend on either.

## Task main effect: secondary

Holding the LLM fixed, the task contrast asks whether the Ellsberg cells have steeper slopes than the insurance cells.

![Within-LLM task comparison. Left: GPT-4o — both tasks show declining `alpha` with temperature, with the Ellsberg slope somewhat steeper. Right: Claude — neither task shows a convincing decline, though the Ellsberg slope is slightly more negative than the insurance slope.](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis_files/figure-html/fig-task-effect-output-1.svg){#fig-task-effect fig-alt="Within-LLM task comparison plot showing GPT-4o slopes declining on both insurance and Ellsberg tasks, and Claude slopes flat-to-weakly-negative on both tasks."}

The within-LLM probabilities are `P(Ellsberg slope < Insurance slope) ≈ 0.713` for GPT-4o and `≈ 0.655` for Claude. The detail is in [§Task Main Effect](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html#task-main-effect). Changing the task neither eliminates GPT-4o's effect nor creates one for Claude. Within GPT-4o, the Ellsberg slope may be somewhat steeper than the insurance slope, but both tasks show the same qualitative direction; within Claude, neither task produces a convincing slope. The task factor is a secondary contributor relative to LLM identity.

The cross-task magnitudes are not directly comparable in the strict sense — the insurance cells use `m_01` and `K = 3` and the Ellsberg cells use `m_02` and `K = 4`, so an Ellsberg `alpha` of 80 does not have the same behavioral meaning as an insurance `alpha` of 80. The slope analysis is less affected than a comparison of `alpha` levels would be, because the prior is held constant within each task and the slope is a within-task contrast across temperature. Still, the magnitudes should be read directionally rather than absolutely.

## Interaction: uninformative

Once the two main effects are in view, the obvious next question is whether the four cells are additively decomposable or whether an LLM × task interaction is needed. The natural summary is a difference-in-differences contrast: the GPT-4o cross-task slope difference (Ellsberg minus Insurance) minus the Claude cross-task slope difference.

The factorial synthesis reports this contrast as having a posterior median of approximately `−2`, a 90% credible interval of roughly `[−88, 79]`, and `P(interaction > 0) ≈ 0.49`. The 90% interval spans on the order of 170 slope units. The interval shape is what propagating uncertainty through two differences of independently estimated slopes produces, and the right reading is not that the interaction is small. The right reading is that the data are uninformative about its magnitude or sign. The detail is in [§Interaction](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html#interaction).

The visual evidence supports the same reading. The medians plotted in [§Pairwise Comparison Heatmaps](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html#pairwise-comparison-heatmaps) and the interaction figure are roughly parallel, which is consistent with an additive decomposition; but parallel medians of two heavily overlapping posteriors do not, on their own, support an equivalence claim. A formal equivalence statement would require defining a region of practical equivalence on the interaction-effect scale and showing that the posterior concentrates within it, which the current independent-fits design does not support.

## A matched-temperature-range sensitivity check

The cross-LLM comparison reads off the GPT-4o slope over `T ∈ [0.0, 1.5]` against the Claude slope over `T ∈ [0.0, 1.0]`. The most informative endpoint in the GPT-4o data — `T = 1.5` — is not available on the Anthropic side. It is worth asking whether the qualitative LLM contrast survives when the GPT-4o slope is restricted to the Claude-supported range.

The report's [matched-range analysis](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html#temperature-range-confound) recomputes the GPT-4o slope over `T ≤ 1.0` and reruns the within-task LLM comparison. On insurance the matched-range probability is `P(GPT matched slope < Claude slope) ≈ 0.824` — essentially unchanged from the full-range `≈ 0.817`. On Ellsberg the matched-range probability falls to `≈ 0.612`. The qualitative LLM conclusion — GPT-4o declining on both tasks, Claude flat on both — is not an artifact of the wider GPT-4o range. The cross-LLM Ellsberg probability, however, weakens enough on the matched range to be worth flagging as a place where the cross-LLM contrast on this task is on softer ground than the full-range number suggests.

## Comparability caveats, called out rather than buried

Two comparability assumptions sit underneath the synthesis and are worth restating explicitly.

The first is that comparisons across the task dimension use different priors and different consequence-space dimensions (`m_01` with `K = 3` for insurance vs. `m_02` with `K = 4` for Ellsberg). The priors were chosen so that the prior-implied SEU-maximization rates match across tasks within a few percentage points (78% vs. 76%), which makes the priors comparable as expressions of background expectation about EU-aligned LLM choice behavior in each setting. It does not make cross-task `alpha` magnitudes directly comparable. The synthesis therefore focuses on directional and rank quantities — slope signs, `P(slope < 0)`, and pairwise probabilities — rather than on absolute `alpha` levels.

The second is that comparisons across the LLM dimension assume that the temperature parameter is functionally comparable across providers. The nominal API range differs (`[0, 1]` for Anthropic, `[0, 2]` for OpenAI), and the provider-side decoding implementations are not transparent. Even if the underlying mapping from nominal temperature to effective sampling entropy were identical across providers — which there is no particular reason to assume — the multi-stage prompting pipeline used in these studies could in principle be sensitive to that mapping at different stages in different models. The cross-LLM contrast should be read as a contrast under "same nominal temperature label" rather than as a contrast under "same effective sampling regime."

## Limitations and what the synthesis cannot decide

A handful of limitations beyond comparability are worth holding in view.

The factorial structure was imposed after the fact, in response to the initial non-replication. The synthesis is exploratory and was not pre-registered. The published applications series and the present series should be read jointly as a methodological line, with the next step being a properly hierarchical analysis rather than another independent-fits aggregation.

The pooled-tier scope note from [Part 1](seu-sensitivity-ellsberg-01-from-insurance-to-urns.html) carries forward here. Both Ellsberg cells pool across the three ambiguity tiers and fit a single `alpha` per condition. The synthesis therefore speaks to overall SEU sensitivity on Ellsberg-style stimuli, not to ambiguity-specific processing. Whether GPT-4o or Claude exhibits an analogue of ambiguity aversion — and, separately, whether the standard responses to Ellsberg's example should be read psychologically, normatively (as Ellsberg himself argued), or as violations of completeness on the ordering of acts (as Levi argued) — are questions the model fit here cannot adjudicate. A tier-stratified analysis would begin to address the empirical version of the first question and is identified as a priority for future work in both Ellsberg reports.

The design covers two LLMs and two tasks. The synthesis cannot say whether the GPT-4o-versus-Claude qualitative split would generalize to other model families (Llama, Gemini) or to other task families with different structural properties. The temperature implementations, training data, post-training regimes, and decoding stacks of GPT-4o and Claude differ along many dimensions at once, and the present design cannot decompose the "LLM main effect" into any of them.

Per-condition sample size (`M ≈ 300`) is generous enough to identify `alpha` cleanly within each cell, as the parameter recovery and posterior predictive checks of [Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html) showed. It is not generous enough to license sharp claims about local non-monotonic structure within either Claude cell. The alternating Claude × Ellsberg pattern is read here as consistent with posterior noise around a roughly flat function; whether it would resolve into a systematic mechanism under larger samples or a hierarchical analysis is an open question.

## Where this leaves the program

Stepping back from the four-cell detail, the substantive headline is the one the per-cell evidence already pointed to: under both task families covered so far, GPT-4o's choices concentrate more sharply on the SEU-maximizing alternative at low temperature than at high temperature, and Claude's choices do not. The task factor is a secondary contributor to this picture; the interaction is unresolved.

The methodological headline is the more general one. The framework can identify a structured temperature–`alpha` relationship when one is present in the data; it can refuse to support one when it is not; and it can compare those two cases — under a calibrated prior, with diagnostics that constrain the comparison — across LLMs and tasks. The value of the framework here is not that every first result generalized. It is that the generalization question became measurable, and the data licensed a clean qualitative split on the LLM axis while leaving the interaction question honestly unresolved.

The natural next step from this synthesis is hierarchical modeling. A model that estimates `log alpha` as a function of LLM, task, and temperature inside a single likelihood — rather than synthesizing four independent fits after the fact — would sharpen the between-cell contrasts, allow a principled interaction-effect estimate with calibrated uncertainty, and provide a single device against which a region-of-practical-equivalence statement could be made. The construction and validation of that model — the `h_m01` and `h_m02` extensions — are laid out in foundational reports 8 through 12 on the [SEU Sensitivity project page](https://jeffhelzner.github.io/seu-sensitivity/) and will be the subject of a separate blog series.

## Sources

This post draws on the [Factorial Synthesis](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html) report, together with the four underlying cell reports: [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html), [Temperature and SEU Sensitivity: Claude × Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html), [Temperature and SEU Sensitivity: Ellsberg Study](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html), and [Temperature and SEU Sensitivity: GPT-4o × Ellsberg Study](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html). Background from the [foundations series](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html), the previous [applications series](seu-sensitivity-applications-01-temperature-as-methodological-probe.html), and Part 1 and Part 2 of the present series.
