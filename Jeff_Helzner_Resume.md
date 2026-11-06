<style>
body {
    font-family: 'Georgia', 'Times New Roman', serif;
    line-height: 1.6;
    color: #2c3e50;
    max-width: 8.5in;
    margin: 0 auto;
    padding: 0.5in;
    background-color: #ffffff;
}

h1 {
    color: #1a365d;
    border-bottom: 3px solid #3182ce;
    padding-bottom: 10px;
    margin-bottom: 5px;
    font-size: 2.2em;
    font-weight: 600;
}

h2 {
    color: #2d3748;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 5px;
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 1.4em;
}

h3 {
    color: #1a365d;
    margin-bottom: 5px;
    font-size: 1.1em;
    font-weight: 600;
}

.contact-info {
    text-align: center;
    margin-bottom: 20px;
    color: #4a5568;
    font-size: 1.1em;
}

.contact-info a {
    color: #3182ce;
    text-decoration: none;
}

.contact-info a:hover {
    text-decoration: underline;
}

.job-header {
    background-color: #f7fafc;
    padding: 10px 15px;
    border-left: 4px solid #3182ce;
    margin: 15px 0 10px 0;
    border-radius: 0 5px 5px 0;
}

.company {
    font-weight: 600;
    color: #1a365d;
}

.date {
    color: #718096;
    font-style: italic;
    float: right;
}

.job-description {
    margin: 10px 0 20px 20px;
}

ul {
    margin: 10px 0;
    padding-left: 25px;
}

li {
    margin-bottom: 8px;
    color: #4a5568;
}

.education-item {
    margin-bottom: 8px;
    color: #4a5568;
}

.skills-section {
    background-color: #f7fafc;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #38a169;
}

.quote {
    font-style: italic;
    text-align: center;
    color: #2d3748;
    background-color: #edf2f7;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
    border-left: 4px solid #3182ce;
}

strong {
    color: #1a365d;
}

