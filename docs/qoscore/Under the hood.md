# Under the Hood

# — How QoScore Actually Works

## Part1: The Foundation: How Does QoScore Generate Reliable FAQs?

The entire QoScore evaluation system rests on one foundational question: **how do we generate test cases (FAQs) that can be trusted as a reliable baseline?**

The answer lies in two core principles, each applied to different Agent architectures.

### Principle 1: Simpler structure yields more deterministic output.

This principle applies to **RAG Agents and Workflow Agents**.

Consider what happens in a typical production RAG environment: multiple documents, multiple query types, a retrieval pipeline, and an LLM. Each additional layer introduces variance and potential failure points. The system is complex, and its outputs are inherently non-deterministic.

QoScore's FAQ generation deliberately inverts this complexity. Instead of replicating the production environment, it strips it down to the simplest possible structure: **a single document + targeted, metric-mapped questions + an LLM**. This near-zero-complexity setup yields FAQs with near-perfect determinism. The outputs are reliable precisely *because* the structure is intentionally simple.

This is not a workaround—it is a deliberate architectural choice based on a fundamental principle of systems engineering: 

> *The fewer the variables, the more predictable the output.*

### Principle 2: Fixed logic yields deterministic output.

This principle applies to **Tool-Calling Agents and Multi-Agent systems**, and forms the foundation of QoScore's Commercial Edition evaluation methodology. The specific implementation details are beyond the scope of this document, but the underlying logic is consistent: when the input schema is well-defined and the execution path is constrained, reliable test case generation becomes tractable.

## Part 2: The Hybrid Workflow (How We Ensure Quality)

QoScore doesn't blindly trust full automation. Production-grade evaluation requires a human-in-the-loop validation cycle.

### The 4-Step Process

**1. Document Ingestion**  
You upload your raw enterprise data—HR policies, technical manuals, product documentation, API contracts, whatever is the "source of truth" for your Agent.

**2. Automated Generation**  
QoScore's LLM engine automatically generates hundreds of metric-specific test cases. These aren't random; they're targeted to cover:

- Every one of the 12 QoScore Framework metrics (Relevance, Safety, Latency, Tool Success Rate, etc.)
- Edge cases (ambiguous queries, typos, out-of-domain questions)
- Various difficulty levels (straightforward questions, complex multi-step queries)

The result is a massive, comprehensive **FAQ Test Bank** for that specific sub-scenario.

**3. Human Confirmation (The Anchor)**  
You (or your domain experts) review the generated FAQs. You edit them, reject low-quality ones, and mark your approval.

Why is this critical? Because **reviewing is infinitely faster than writing from scratch**. You've just established a **"Gold Standard Baseline"** with near-zero friction—something that would have taken weeks to manually author.

**4. Periodic Monitoring**  
Once the baseline is locked in, QoScore acts as a relentless, automated QA engineer. As long as your underlying documents haven't changed, this FAQ set becomes your probe. You schedule periodic test runs (e.g., weekly). If a metric suddenly drops, you instantly know that a recent system update (tweaking the Agent prompt, changing the vector database, updating the LLM model) caused a silent degradation.

## Part 3: From FAQ Baseline to Production Monitoring

Let's concretize this with a real scenario.

### The Workflow: "Set It and Forget It"

**Scenario:** You maintain an internal HR Agent that answers employee questions about payroll, benefits, and leave policies.

**Step 1: Configure the Baseline**

- You upload your HR policy documents to QoScore.
- QoScore auto-generates 200 test cases (FAQ) covering payroll queries, leave policy questions, and benefits edge cases.
- Your HR team spends 30 minutes reviewing and confirming. Now you have your Gold Standard Baseline.

**Step 2: Schedule Automated Execution**

- You tell QoScore: "Run this HR Agent test suite every 24 hours."
- You could also configure different cadences for different Agents:
  - Newly deployed RAG: Every 12 hours.
  - Stable, legacy Workflow: Once a week.

**Step 3: The Platform Runs Silently**

- QoScore executes the FAQ set against your live HR Agent according to the schedule.
- The platform mimics real user interactions, capturing the Agent's responses, and scoring them against the 12 metrics.
- All results are logged and analyzed.

