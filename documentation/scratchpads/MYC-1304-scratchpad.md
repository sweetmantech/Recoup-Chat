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

## Current Ticket: MYC-1304: Change Root Route to Initial Chat Interface

### Background
The application's root route currently directs users to Autopilot instead of the chat interface, creating an unintuitive user experience. We need to change the root route to display the initial chat interface (currently at `/new`) while ensuring the Autopilot functionality remains accessible through a dedicated route.

### Current Implementation Analysis
Based on initial exploration of the codebase:

1. **Root Route (`/`):**
   - Currently renders the `AutoPilotPage` component
   - Uses `AutopilotProvider` for state management
   - Includes `useFirstArtistRedirect` hook for artist-related redirects

2. **New Chat Route (`/new`):**
   - Renders the `NewChatPage` component
   - Uses `ChatSkeleton` for loading state
   - Renders `InitialChat` component when loaded
   - Uses `useChatProvider` hook for chat state

3. **Key Components:**
   - `AutoPilot`: Main component for the Autopilot feature
   - `InitialChat`: Main component for the chat interface
   - Both components likely have different state management and UI structures

## Key Code Snippets
### app/page.tsx (Root Route)
```jsx
"use client";

import AutoPilot from "@/components/AutoPilot";
import { AutopilotProvider } from "@/providers/AutopilotProvider";
import { useFirstArtistRedirect } from "@/hooks/useFirstArtistRedirect";

const AutoPilotPage = () => {
  useFirstArtistRedirect();

  return (
    <AutopilotProvider>
      <AutoPilot />
    </AutopilotProvider>
  );
};

export default AutoPilotPage;
```

### app/new/page.tsx (New Chat Route)
```jsx
"use client";

import ChatSkeleton from "@/components/Chat/ChatSkeleton";
import InitialChat from "@/components/Chat/InitialChat";
import { useChatProvider } from "@/providers/ChatProvider";

const NewChatPage = () => {
  const { isLoading } = useChatProvider();
  if (isLoading) return <ChatSkeleton />;
  return <InitialChat />;
};

export default NewChatPage;
```

### Issues to Address
1. Change the root route (`/`) to render the same content as `/new`
2. Create a new dedicated route for Autopilot (e.g., `/autopilot`)
3. Ensure all navigation elements and links are updated to reference the correct routes
4. Maintain backward compatibility for any existing links or bookmarks
5. Ensure the `useFirstArtistRedirect` hook is properly implemented in the new root route if needed

### Files to Update
1. `app/page.tsx` - Update to render the chat interface instead of Autopilot
2. Create new file: `app/autopilot/page.tsx` - Move Autopilot functionality here
3. Potentially update navigation components that link to these routes
4. Check for any hardcoded route references in components or hooks

### Risks and Considerations
1. **User Experience:** Users familiar with the current routing may be confused by the change
2. **Bookmarks/Saved Links:** Users with bookmarked links may need to update them
3. **SEO Impact:** Changing the root route could affect search engine indexing
4. **State Management:** Ensure proper state management is maintained across routes
5. **Performance:** The chat interface may have different performance characteristics than Autopilot

## Parallel Development Awareness

### Current Branch Context
- **Current Branch:** MYC-1304
- **Based on Main at Commit:** [Current Main]
- **Main has been updated since branch creation:** No (new branch)

### Related In-Progress Tickets
This section tracks other tickets that are being worked on in parallel that might affect this ticket.

| Ticket | Branch | Status | Key Changes | Potential Impact |
|--------|--------|--------|-------------|------------------|
| None identified | - | - | - | - |

### Dependency Analysis
- **Is this ticket blocked by another ticket?** No
  - This ticket appears to be independent and can be implemented without dependencies on other tickets.
- **Could this ticket be implemented differently if another ticket is merged first?** No
  - The routing change is straightforward and doesn't depend on other features.
- **Decision:** Independent implementation

### Implementation Strategy
Based on the parallel development situation, our strategy is:
1. Create a new branch from main named `MYC-1304`
2. Implement the routing changes in isolation
3. Test thoroughly to ensure no regressions
4. Submit for review when complete

### Implementation Plan
- [x] Create new branch `MYC-1304-Change-Root-Route-to-Initial-Chat-Interface` from main
- [x] Create new file `app/autopilot/page.tsx` with the current root page content
- [x] Update `app/page.tsx` to match the content of `app/new/page.tsx`
- [x] Update navigation components that link to the root route to point to `/autopilot` instead
- [ ] Test both routes to ensure they function correctly
- [ ] Verify that the `/new` route still works as expected
- [ ] Test all related functionality to ensure no regressions
- [ ] Document changes for future reference

### Testing Plan
1. **Functional Testing:**
   - Verify the root route (`/`) displays the chat interface
   - Verify the new Autopilot route (`/autopilot`) displays the Autopilot interface
   - Verify the existing `/new` route still works as expected
   - Test navigation between routes

2. **Regression Testing:**
   - Ensure all features of both interfaces continue to work
   - Verify that artist redirects work correctly
   - Test with different user scenarios and states

3. **Edge Cases:**
   - Test with bookmarked links
   - Test with direct URL access
   - Test with browser history navigation

## Decision Log
| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|-------------------------|
| [Current Date] | Implement direct route swap | Simplest approach with minimal changes | Redirect approach, which would add complexity |
| [Current Date] | Keep `useFirstArtistRedirect` hook in root page | Ensures consistent artist redirection behavior | Removing it could break expected functionality |

## Rollback Plan
- **Trigger Conditions:** If users report significant issues with navigation or functionality
- **Rollback Steps:** 
  1. Revert the changes to `app/page.tsx`
  2. Remove the new `app/autopilot/page.tsx` file
  3. Deploy the reverted changes
- **Verification Steps:** Verify that the root route returns to showing Autopilot

## Documentation Updates Needed
- [ ] Update internal documentation about routing
- [ ] Update any user guides that reference the routes
- [ ] Add comments in code explaining the routing structure

## Post-Implementation Verification
- [ ] All acceptance criteria met
- [ ] All tests passing
- [ ] No regression issues
- [ ] Documentation updated

## Lessons Learned
[To be filled after implementation]

## Progress Notes
- Created new branch `MYC-1304-Change-Root-Route-to-Initial-Chat-Interface`
- Created new file `app/autopilot/page.tsx` with the Autopilot functionality
- Updated `app/page.tsx` to render the chat interface instead of Autopilot
- Updated the SideMenu component to link to `/autopilot` instead of `/` for the Autopilot feature
- Updated the Menu and MiniMenu components in the Sidebar to link to `/autopilot` instead of `/` for the Autopilot feature
- Kept the Artist component navigation to root path (`/`) when switching artists in the funnels section
- Kept the `useFirstArtistRedirect` hook in the root page to maintain consistent behavior
- Kept the SignInPage redirect to root path since it now points to the chat interface, which is the desired behavior
- Fixed an issue with suggestion boxes not appearing on the root path by updating the `usePrompts` hook to recognize the root path as a new chat
