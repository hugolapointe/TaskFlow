# **Copilot Custom Instructions – Global TaskFlow Policy**

## **Documentation Policy**

* Keep only `README` files.
* Never create guides, tutorials, or documentation files.
* No `.md` files except `README`.
* Never add JSDoc, docstrings, or extensive inline comments.

---

## **File & Folder Policy**

* Keep repositories minimal and clean.
* Create folders only when logically required.
* Do not generate test, config, or placeholder folders unless explicitly requested.
* Avoid unnecessary files such as `.keep`, `example.js`, or `sample.json`.
* Do not create `.env`, `.env.example`, or configuration templates without explicit approval.

---

## **Dependencies**

* Do not install or import new packages unless explicitly approved.
* Prefer built-in language features or standard libraries.
* Avoid adding external utilities (e.g., Lodash, Moment) for trivial operations.
* Keep `package.json` minimal and relevant.

---

## **Security & Secrets**

* Never include or generate credentials, tokens, or API keys.
* Never store secrets in plain text.
* Assume all code may become public.
* Sanitize or omit any sensitive information by default.

---

## **Scripts & Commands**

* Avoid running PowerShell or shell commands directly in the terminal.
* Use temporary scripts for automation when required.
* Always delete temporary scripts after execution.
* Prefer scripted automation over manual commands.

---

## **Code Comments**

Add comments **only** for:

* Complex algorithms not immediately clear by reading the code.
* Temporary workarounds or known issues.
* Critical business logic that cannot be expressed through naming.

Remove or avoid comments that:

* Describe what the code already expresses.
* Explain parameters or return values that are clear from context.
* Repeat obvious logic.
* Serve as documentation rather than clarification.

---

## **Code Style**

* Keep code clean, readable, and well-spaced.
* Use **4-space indentation** consistently.
* Limit lines to **80 characters** maximum.
* Follow **conventional style rules** for each programming language.
* Write **self-documenting** code with meaningful variable and function names.
* Favor **methods with a single responsibility**.
* Extract complex logic into small, descriptive private methods.
* Each function should have one clear purpose.
* Prefer simplicity over cleverness.
* Code should read like prose — every line must serve a clear purpose.

---

## **Error Handling**

* Keep error handling simple and focused.
* Avoid `try/catch` unless necessary.
* Throw or return meaningful errors only when relevant to business logic.
* Do not wrap or log errors excessively.

---

## **Validation**

* Do not implement complex validation unless explicitly requested.
* Keep validation logic minimal, relevant, and purpose-driven.
* Validate only what is necessary for functional integrity.

---

## **Logging & Debugging**

* Do not add `console.log` or logging statements unless explicitly requested.
* Remove all temporary logging before finalizing code.
* Production code must be free of debugging statements.

---

## **Testing**

* Do not automatically create test suites or files.
* Add test stubs only when explicitly requested.
* Keep test logic minimal and relevant to the core functionality.

---

## **Version Control**

* Copilot may **suggest commits**, but must **wait for explicit user approval** before committing.
* Do not auto-generate or push commits.
* Use clear, imperative commit messages (e.g., `Add validation for form inputs`).
* Avoid merge commits; prefer rebase when applicable.
* Keep branches focused and purpose-specific.
* Never create or delete branches without approval.

---

## **Anti-Patterns to Avoid**

* Over-engineering or premature optimization.
* Unnecessary abstractions or wrappers.
* Configuration over convention when not needed.
* Code written “just in case.”
* Dead, unused, or commented-out code.

---

## **Workflow**

1. Analyze the user’s request.
2. Ask clarifying questions if anything is unclear.
3. Propose a concise and actionable plan.
4. Wait for explicit user approval.
5. Execute only after confirmation.
6. Clean up any temporary files created during execution.

---

## **Communication**

* Keep responses concise and actionable.
* Avoid long explanations or redundant summaries.
* Use direct, clear language.
* Focus on execution and precision.