hr {
    border: none;
    height: 2px;
    background: linear-gradient(to right, #3182ce, #e2e8f0, #3182ce);
    margin: 20px 0;
}

@media print {
    /* Ensure Chrome doesn't add extra page margins; body padding controls layout */
    @page { size: letter; margin: 0; }

    body {
        font-size: 11pt;
        line-height: 1.4;
        margin: 0;
        padding: 0.5in; /* keep your current visual margins */
    }

    /* Prevent headings from dangling at the bottom of a page */
    h1, h2, h3 {
        page-break-after: avoid;
        break-after: avoid-page;
        break-inside: avoid;
    }

    /* Keep job sections, skills, quote, and education items together */
    .job-header,
    .job-description,
    .skills-section,
    .quote,
    .education-item,
    .contact-info {
        page-break-inside: avoid;
        break-inside: avoid;
    }

    /* Keep header with its following description */
    .job-header + .job-description {
        page-break-inside: avoid;
        break-inside: avoid;
    }

    /* Avoid breaking around horizontal rules */
    hr {
        page-break-after: avoid;
        break-after: avoid-page;
    }
}
</style>

# Jeff Helzner
<div class="contact-info">
<strong>Brooklyn, NY</strong> · <a href="mailto:jeffhelzner@gmail.com">jeffhelzner@gmail.com</a> · <a href="https://jeffhelzner.github.io">jeffhelzner.github.io</a> · <a href="https://www.linkedin.com/in/jeff-helzner-109a5498">LinkedIn</a> · <a href="https://github.com/jeffhelzner">GitHub</a>
</div>

---

## Summary
Hands-on decision scientist who builds AI, Bayesian, and machine learning systems that make expert judgment better in high-stakes decisions with incomplete data. Over twelve years in insurance I have designed and shipped production models, data pipelines, monitoring, and LLM tools for underwriting and claims, building the capability from scratch at four organizations. I worked closely with Daniel Kahneman on reducing noise in expert judgment, and before industry I was a professor at Columbia University teaching and researching decision theory, probability, and logic (Ph.D., Carnegie Mellon). A long-standing focus of my work, from graduate school to the present, is how to measure whether decision makers, human or AI, are actually deciding well.

I work end to end, from data ingestion and modeling to the tools and dashboards experts actually use, with a focus on principled uncertainty quantification and on systems that combine model output with human expertise. Fully remote since 2020.

---

## Experience

<div class="job-header">
<h3>Director of Data Strategy and Analytics</h3>
<span class="company">Berkley Enterprise Risk Solutions (a W. R. Berkley company)</span> <span class="date">March 2024 – Present</span>
</div>

<div class="job-description">
Hands-on lead for the data systems, probabilistic models, and AI tools behind underwriting and claims decisions at a California-based startup writing large workers' compensation policies.

- Designed and deployed Bayesian models that combine class-rate priors with submission-level loss and payroll data to produce principled loss picks; five Bayesian/ML models deployed to production in total.
- Built an LLM-powered application that drafts claim status updates for adjusters; adopted broadly across the claims team, with a marked reduction in preparation time.
- Built automated monitoring (roughly ten weekly checks across the book of business) that flags anomalous shifts in claim-type frequency or severity for proactive portfolio management.
- Built pipelines for ingestion and transformation of underwriting and exposure data supporting submission intake and ongoing claims monitoring.
- Built ML pipelines to standardize and impute missing fields in OCR-extracted loss records.
- Automated generation of monthly client-facing service booklets, substantially reducing preparation time.
- Defined decision-aligned metrics and dashboards with leadership for underwriting and portfolio reviews.
</div>

---

<div class="job-header">
<h3>Decision Scientist</h3>
<span class="company">Joyn Insurance</span> <span class="date">October 2020 – January 2024</span>
</div>

<div class="job-description">
At an early-stage insurtech, helped build a data-driven underwriting platform from the ground up, integrating model output with underwriter judgment.

- Built ML and Bayesian models to prioritize incoming submissions.
- Designed and maintained a software package for managing third-party data used in underwriting decisions.
- Built tools and dashboards that surfaced model outputs to underwriters in intuitive, actionable formats.
- Partnered with product and engineering to ensure data integrity and model interpretability.
- Platform adopted by the underwriting team as its primary submission-triage tool through production rollout.
</div>

---

<div class="job-header">
<h3>Decision Scientist, Blackboard Insurance</h3>
<span class="company">AIG</span> <span class="date">December 2018 – August 2020</span>
</div>
<div class="job-description">
Built methods for extracting behavioral insight from operational data at AIG's insurtech subsidiary.

- Built behavioral analytics models of underwriter and broker behavior.
- Contributed to R&D projects using NLP and OCR to extract structured data from unstructured documents.
- Partnered with data engineering on pipelines supporting analytics requirements.
- Managed an MS-level data scientist supporting analytics and productionization.
</div>

---

<div class="job-header">
<h3>Head of Behavioral Science Team</h3>
<span class="company">AIG</span> <span class="date">May 2014 – September 2018</span>
</div>

<div class="job-description">
Founded and led one of the insurance industry's first behavioral science teams (5 people, including one PhD and two MS-level statisticians), focused on improving the quality of expert judgment in underwriting and claims.

- Worked closely with Daniel Kahneman on the design of noise-reduction studies for expert judgment in claims and underwriting.
- Ran experimental studies that demonstrated reduced variance in adjuster case-reserve estimates.
- Drove process improvements to reduce noise in human judgment and improve underwriting consistency.
- Led projects on behavioral analytics and choice architecture with actuarial, claims, underwriting, and shared services.
- Presented findings to the CEO and Chief Underwriting Officer; represented the science team at multiple board meetings.
</div>

---

<div class="job-header">
<h3>Associate Professor of Philosophy</h3>
<span class="company">Columbia University</span> <span class="date">July 2011 – June 2014</span>
</div>

<div class="job-header">
<h3>Assistant Professor of Philosophy</h3>
<span class="company">Columbia University</span> <span class="date">August 2003 – June 2011</span>
</div>

<div class="job-description">
Taught undergraduate and graduate courses on logic, probability, decision theory, and the philosophy of science. Published on decision-making under uncertainty and mathematical logic in <em>Theory and Decision</em>, <em>Synthese</em>, the <em>Journal of Behavioral Decision Making</em>, and the <em>Archive for Mathematical Logic</em>. Mentored students who have gone on to careers in data science, economics, software engineering, and academia.
</div>

---

## Advisory

- <strong>Decision Science Advisor, Rational AI.</strong> An AI-native firm helping private equity investors with deal sourcing, valuation, and portfolio value creation.
- <strong>Member, BeSci.io Collective.</strong> A collective of senior applied behavioral scientists that helps organizations adopt and scale behavioral science methods.

---

## Research and Open Source

- <strong>Sensitivity to Subjective Expected Utility Maximization: A Methodological Study, with an Illustrative Application to LLM Decision-Making</strong> (arXiv:2607.11920, 2026). A Bayesian framework for measuring how closely a decision maker's choices, human or AI, track expected utility, with adequacy checks for when the measure can be trusted. Open-source Stan/Python workflow: <a href="https://github.com/jeffhelzner/seu-sensitivity">github.com/jeffhelzner/seu-sensitivity</a>.
- Interviewed on the <em>An N of 1</em> applied behavioral science podcast (Episode 48, 2026).

---

## Education

<div class="education-item"><strong>Ph.D., Logic, Computation, and Methodology</strong> · Carnegie Mellon University</div>
<div class="education-item"><strong>M.S., Logic and Computation</strong> · Carnegie Mellon University</div>  
<div class="education-item"><strong>M.A., Mathematics</strong> · University at Buffalo</div>
<div class="education-item"><strong>B.A., Mathematics</strong> · University of Massachusetts</div>

---

<div class="skills-section">

## Skills

- **Modeling:** Bayesian inference (Stan, PyMC), machine learning (scikit-learn), uncertainty quantification, experimental design
- **Applied AI:** LLM application development, prompt engineering, AI-assisted development (GitHub Copilot)
- **Data & tooling:** Python, SQL, R, data pipelines, Git, Power BI
- **Domain:** Insurance underwriting and claims (workers' compensation, commercial lines), judgment and decision-making, noise reduction in expert judgment
- **Interests:** Jazz, ice hockey, football
</div>
