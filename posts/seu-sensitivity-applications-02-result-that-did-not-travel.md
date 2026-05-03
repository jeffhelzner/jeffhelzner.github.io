---
title: "A Temperature Result That Did Not Travel"
date: 2026-08-23
author: "Jeff Helzner"
slug: "seu-sensitivity-applications-part-2-result-that-did-not-travel"
description: "What happened when the initial GPT-4o temperature finding was tested with Claude on the same insurance triage task."
summary: "The initial GPT-4o study suggested that higher temperature reduced SEU sensitivity. When the same insurance task was run with Claude, that pattern did not replicate."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","replication","series:seu-sensitivity-applications"]
series: "Applying SEU Sensitivity to LLM Decisions"
part: 2
draft: true
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-applications-02-result-that-did-not-travel.html">
        <meta name="robots" content="noindex, nofollow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "A Temperature Result That Did Not Travel",
          "description": "What happened when the initial GPT-4o temperature finding was tested with Claude on the same insurance triage task.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-08-23",
          "dateModified": "2026-05-03",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-applications-02-result-that-did-not-travel.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Claude", "LLM replication", "temperature", "AI decision evaluation"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to LLM Decisions** · Part 2 of 3  
[Part 1](seu-sensitivity-applications-01-temperature-as-methodological-probe.html) · Part 2 · [Part 3](seu-sensitivity-applications-03-from-demo-to-robust-evaluation.html)
:::

The initial GPT-4o temperature study found a clear broad relationship: higher sampling temperature was associated with lower estimated sensitivity to subjective expected utility differences. That result was encouraging because it showed the SEU Sensitivity framework doing useful empirical work on real LLM choices.

But an initial application is not the end of the story. It is the beginning of a more important question.

Does the pattern travel?

That question matters because the temperature hypothesis was always a useful probe more than a deep substantive commitment. It is plausible that increasing token-sampling temperature could make choices noisier. It is also plausible that the effect could depend on the model provider, the post-training process, the prompt, the domain, the temperature range, the feature construction, or the stage of the decision process most affected by sampling randomness.

So the second application is more interesting than a simple pass-fail replication story. It asks whether a pattern observed in one LLM setting persists when a key component of the setting changes.

In this case, the task was held fixed and the LLM changed.

## Holding the task constant

The follow-up study used Claude on the same insurance claims triage task. As before, the model was asked to choose which claim to prioritize from a small set of alternatives. As before, there were 100 base problems presented three times with positions shuffled, yielding about 300 observations per temperature condition. As before, the analysis used the `m_01` SEU Sensitivity model for a three-consequence insurance task.

This design is useful because it isolates one source of variation better than a study that changes both the task and the model at once. The comparison is not perfect, but it is much cleaner than simply asking whether an effect appears somewhere else. GPT-4o and Claude were applied to the same broad decision domain with the same modeling framework.

The temperature grid differed because provider APIs differ. The Claude study used temperatures 0.0, 0.2, 0.5, 0.8, and 1.0. The GPT-4o study had used 0.0, 0.3, 0.7, 1.0, and 1.5. That complicates quantitative slope comparisons. A temperature of 0.5 from one provider is not guaranteed to correspond to the same effective entropy as a temperature of 0.5 from another provider. The narrower Anthropic range also reduces power to detect large temperature effects.

Still, the qualitative question remains meaningful. If temperature is a general dial for reducing SEU sensitivity in this kind of LLM choice task, we would expect at least some downward trend for Claude.

That is not what the study found.

## The pattern changed

The Claude estimates did not show a clear negative relationship between temperature and `alpha`.

The posterior median sensitivity estimates were high at temperature 0.0, lower at 0.2, higher again at 0.5 and 0.8, and lower again at 1.0. In other words, the pattern oscillated rather than declining. The posterior distributions overlapped heavily, and there was no clear ordering by temperature.

