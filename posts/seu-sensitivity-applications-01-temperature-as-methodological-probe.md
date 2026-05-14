---
title: "Using Temperature to Probe SEU Sensitivity"
date: 2026-08-02
author: "Jeff Helzner"
slug: "seu-sensitivity-applications-part-1-temperature-as-methodological-probe"
description: "How an initial GPT-4o temperature study used real LLM choice data to test whether the SEU Sensitivity framework could detect structured changes in decision behavior."
summary: "The first application of the SEU Sensitivity framework used temperature less as a deep theory of LLM cognition than as a practical stress test: can the method detect a structured change in real choice behavior?"
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","temperature","series:seu-sensitivity-applications"]
series: "Applying SEU Sensitivity to LLM Decisions"
part: 1
draft: true
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-applications-01-temperature-as-methodological-probe.html">
        <meta name="robots" content="noindex, nofollow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Using Temperature to Probe SEU Sensitivity",
          "description": "How an initial GPT-4o temperature study used real LLM choice data to test whether the SEU Sensitivity framework could detect structured changes in decision behavior.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-08-02",
          "dateModified": "2026-05-14",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-applications-01-temperature-as-methodological-probe.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "LLM temperature", "AI decision evaluation", "GPT-4o", "Bayesian decision model"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to LLM Decisions** · Part 1 of 3  
Part 1 · [Part 2](seu-sensitivity-applications-02-result-that-did-not-travel.html) · [Part 3](seu-sensitivity-applications-03-from-demo-to-robust-evaluation.html)
:::

The foundations series developed the SEU Sensitivity framework as a way to ask how strongly observed choices track subjective expected utility differences. The framework is deliberately narrower than a full theory of intelligence, rationality, or trustworthiness. It estimates a relationship between a decision maker's choices and a stated decision standard, then asks whether that estimate is uncertain, interpretable, and adequate for the task.

The next question is what happens when the framework is applied to real data. That is what this third series is about. The two studies discussed here are best read as pilots intended to probe the measurement device itself -- the `m_0` family of models introduced in the foundations series -- rather than as substantive claims about LLM cognition.

The first pilot used LLM temperature as the experimental lever. There is a loose folk intuition behind that choice. Temperature is sometimes described as a creativity dial, and creativity is sometimes informally contrasted with disciplined or rational choice. That intuition was suggestive, but it was not the real reason temperature was selected. The real reason was that temperature is an easy knob: it is exposed by the API, it plausibly changes the stochasticity of outputs, and it gives a manipulation under which something should change if the framework is detecting anything at all. In that sense, the question the study asked was less "what does temperature do to LLM rationality" and more "does the measurement device pick up a structured change in choice behavior when we move the easiest available lever?"

If the framework cannot detect any structure in this setting, that would itself be informative. If it does detect structure, that is also informative, though not yet a general conclusion about LLMs.

The initial study should therefore be understood as a methodological application to real LLM choice data. It asks whether the framework can move from simulated validation to an empirical setting where a model makes repeated decisions under uncertainty.

## The question the study asked

The study used GPT-4o in an insurance claims triage task. In each decision problem, the model was presented with a small set of insurance claims and asked which claim should be forwarded for investigation. Each claim was treated as an alternative whose consequences could be represented within the SEU Sensitivity framework.

The experimental factor was sampling temperature. The study used five temperature levels: 0.0, 0.3, 0.7, 1.0, and 1.5. Each temperature condition was treated as its own data collection.

The motivating hypothesis was simple. In the SEU Sensitivity model, the parameter `alpha` governs how sharply choices concentrate on alternatives that the model ranks higher in expected utility. In a language model, temperature affects the entropy of token sampling. If more sampling randomness propagates into final choices, then higher temperature should be associated with lower estimated `alpha`.

That pathway is plausible, but it is not mechanistically clean. Temperature can affect intermediate reasoning, the language of claim assessments, and final answer selection at once. The study does not identify which internal mechanism is responsible. It tests the aggregate relationship between temperature and estimated sensitivity. That limitation is part of why the study is best read as a probe of the measurement framework rather than as a full theory of temperature.

## How choices became model input

The study used 100 base decision problems, each presented three times with claim positions shuffled. That produced 300 choice observations per temperature condition. The position counterbalancing mattered because an earlier pilot had revealed a position-bias problem: unparseable responses had effectively been mapped to a default position. In the revised study, unparseable responses were recorded as missing rather than silently converted into choices, and the final dataset had no missing choices.

The alternatives were represented through a two-stage feature process. First, the LLM assessed each claim individually, producing natural-language text. Second, those assessments were embedded using `text-embedding-3-small`, then projected into a 32-dimensional feature space using PCA. The PCA basis was fit across all temperature conditions so that the conditions shared a common coordinate system.

This is a practical way to turn unstructured LLM assessments into features the SEU Sensitivity model can use. It is also a source of caution. Because the assessment text itself can vary with temperature, the features may partly reflect temperature effects on assessment language rather than only stable differences among claims. The application therefore measures the behavior of the whole assessment-and-choice process under each temperature condition.

For an early empirical study, that is acceptable. The goal is not to isolate every causal pathway. The goal is to ask whether the fitted sensitivity parameter changes in a coherent way when the LLM decision process is perturbed.

## Why model validation came first

The previous series emphasized that a model can always produce a number. The number becomes evidence only when there are adequacy checks supporting its interpretation.

The temperature study took that point seriously. Before fitting the empirical data, the analysis calibrated a model variant called `m_01`. This variant preserved the structure of the foundational `m_0` model but used a more informative prior on `alpha`. The generic foundational prior had been designed for broad simulation work, including near-random decision makers. For LLM choice data in this task, the prior placed too much mass in a region where choices would be nearly random and also created numerical issues at very high values. A prior predictive grid search motivated a lognormal prior centered in a more plausible sensitivity range while still allowing substantial uncertainty.

