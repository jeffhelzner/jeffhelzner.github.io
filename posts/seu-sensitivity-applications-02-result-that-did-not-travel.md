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
          "dateModified": "2026-05-14",
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

The initial GPT-4o study found a clear broad relationship: higher sampling temperature was associated with lower estimated sensitivity to subjective expected utility differences. That was encouraging because it showed the SEU Sensitivity framework doing useful empirical work on real LLM choices. But a single pilot does not settle the more important question.

Does the pattern travel?

This matters because temperature was always a probe of the measurement device, not a deep substantive commitment. It is plausible that increasing token-sampling temperature could make choices noisier. It is also plausible that the effect could depend on the model provider, its post-training, the prompt, the domain, the temperature range, the feature construction, or the stage of the decision process most affected by sampling randomness.

The second pilot held the task fixed and changed the LLM.

## Holding the task constant

The follow-up study used Claude on the same insurance claims triage task. As before, the model was asked to choose which claim to prioritize from a small set of alternatives. As before, there were 100 base problems presented three times with positions shuffled, yielding about 300 observations per temperature condition. As before, the analysis used the `m_01` SEU Sensitivity model for a three-consequence insurance task.

This design is useful because it isolates one source of variation better than a study that changes both the task and the model at once. The comparison is not perfect, but it is much cleaner than simply asking whether an effect appears somewhere else. GPT-4o and Claude were applied to the same broad decision domain with the same modeling framework.

The temperature grid differed because provider APIs differ. The Claude study used temperatures 0.0, 0.2, 0.5, 0.8, and 1.0. The GPT-4o study had used 0.0, 0.3, 0.7, 1.0, and 1.5. That complicates quantitative slope comparisons. A temperature of 0.5 from one provider is not guaranteed to correspond to the same effective entropy as a temperature of 0.5 from another provider. The narrower Anthropic range also reduces power to detect large temperature effects.

Still, the qualitative question remains meaningful. If temperature is a general dial for reducing SEU sensitivity in this kind of LLM choice task, we would expect at least some downward trend for Claude.

That is not what the study found.

## The pattern changed

The Claude estimates did not show a clear negative relationship between temperature and `alpha`.

The posterior median sensitivity estimates were high at temperature 0.0, lower at 0.2, higher again at 0.5 and 0.8, and lower again at 1.0. The posterior distributions overlapped heavily, and there was no clear ordering by temperature.

