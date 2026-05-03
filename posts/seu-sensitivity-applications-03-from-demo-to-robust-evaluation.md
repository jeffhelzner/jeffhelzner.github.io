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
          "dateModified": "2026-05-03",
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

The first application of the SEU Sensitivity framework found a clean broad pattern: for GPT-4o on an insurance claims triage task, higher sampling temperature was associated with lower estimated sensitivity to subjective expected utility differences. The follow-up Claude insurance study did not reproduce that relationship. Holding the task fixed and changing the model changed the result.

That sequence is useful precisely because it is not a simple victory lap.

If the goal were only to find a neat empirical claim about temperature, the second study would be disappointing. But the larger goal is to develop a methodology for evaluating AI decision-making under uncertainty. From that perspective, the contrast between the studies is one of the most informative things that could have happened.

It shows why an evaluation framework needs uncertainty, diagnostics, adequacy checks, and repeated application across contexts. A first result can suggest a pattern. A second result can test whether that pattern travels. When it does not, the framework gives us language for saying what changed and what kind of claim remains supported.

![Cross-study comparison of GPT-4o and Claude on the insurance task, showing a clear temperature trend for GPT-4o and no systematic trend for Claude.](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study_files/figure-html/fig-cross-study-output-1.svg){#fig-cross-study-comparison fig-alt="Cross-study comparison isolating the LLM effect. GPT-4o on the insurance task shows a clear decline in alpha as temperature increases, while Claude on the same task shows a flat, non-monotonic pattern."}

## The point was never just temperature

Temperature was a convenient early intervention. It is exposed by LLM APIs, it plausibly affects output stochasticity, and it gives a natural hypothesis: if choices become noisier as temperature rises, estimated sensitivity to expected utility should fall.

But that hypothesis is somewhat contrived. It is not the deepest question about AI decision quality. It does not by itself tell us whether a system should be deployed, whether its reasoning is normatively adequate, whether it respects legal or ethical constraints, or whether it handles real operational uncertainty well.

The deeper value of the temperature studies is methodological. They ask whether the SEU Sensitivity framework can be applied to real LLM choice data, whether it can detect structured differences when they are present, whether it can report uncertainty around those differences, and whether it can decline to support a relationship when the data do not contain one.

On that score, the studies are more interesting than the temperature hypothesis itself.

They show the transition from foundations to application. The framework did not remain a formal model validated only in simulation. It was used on real choices produced by actual LLMs in a task with alternatives, consequences, feature representations, posterior inference, and model checks.

## What the first result established

The GPT-4o study established that the framework could produce an interpretable empirical result in a realistic workflow.

The task was not a toy gamble with two labeled buttons. It involved insurance claim descriptions, LLM-generated assessments, embedded feature representations, repeated choice problems, and position counterbalancing. The model then estimated how strongly choices tracked the fitted expected-utility structure at each temperature.

The result had the expected broad direction. Estimated `alpha` was higher at low temperature and lower at high temperature. Posterior uncertainty supported a negative overall slope. Posterior predictive checks did not indicate systematic misfit.

That is a meaningful demonstration. It shows that the framework can summarize a real decision process in a way that connects back to the theoretical interpretation of `alpha`: higher sensitivity means choices are more concentrated on alternatives favored by the expected-utility representation.

But the result also had built-in limits. The strict monotonic pattern across every adjacent temperature level was weak. The intermediate temperatures overlapped. The study used one model, one task, one feature construction, and independent fits by temperature. It could not separate all the pathways by which temperature might affect assessments and choices.

So the first result established a local empirical pattern. It did not establish a general law.

## What the second result established

The Claude insurance study established that the pattern was not automatic.

This is more than a negative result. Because the task was held constant, the comparison helps localize the source of heterogeneity. The same insurance triage setting that produced a clear GPT-4o trend did not produce the same trend for Claude. That suggests the relationship between temperature and sensitivity is at least partly model-specific.

The result also showed that model adequacy and substantive conclusions can come apart. The Claude fits passed the relevant posterior predictive checks, and parameter recovery supported the primary sensitivity estimation task. The framework did not fail to describe the choice data. Rather, the estimated sensitivities did not align with the temperature hypothesis.

That distinction is central to serious evaluation. Sometimes a model fails because it is inadequate. Sometimes it fits well enough, but the hypothesized effect is not present. Those are different conclusions, and a useful methodology should help separate them.

The Claude result also warns against treating public API controls as simple, portable behavioral instruments. Temperature may not mean the same thing across providers. It may change surface text more than final choices. It may interact with model architecture, post-training, refusal behavior, or task framing. The same knob can have different behavioral consequences in different systems.

For applied decision support, that warning matters. A practitioner who finds that one model becomes more decision-consistent at lower temperature should not assume the same intervention will work for another model.

## Why uncertainty is not optional

Both studies depended on posterior uncertainty.

Without uncertainty, the comparison would collapse into a list of point estimates. Point estimates invite overstatement. They make small differences look decisive and wide intervals look cleaner than they are. They also make it harder to distinguish a broad trend from a strict ordering of every condition.

In the GPT-4o study, uncertainty allowed two claims to be separated. There was strong evidence for a negative overall slope, but much weaker evidence for strict monotonicity across all temperature levels. That is a more honest result than simply saying that `alpha` went down as temperature went up.

In the Claude study, uncertainty prevented the oscillating pattern from being overinterpreted. The estimates moved up and down, but the posterior comparisons did not support a strong systematic ordering. The appropriate conclusion was not that Claude has a complex temperature response curve. It was that the data did not support the monotonic temperature-sensitivity relationship seen with GPT-4o.

This is one reason Bayesian estimation is well suited to the project. The question is not merely which condition has the largest fitted value. The question is what remains plausible after observing finite, noisy choices.

## Why diagnostics are part of the claim

The foundations series argued that a sensitivity estimate is meaningful only when the model is adequate for the task. The application studies put that principle into practice.

Prior predictive checks asked whether the model and priors implied plausible behavior before observing the data. Parameter recovery asked whether the model could recover known sensitivity values under the study design. Simulation-based calibration checked whether the posterior computation represented uncertainty appropriately for the relevant model variant. Posterior predictive checks asked whether fitted models could reproduce important summaries of the observed choices.

These checks do not prove that the model is true. No statistical model gets that privilege. But they change the status of the estimate. They make it less like a score assigned by fiat and more like an inference whose assumptions have been inspected.

That matters especially for AI evaluation. AI systems can produce plausible explanations, fluent outputs, and superficially stable behavior while still being unstable in parts of the decision problem that matter. Conversely, they may show variation that looks concerning but is not clearly tied to the evaluative standard. Diagnostics help determine whether a fitted sensitivity estimate should be treated as evidence or as a prompt for model revision.

## What a stronger next experiment should do

The temperature studies are early applications. They suggest several design lessons for the more substantial experiments that should follow.

First, future studies should choose the substantive decision question first and the manipulation second. Temperature was useful because it created a manageable methodological probe. A stronger experiment should begin from a more meaningful decision context: a domain where probabilities, utilities, constraints, and consequences matter independently of the LLM sampling parameter.

Second, the design should separate stages of the decision process where possible. If an LLM both generates assessments and makes choices, then a manipulation can affect the feature representation and the final selection at once. Future designs might hold assessments fixed while varying choice prompts, or hold feature representations fixed while comparing decision policies. That would make it easier to identify what part of the process changes.

Third, comparisons should be built into the design rather than added afterward. The Claude insurance study was valuable, but the larger lesson is that model, task, prompt, and temperature factors should be varied systematically when possible. A factorial design can test whether an effect belongs to the model, the task, the interaction between them, or the measurement setup.

Fourth, adequacy checks should remain part of the published result. It is tempting to push diagnostics into appendices or technical reports, but they are what make the public conclusion responsible. If the framework is being used to support claims about AI-assisted decisions, readers need to know not only what estimate was obtained but why the estimate is interpretable.

## What these studies say about the framework

The early applications do not show that SEU Sensitivity is the final answer to AI decision evaluation. They show something more modest and more useful.

They show that the framework can turn repeated choices into uncertain estimates of sensitivity to a stated decision standard. They show that the estimates can detect structured variation in at least one real LLM setting. They show that a result can fail to generalize when the LLM changes. They show that posterior predictive checks and recovery analyses can help separate model misfit from absence of the hypothesized relationship.

That is a good outcome for an early methodology.

The point of the framework is not to guarantee that every first pattern will replicate. The point is to make replication, comparison, and failure to generalize measurable. If a sensitivity pattern appears for one model and not another, the framework gives us a disciplined way to state that difference. If a model fits poorly, the framework tells us not to overinterpret the estimate. If uncertainty is wide, the framework tells us what the data do not settle.

This is the kind of structure AI decision evaluation needs. The alternative is too often a single benchmark score, a handful of examples, or a qualitative impression of model behavior. Those can be useful, but they do not answer the procedural question: how strongly are choices connected to a stated account of good decision-making under uncertainty?

## The practical lesson

The practical lesson from the two application studies is not "always lower the temperature." It is not "GPT-4o is more sensitive than Claude" in some global sense. It is not "SEU is the only standard that matters."

The practical lesson is that AI decision behavior has to be measured in context.

The relevant context includes the model, the task, the prompt, the feature representation, the choice set, the consequence structure, the prior assumptions, and the adequacy checks. A result that holds in one context may not travel to another. That is not a failure of evaluation. That is why evaluation is needed.

The temperature studies are therefore best read as a bridge. They connect the foundational SEU Sensitivity framework to real LLM data. They show how a promising pattern can be found, tested, and narrowed. And they motivate the next stage: experiments where the substantive decision problem is richer and the methodology is used not merely to test a convenient hypothesis, but to evaluate decision behavior in domains where the tradeoffs themselves matter.

That is where the framework should become most useful.

## Sources

This post draws on [Temperature and SEU Sensitivity: Initial Results](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html) and [Temperature and SEU Sensitivity: Claude x Insurance Study](https://jeffhelzner.github.io/seu-sensitivity/applications/claude_insurance_study/01_claude_insurance_study.html), with background from the SEU Sensitivity foundations series.