![Claude insurance study summary: alpha versus temperature and pairwise posterior probabilities across temperature conditions.](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study_files/figure-html/fig-summary-output-1.svg){#fig-claude-insurance-summary fig-alt="Summary visualization from the Claude insurance study. The left panel shows alpha estimates by temperature with a flat, non-monotonic pattern. The right panel shows pairwise posterior probabilities across temperature conditions."}

The global slope summary captured this difference. In the GPT-4o study, the slope of `alpha` against temperature was clearly negative, with a posterior probability above 0.99 that the slope was below zero. In the Claude insurance study, the slope was close to zero: the median was about -3.6, with a wide interval spanning both negative and positive values, and the posterior probability of a negative slope was only about 0.56.

Strict monotonicity was also essentially absent. The probability that `alpha` decreased across all five Claude temperature levels was below 0.01.

The conclusion is not that Claude made bad decisions. It is not that the model failed the task. It is not even that temperature had no effect whatsoever on anything Claude did. The conclusion is narrower and more useful: the temperature-sensitivity relationship observed with GPT-4o on the insurance task did not replicate with Claude on the same task.

That distinction matters. The framework is measuring a specific relationship between observed choices and a fitted expected-utility structure. The follow-up study says that this relationship did not vary with temperature for Claude in the same way it varied for GPT-4o.

## The model still fit the data

One tempting explanation for a non-replication is that the model simply failed in the new setting. If the SEU Sensitivity model fit GPT-4o but not Claude, then the comparison would be harder to interpret. The missing temperature effect might just be an artifact of model inadequacy.

The adequacy checks did not point in that direction.

The Claude study included study-specific parameter recovery. The primary sensitivity parameter `alpha` was recoverable under the Claude insurance design. As in the earlier work, the decomposition into feature effects and utility increments remained less directly identified, but the main sensitivity question was supported by the recovery analysis.

The posterior predictive checks also looked adequate. The model could reproduce the observed choice data across the Claude temperature conditions using the same general summaries: log-likelihood, modal choice frequency, and mean predicted probability. The posterior predictive p-values were comfortably away from extreme values.

This is a subtle but important result. The absence of a GPT-4o-like temperature trend is not obviously due to the model being unable to describe Claude's choices. The model appears adequate enough to estimate sensitivity, and the estimated sensitivities simply do not organize themselves by temperature in the same way.

For a measurement framework, that is exactly the kind of distinction we need. A framework that only produces positive-looking demonstrations is not very useful. A framework that can say "the model fits, but this hypothesized relationship is not supported here" is more valuable.

## Why the result might differ by LLM

There are several possible explanations for the difference between GPT-4o and Claude. The current studies cannot decide among them, but they help state the possibilities more precisely.

One possibility is that the temperature parameter is not equivalent across providers. The APIs expose a parameter with the same name, but the underlying models, decoding implementations, and post-training regimes differ. The same nominal temperature may not imply the same change in effective sampling entropy.

Another possibility is that the models differ in how temperature affects the stages of the task. In these studies, the LLM first produces claim assessments, those assessments become embedded features, and the LLM later makes choices. Temperature might affect assessment language more than final choices, or final choices more than assessment language. It might diversify wording without changing the selected alternative. These pathways could differ between GPT-4o and Claude.

A third possibility is that Claude's post-training makes its decision behavior more stable under temperature variation in this task. If alignment training or response policies regularize the model toward consistent task behavior, then increasing temperature may alter surface expression without substantially altering which claim is selected.

A fourth possibility is that the observed oscillation is mostly posterior noise around a flat relationship. The Claude estimates move up and down, but many pairwise comparisons are not decisive. The safest interpretation is not that Claude has a mysterious oscillatory temperature function. It is that the study provides little evidence for a systematic negative temperature-sensitivity relationship.

These explanations are not mutually exclusive. More importantly, they illustrate why empirical application is needed. It is easy to tell a plausible story about temperature before seeing data. The data force that story to become more modest.

## Why this is not an embarrassment

It is tempting to narrate the follow-up as a failed replication. That phrase is not wrong, but it can be misleading if it suggests that the project failed.

The better framing is that the initial result did not travel.

That is methodologically informative. The first study showed that the framework could detect a structured relationship between temperature and estimated sensitivity for GPT-4o in an insurance task. The second study showed that the relationship was not a universal feature of the task, the model class, or the temperature parameter. Holding the task fixed and changing the LLM changed the result.

This is exactly the kind of thing an evaluation framework should reveal. If an organization were tuning temperature for AI-assisted decisions, it would be risky to assume that a setting that improves one model's choice consistency will have the same effect on another model. The Claude result pushes against that assumption.

The non-replication also reinforces the importance of uncertainty and diagnostics. If the first study had produced only a single score or a simple graph, it would be easier to overgeneralize. Because the framework produces posterior uncertainty and adequacy checks, the second study can be interpreted as evidence about where the earlier pattern does and does not hold.

## What the comparison teaches

The contrast between the two studies teaches three lessons.

First, application matters. The foundations series established what the sensitivity parameter means and how to check whether estimates are meaningful. But real LLM behavior can still surprise us. A method becomes useful when it can survive contact with those surprises.

Second, model identity matters. The same task and same modeling framework produced different temperature patterns across GPT-4o and Claude. That suggests we should not treat LLM temperature as a provider-independent control knob for decision quality.

Third, non-replication is evidence. It narrows the scope of the original claim. It identifies a factor that may be responsible for heterogeneity. It motivates more careful factorial designs, additional tasks, and better separation between assessment-stage and choice-stage effects.

The result also clarifies the role of the initial temperature hypothesis. The hypothesis was useful because it generated a real empirical test of the SEU Sensitivity framework. But the larger project is not about proving that higher temperature always reduces sensitivity. The larger project is about developing a disciplined way to measure how AI decision behavior relates to a stated decision standard under uncertainty.

That is why the next post steps back from the particular temperature result and asks what these applications show about evaluation itself.

## Sources

This post draws on [Temperature and SEU Sensitivity: Claude x Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html) and compares it with [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html).