The study then checked whether the model could recover known parameters under the actual study design: 300 observations, three consequences, 32 feature dimensions, and 30 distinct alternatives. The primary quantity of interest, `alpha`, recovered well enough for the purpose of the study. The familiar difficulty from the foundations work remained: the components that decompose expected utility into feature effects and utility increments are harder to identify than the sensitivity parameter itself. But for this application, the main inferential target was comparative sensitivity across temperature conditions.

The study also used simulation-based calibration for the model variant and design. The key result was that uncertainty about `alpha` was well calibrated in the simulated checks. This matters because the application is not merely asking for a best-fitting line. It is asking whether posterior uncertainty around sensitivity can be trusted well enough to compare conditions.

That validation work is easy to skip in a public summary because it is technical. But it is the reason the application belongs to the same project as the foundations series. The empirical claim is not just that the plotted estimates look interesting. It is that the model has been checked in ways that make the sensitivity estimates interpretable for this design.

## What the study found

The fitted `alpha` estimates showed the expected broad pattern. Estimated sensitivity was highest at temperature 0.0 and lowest at temperature 1.5. The posterior median for `alpha` was about 78 at temperature 0.0 and about 37 at temperature 1.5, with the intermediate temperatures falling between those endpoints.

At the global level, the evidence for a negative relationship was strong. A draw-wise slope analysis estimated the relationship between temperature and `alpha`; the posterior median slope was about -31, and the posterior probability that the slope was negative was about 0.99.

That is the headline result: in this initial GPT-4o insurance triage study, higher temperature was associated with lower estimated sensitivity to expected utility differences.

The local pattern was less tidy. Temperatures 0.3 and 0.7 were nearly indistinguishable. The probability that `alpha` was strictly decreasing across all five temperature levels was only about 0.12, driven almost entirely by the overlap between those two intermediate conditions. Collapsing the two into a single intermediate level raised the probability of the resulting coarser ordering to about 0.38. The study therefore supported a broad directional claim more strongly than a fine-grained claim about every adjacent temperature step.

![GPT-4o temperature study summary: posterior medians with 90% credible intervals and pairwise posterior probabilities for alpha across temperature conditions.](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study_files/figure-html/fig-summary-output-1.svg){#fig-gpt4o-temperature-summary fig-alt="Summary visualization from the GPT-4o temperature study. The left panel shows alpha posterior medians with 90 percent credible intervals across temperatures. The right panel shows pairwise posterior probabilities that alpha is higher in one temperature condition than another."}

There is also a subtler caveat about how confidently the conditions can be compared. The same pool of 30 insurance claims was used at every temperature. That design choice sharpens within-condition precision but introduces a shared, unmodeled factor across conditions: whatever is idiosyncratic about that particular set of 30 claims shifts every estimate in the same direction. Treating the five posteriors as independent -- as the pairwise comparisons above do -- slightly overstates how confidently we can resolve between-temperature differences. A hierarchical version of the model that fits all five conditions jointly would handle this properly and is a natural next step for follow-up work. The qualitative direction of the headline result is not threatened by this caveat, but the fine-grained ordering is more provisional than independent fits make it look.

## What adequacy checks showed

Posterior predictive checks found no evidence of systematic misfit at any temperature level. The analysis compared observed choices to replicated datasets using several summaries, including log-likelihood, modal choice frequency, and mean predicted probability of the observed choice. The resulting posterior predictive p-values were comfortably away from the extremes.

That is reassuring, but it should not be overread. Posterior predictive checks show that the model can reproduce important features of the observed data. They do not show that the model captures the internal mechanism by which temperature affects the LLM. Nor do they show that the same relationship will hold for a different model, task, prompt, or feature construction.

The application therefore gives us a meaningful measurement in a specific setting. It does not give us a universal law of LLM temperature.

## What `alpha` is and is not measuring

One further qualification is worth stating directly, because it shapes how the rest of this series should be read. The `alpha` parameter is most accurately described as how consistently the LLM's choices track the model's own fitted utility ranking -- not as a context-free score for how rational the LLM is. The fitted utility depends on the feature construction, the prior, and the design. A comparison of `alpha` across conditions that share these ingredients (as the temperature conditions do) is a defensible comparative claim. A claim that some absolute value of `alpha` certifies an LLM as rational, in a sense that travels across studies, would be a stronger claim and would need stronger identifying structure than the present design provides.

This distinction matters more for some kinds of questions than others. The temperature comparison lives on the comparative side and is well-supported. The fully absolute interpretation is something a later series will return to in its own right. For now it is enough to keep the reader-facing claim in the comparative register: the same measurement device, applied to the same task, produced lower estimated sensitivity at higher temperatures.

## Why the result was promising but limited

The study was promising because the full workflow ran end-to-end on real choice data: a stated reference standard, a graded sensitivity parameter, posterior uncertainty, and a chain of adequacy checks behind every estimate. The output was not a naked score attached to GPT-4o; it was an inference supported by modeling choices that had been inspected.

The limits are easy to state. One LLM, one task domain, one embedding model, one way of representing alternatives. Each temperature condition fit independently. No separation between temperature effects on assessment text and temperature effects on final choice. No basis for assuming that provider temperature parameters mean the same thing across models. And no way of knowing, from this study alone, whether the observed pattern would travel.

That last point is what makes the result valuable as a pilot. It is not valuable because the temperature hypothesis is especially profound. It is valuable because it shows how the method behaves when applied to real LLM data, and it produces a finding that can be tested in another setting.

The next question is what happened when that test was run.

## Sources

This post draws on [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html), with background from the foundational reports discussed in the previous series.