![Claude insurance study summary: alpha versus temperature and pairwise posterior probabilities across temperature conditions.](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study_files/figure-html/fig-summary-output-1.svg){#fig-claude-insurance-summary fig-alt="Summary visualization from the Claude insurance study. The left panel shows alpha estimates by temperature with a flat, non-monotonic pattern. The right panel shows pairwise posterior probabilities across temperature conditions."}

The global slope summary captured this difference. In the GPT-4o study, the slope of `alpha` against temperature was clearly negative, with a posterior probability above 0.99 that the slope was below zero. In the Claude insurance study, the slope was close to zero: the median was about -3.6, with a wide interval spanning both negative and positive values, and the posterior probability of a negative slope was only about 0.56.

Strict monotonicity was also essentially absent. The probability that `alpha` decreased across all five Claude temperature levels was below 0.01.

It is tempting to read the up-and-down sequence as a genuine oscillatory response to temperature. The updated analysis pushes back on that reading. No individual pairwise comparison reaches a conventionally notable level, and the overall posterior is consistent with noise around a roughly flat function. The honest summary is not that Claude has a complex temperature-response curve; it is that the data do not support the negative temperature-sensitivity relationship seen with GPT-4o.

The conclusion is not that Claude made bad decisions. It is not that the model failed the task. It is not even that temperature had no effect on anything Claude did. The conclusion is narrower and more useful: the temperature-sensitivity relationship observed with GPT-4o on this insurance task did not replicate with Claude on the same task.

## The model still fit the data

One tempting explanation for a non-replication is that the model simply failed in the new setting. If the SEU Sensitivity model fit GPT-4o but not Claude, then the comparison would be harder to interpret. The missing temperature effect might just be an artifact of model inadequacy.

The adequacy checks did not point in that direction.

The Claude study included study-specific parameter recovery. The primary sensitivity parameter `alpha` was recoverable under the Claude insurance design. The absolute recovery metrics differ from those reported for the GPT-4o study, but that difference reflects the random seeds of two synthetic recoveries drawn from the same prior -- not anything LLM-specific. Anchoring the comparison on the relative metrics (relative bias, relative RMSE, coverage) is what makes the two recoveries comparable, and `alpha` recovery is fit for purpose for this study on those terms. As in the earlier work, the decomposition into feature effects and utility increments remained less directly identified, but the primary sensitivity question was supported by the recovery analysis.

Simulation-based calibration was not rerun for the Claude cell. It was inherited from the initial GPT-4o study, which used the same model and prior. That is the kind of inheritance simulation-based calibration permits: the procedure validates the sampler under the prior and likelihood, both of which are identical here. The study-specific recovery analysis fills the role of design-specific validation under Claude's actual data characteristics.

The posterior predictive checks also looked adequate. The model could reproduce the observed choice data across the Claude temperature conditions using the same general summaries: log-likelihood, modal choice frequency, and mean predicted probability. The posterior predictive p-values were comfortably away from extreme values.

This is a subtle but important result. The absence of a GPT-4o-like temperature trend is not obviously due to the model being unable to describe Claude's choices. The model appears adequate enough to estimate sensitivity, and the estimated sensitivities simply do not organize themselves by temperature in the same way.

For a measurement framework, that is exactly the kind of distinction we need. A framework that only produces positive-looking demonstrations is not very useful. A framework that can say "the model fits, but this hypothesized relationship is not supported here" is more valuable.

## Why the result might differ by LLM

The current studies cannot decide among candidate explanations, but they help state the possibilities more precisely.

First, the temperature parameter may not be equivalent across providers. The APIs expose a parameter with the same name, but the underlying models, decoding implementations, and post-training regimes differ. The same nominal temperature need not imply the same change in effective sampling entropy. Second, the models may differ in which decision stage temperature most affects. The LLM produces claim assessments, those assessments become embedded features, and the LLM later makes choices; temperature could move assessment wording more than final selection in one model and the reverse in another. Third, Claude's post-training may regularize task behavior so that surface expression varies under temperature without the selected claim varying much. Fourth, the observed up-and-down pattern may simply be posterior noise around a roughly flat relationship rather than a substantive oscillation.

These explanations are not mutually exclusive, and the present design cannot separate them. They are listed here to make the inference problem visible, not to settle it.

## Why this is not an embarrassment

It is tempting to narrate the follow-up as a failed replication. That phrase is not wrong, but it can be misleading if it suggests the project failed. The better framing is that the initial result did not travel -- and that is methodologically informative. The first pilot showed that the framework could detect a structured relationship between temperature and estimated sensitivity for GPT-4o on this task. The second pilot showed that the relationship was not automatic on the same task with a different LLM.

This is exactly the kind of thing an evaluation framework should be able to surface. If a practitioner were tuning temperature for AI-assisted decisions, it would be risky to assume that a setting that improves one model's choice consistency will have the same effect on another. The Claude result pushes against that assumption. It also reinforces the role of uncertainty and diagnostics in interpretation: a single score or a tidy graph from the first study would have been easier to overgeneralize than a posterior with adequacy checks attached.

## What the comparison teaches

The contrast between the two pilots teaches three modest lessons.

First, application matters. The foundations series established what the sensitivity parameter means and how to check whether estimates are meaningful. Real LLM behavior can still surprise us, and a method becomes useful when it can survive contact with those surprises.

Second, on this task, the temperature-sensitivity relationship looks at least partly model-specific. The same task and same modeling framework produced different temperature patterns across GPT-4o and Claude. A single comparison cell cannot establish that LLM identity is the dominant factor in general; it does establish that LLM temperature should not be treated as a provider-independent control knob for decision quality.

Third, non-replication is evidence. It narrows the scope of the original claim. It identifies a factor that may be responsible for heterogeneity. And it motivates designs that vary model, task, and prompt factors more systematically, alongside better separation between assessment-stage and choice-stage effects.

The contrast also clarifies the role of the original temperature hypothesis. It was useful because it generated a real empirical test of the SEU Sensitivity framework. But the larger project is not about proving that higher temperature always reduces sensitivity. It is about developing a disciplined way to measure how AI decision behavior relates to a stated decision standard under uncertainty.

That is why the next post steps back from the particular temperature result and asks what these pilots show about evaluation itself.

## Sources

This post draws on [Temperature and SEU Sensitivity: Claude x Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html) and compares it with [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html).

