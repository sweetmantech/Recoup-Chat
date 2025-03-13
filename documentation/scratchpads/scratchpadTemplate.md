# Development Scratchpad

This scratchpad is used to plan and track progress on the current ticket we're working on. Before starting work on a new ticket, we'll update this file with a detailed implementation plan based on exploring the current codebase.

**Always make sure we are starting from a new branch from main that is named the same as the ticket we are working on.**

## IMPLEMENTATION PROCESS INSTRUCTIONS

Follow this process strictly for each ticket:

### Phase 1: Deep Codebase Understanding
1. **Initial Codebase Review**
   - Thoroughly explore all relevant parts of the codebase
   - Identify key files, components, and data flows related to the ticket
   - Document initial findings in the Current Implementation Analysis

2. **Deeper Investigation**
   - Re-evaluate the codebase with the initial context in mind
   - Look for edge cases, hidden dependencies, and subtle interactions
   - Expand the Current Implementation Analysis with new insights

3. **Final Comprehensive Review**
   - Make a final pass through the codebase to ensure nothing was missed
   - Verify all assumptions made in previous reviews
   - Ensure no stone is left unturned before proceeding
   - Complete the Current Implementation Analysis and Issues to Address sections

### Phase 2: Dependency and Risk Analysis
4. **Analyze Other Branches**
   - Review other in-progress tickets and their branches
   - Identify potential conflicts or dependencies
   - Complete the Parallel Development Awareness section

5. **Risk Assessment**
   - Identify potential risks and considerations
   - Document in the Risks and Considerations section

### Phase 3: Planning
6. **Develop Implementation Strategy**
   - Based on codebase understanding and dependency analysis
   - Document in the Implementation Strategy section

7. **Create Detailed Implementation Plan**
   - Break down the work into specific, actionable steps
   - Document in the Implementation Plan section

8. **Define Testing Approach**
   - Outline how changes will be tested
   - Document in the Testing Plan section

### Phase 4: Implementation
9. **Execute the Implementation Plan**
   - Follow the steps outlined in the Implementation Plan
   - Document progress and challenges in the Progress Notes section

10. **Review and Refine**
    - Continuously review the implementation against the plan
    - Refine the approach as needed based on new insights

## Current Ticket: [Ticket Number and Name]

### Background
[Brief description of the problem and why we're addressing it]

### Current Implementation Analysis
[Analysis of how the relevant functionality currently works]

## Key Code Snippets
### [Component/File Name]
```jsx
// Relevant code with comments explaining its purpose
```

### Issues to Address
[Specific issues that need to be fixed]

### Files to Update
[List of files that will likely need modification]

### Risks and Considerations
[Potential issues or side effects to be aware of]

## Parallel Development Awareness

### Current Branch Context
- **Current Branch:** [Branch Name]
- **Based on Main at Commit:** [Commit Hash/Description]
- **Main has been updated since branch creation:** [Yes/No]

### Related In-Progress Tickets
This section tracks other tickets that are being worked on in parallel that might affect this ticket.

| Ticket | Branch | Status | Key Changes | Potential Impact |
|--------|--------|--------|-------------|------------------|
| MYC-XXXX | branch-name | In Progress | Files changed and how | How those changes might affect this ticket |

### Dependency Analysis
- **Is this ticket blocked by another ticket?** [Yes/No]
  - If yes, which one and why: [Explanation]
- **Could this ticket be implemented differently if another ticket is merged first?** [Yes/No]
  - If yes, how: [Explanation]
- **Decision:** [Independent implementation / Wait for other ticket / Coordinate implementation]

### Implementation Strategy
Based on the parallel development situation, our strategy is:
[Explanation of how we'll handle potential conflicts or dependencies with other branches]

### Implementation Plan
[ ] Step 1
[ ] Step 2
[ ] Step 3

### Testing Plan
[How we'll verify the changes work as expected]

## Decision Log
| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|-------------------------|
| YYYY-MM-DD | [Decision made] | [Why this decision was made] | [Other options considered] |

## Rollback Plan
- **Trigger Conditions:** [When to roll back]
- **Rollback Steps:** [How to revert changes]
- **Verification Steps:** [How to verify successful rollback]

## Documentation Updates Needed
- [ ] Update API documentation
- [ ] Update user guides
- [ ] Update developer documentation

## Post-Implementation Verification
- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] No regression issues
- [ ] Documentation updated

## Lessons Learned
[Document insights gained during implementation that might be useful for future tickets]

## Progress Notes
[Notes on progress, challenges, and decisions made during implementation]
