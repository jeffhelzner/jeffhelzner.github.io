---
title: "From Demonstration to Robust AI Decision Evaluation"
date: 2026-09-13
author: "Jeff Helzner"
slug: "seu-sensitivity-applications-part-3-from-demo-to-robust-evaluation"
description: "What the temperature and Claude insurance studies teach about using SEU Sensitivity as a methodology for evaluating AI decisions under uncertainty."
summary: "The value of the early application studies is not that every first result generalized. It is that the framework made the generalization question measurable."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","model-adequacy","series:seu-sensitivity-applications"]
series: "Applying SEU Sensitivity to LLM Decisions"
part: 3
draft: true
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-applications-03-from-demo-to-robust-evaluation.html">
        <meta name="robots" content="noindex, nofollow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "From Demonstration to Robust AI Decision Evaluation",
          "description": "What the temperature and Claude insurance studies teach about using SEU Sensitivity as a methodology for evaluating AI decisions under uncertainty.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-09-13",
          "dateModified": "2026-05-14",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-applications-03-from-demo-to-robust-evaluation.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "AI decision evaluation", "model adequacy", "LLM evaluation", "uncertainty"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to LLM Decisions** · Part 3 of 3
[Part 1](seu-sensitivity-applications-01-temperature-as-methodological-probe.html) · [Part 2](seu-sensitivity-applications-02-result-that-did-not-travel.html) · Part 3
:::

The first application of the SEU Sensitivity framework found a clean broad pattern: for GPT-4o on an insurance claims triage task, higher sampling temperature was associated with lower estimated sensitivity to subjective expected utility differences. The follow-up Claude study on the same task did not reproduce that relationship. The contrast is more informative than either result on its own, and the rest of this post is about why.