**Step 4: Exception Alerting & Drill-Down**

- 99% of the time, your life is quiet. The Agent performs normally.
- But one morning, the platform triggers an alert: *"Warning: 'Leave Policy Query' sub-scenario accuracy dropped from 94% to 82% overnight."*
- You log into the QoScore Dashboard and instantly drill down:
  - **Global Level:** Overall Health Score dropped 12%.
  - **Metric Level:** The "Context Relevance" metric fell from 0.89 to 0.71.
  - **Test Case Level:** You can see exactly which 3 FAQ questions failed (e.g., "What happens to unused leave at year-end?").
  - **Diagnosis:** You immediately suspect yesterday's RAG index rebuild. You revert it, and the score bounces back.

**This is not guesswork. This is engineering.**

## Part 4: Advanced Capability: Gray-Box Testing for Tool-Calling Agents (Commercial Edition)

For most open-source users, black-box FAQ testing (above) is sufficient. But what if your Agent is more complex? What if it calls internal databases, payment APIs, or third-party services?

### The Challenge

How do you automatically test an Agent that interacts with a complex Tool ecosystem? Manually writing test cases for each Tool is tedious and error-prone.

### The Solution: Gray-Box API Schema Parsing

In the **Commercial Edition**, QoScore employs a powerful methodology:

1. **Schema Capture:** Instead of forcing you to write test scripts, QoScore captures the declarative API schemas directly from the `tools` payload field in your LLM's request logs.
   
   - Example: Your Agent has a Tool like `query_employee_salary(employee_id: string, year: int) -> float`.

2. **Mock FAQ Generation:** QoScore reads these tool descriptions and automatically generates realistic test queries.
   
   - Generated: "What is the annual salary for the VP of Engineering in 2024?"

3. **Variable Binding:** For input/output parameters, QoScore intelligently leaves placeholders. You simply provide a few known test variables (e.g., `VP_ID = emp_12345`, `Salary = 250000`), and the platform instantly multiplies this into a robust, dynamic test bank.

The result: **You don't write a single test script. The platform auto-generates thousands of realistic Tool-calling scenarios.**

## Part 5: The Ultimate Competitive Advantage (Industry-Specific Benchmarks)

Here's where QoScore transforms from a point solution into a strategic moat.

### The Problem with Generic Benchmarks

Academic benchmarks (MMLU, HumanEval) test general knowledge. They are useless for testing whether your HR Agent correctly interprets your company's unique leave policy, or whether your FinTech Agent understands your regulatory compliance rules.

### The Solution: Crowdsourced, Industry-Specific FAQ Libraries

As more organizations deploy QoScore, something extraordinary happens:

- **Opt-In Contribution:** With your authorization, QoScore extracts **fully anonymized, desensitized test cases** from your confirmed FAQ baselines.

- **Aggregation:** These sanitized cases are pooled into industry-specific libraries:
  
  - "QoScore HR Agent Baseline" (1000s of verified leave, payroll, and benefits test cases)
  - "QoScore FinTech Agent Baseline" (compliance, fraud detection, trading logic edge cases)
  - "QoScore Legal AI Baseline" (contract interpretation, regulatory compliance scenarios)

- **Future Users Benefit:** When a new user deploys their HR Agent, they don't start from scratch. They instantly inherit thousands of industry-validated test cases. Their baseline goes live in hours instead of weeks.

### Why This Matters

This accumulated library is **not easily replicated**. It represents distilled knowledge from hundreds of real enterprises, refined through production use. Over time, it becomes QoScore's true competitive advantage—a data moat that only grows stronger.

## Summary: From Vague Complaints to Engineering Precision

**Without QoScore:**  
*"Our HR Agent stopped answering questions correctly today. Can't figure out why."* → Vague, un-actionable, time-consuming debugging.

**With QoScore:**  
*"Alert: Leave Policy Query baseline accuracy dropped from 94% to 82%. Failed test case: 'What is the carry-over policy for unused leave?' Root cause: Yesterday's RAG index rebuild reduced Context Relevance from 0.89 to 0.71. Solution: Revert the index or retune the retrieval parameters."* → Precise, actionable, instant fix.

**This is what enterprise-grade AI evaluation looks like.**