![Cross-study comparison of GPT-4o and Claude on the insurance task, showing a clear temperature trend for GPT-4o and no systematic trend for Claude.](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study_files/figure-html/fig-cross-study-output-1.svg){#fig-cross-study-comparison fig-alt="Cross-study comparison isolating the LLM effect. GPT-4o on the insurance task shows a clear decline in alpha as temperature increases, while Claude on the same task shows a flat, non-monotonic pattern."}

## What study 1 established

The GPT-4o study established that the framework could produce an interpretable empirical result in a realistic workflow. Insurance claim descriptions, LLM-generated assessments, embedded feature representations, repeated choice problems, and position counterbalancing were all in the pipeline. The model then estimated how strongly choices tracked the fitted expected-utility structure at each temperature.

The result had the expected broad direction. Estimated `alpha` was higher at low temperature and lower at high temperature; the posterior overall slope was clearly negative; posterior predictive checks did not indicate systematic misfit. That is a meaningful demonstration that the framework can summarize a real LLM decision process in a way that connects back to the interpretation of `alpha`: higher sensitivity means choices are more concentrated on alternatives favored by the fitted expected-utility representation.

The same study had built-in limits. The strict monotonic ordering across every adjacent temperature level was weak; the two intermediate temperatures overlapped; each temperature condition was fit independently even though all five drew from the same pool of claims; the design could not separate temperature effects on assessment text from temperature effects on final selection. The first result established a local empirical pattern in one model on one task, not a general law.

A construct-validity reminder is worth carrying forward from Part 1: the `alpha` parameter is most accurately read as how consistently the LLM's choices track the model's own fitted utility ranking under a shared feature construction and prior. That makes within-design comparisons of `alpha` (as across the temperature conditions) defensible, and it makes absolute, cross-study claims of LLM rationality something stronger that this design does not by itself license. A later series will return to that distinction in its own right.

## What study 2 established

The Claude insurance study established that the GPT-4o pattern was not automatic.

Because the task was held constant, the comparison helps localize the source of heterogeneity. The same insurance triage setting that produced a clear GPT-4o trend did not produce the same trend for Claude. The honest summary is that on this task, the temperature-sensitivity relationship looks at least partly model-specific. A single comparison cell does not show that LLM identity is the dominant factor in general.

The result also showed that model adequacy and substantive conclusions can come apart. The Claude fits passed the relevant posterior predictive checks, and study-specific recovery analysis (anchored on relative metrics, with SBC inherited from the GPT-4o study under an identical prior and likelihood) supported the primary sensitivity estimation task. The framework did not fail to describe the choice data. Rather, the estimated sensitivities did not align with the temperature hypothesis. Sometimes a model fails because it is inadequate; sometimes it fits well enough but the hypothesized effect is not present. A useful methodology should help separate them.

The Claude result also warns against treating provider temperature parameters as portable behavioral instruments. The same nominal temperature need not imply the same effective entropy, the same affected decision stage, or the same interaction with post-training behavior across providers.

## What the contrast teaches about evaluation

Both results depended on posterior uncertainty rather than point estimates.

In the GPT-4o study, uncertainty kept two claims separate: strong evidence for a negative overall slope, much weaker evidence for strict monotonicity across all five temperature levels. In the Claude study, uncertainty prevented the up-and-down sequence from being overinterpreted as a complex temperature-response curve; the posterior was consistent with noise around a roughly flat function. In both cases, posterior comparisons (rather than point summaries) carried the substantive claims.

Diagnostics also did real work. Prior predictive checks, parameter recovery, simulation-based calibration where applicable, and posterior predictive checks did not prove that the model was true; no model gets that privilege. They changed the status of the estimate from a score assigned by fiat into an inference whose assumptions had been inspected. For AI evaluation that matters, because LLMs can produce fluent, plausible-looking output while remaining unstable in the parts of the decision problem that count.

Read together, the two studies illustrate something the framework should be able to do: detect a structured pattern when one is present, refuse to support one when the data do not contain it, and tell us which kind of conclusion the data actually license.

## Methodological directions

The temperature pilots are early applications, and they suggest several design directions for more substantial follow-up work.

First, condition-level fits should be pooled hierarchically when conditions share design ingredients. Fitting each temperature level independently, as both pilots did, is fine for a first pass but slightly overstates between-condition evidence whenever a shared design factor (such as a common pool of claim descriptions) sits behind every condition. A hierarchical version of the model would handle this directly.

Second, designs should separate stages of the decision process where possible. If an LLM both generates assessments and makes choices, a single manipulation can move feature representations and final selections simultaneously. Holding assessments fixed while varying the choice prompt, or holding feature representations fixed while comparing choice policies, would help identify which stage a temperature-like manipulation actually affects.

Third, comparisons should be built into the design rather than added afterward. The Claude study was valuable largely because it held the task fixed and changed the LLM. The natural next step is to vary model, prompt, and task factors systematically so that effects can be attributed to a factor rather than inferred from contrasting one-off studies.

Fourth, the alternative sets and consequence structures themselves should be richer. The most informative future applications will not be the ones that ask whether a particular API knob shifts `alpha`. They will be the ones that ask whether the framework can discriminate decision behavior across genuinely different decision standards, with adequacy checks reported alongside the estimates.

## A measured conclusion

The practical lesson from the two pilots is not "always lower the temperature." It is not that one provider's model is globally more SEU-sensitive than another's. It is not that SEU is the only decision standard that matters.

The practical lesson is more modest. AI decision behavior has to be measured in context -- model, task, prompt, feature construction, choice set, consequence structure, prior, and diagnostics -- and a result that holds in one context will not automatically travel to another. That is not a failure of evaluation; it is the reason evaluation is needed.

The early applications are best read as a bridge. They connect the foundational SEU Sensitivity framework to real LLM choice data, show how a promising pattern can be found and then narrowed, and motivate experiments where the substantive decision problem is richer than a sampling-parameter sweep.

The value of these pilots is not that the first result generalized. It is that the framework made the generalization question measurable.

## Sources

This post draws on [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html) and [Temperature and SEU Sensitivity: Claude x Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html), with background from the SEU Sensitivity foundations series.

