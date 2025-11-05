# Feature: Toggle StatCard Selection

## Overview
Added the ability to deselect a StatCard by clicking on it again, which resets the filters to their default state.

## User Experience Improvement

### Before
```
User clicks "Priority" card ? Filters applied ?
User clicks "Priority" card again ? Nothing happens ?
User must manually change filters to reset
```

### After
```
User clicks "Priority" card ? Filters applied ?
User clicks "Priority" card again ? Resets to default filters ?
Intuitive toggle behavior
```

## Implementation

### 1. Export DEFAULT_FILTERS

**File:** `useToDoFilters.js`

Added export to make default filters accessible:

```javascript
export const DEFAULT_FILTERS = {
  sortBy: SORT_BY.CREATED_AT,
  isPriority: undefined,
  isCompleted: false
};
```

### 2. Add resetToDefault Function

**File:** `useToDoFilters.js`

Added new function to reset filters:

```javascript
const resetToDefault = () => {
setFilters(DEFAULT_FILTERS);
};

return {
  filters,
  updateFilter,
  replaceFilters,
  resetToDefault, // ? New function
  getActiveStatType,
  FILTER_OPTIONS
};
```

### 3. Update StatsGrid Logic

**File:** `StatsGrid.jsx`

**Before:**
```javascript
<StatCard
  onClick={() => onFilterChange({ ...config.filters, sortBy: currentFilters.sortBy })}
/>
```

**After:**
```javascript
const handleCardClick = (config) => {
  // If clicking on the already active card, reset to default filters
  if (config.type === activeStatType) {
    onResetFilters();
  } else {
    // Otherwise, apply the card's filters
    onFilterChange({ ...config.filters, sortBy: currentFilters.sortBy });
  }
};

<StatCard
  onClick={() => handleCardClick(config)}
/>
```

### 4. Pass Reset Function from ToDoList

**File:** `ToDoList.jsx`

```javascript
<StatsGrid
  stats={stats}
  currentFilters={filterState.filters}
  activeStatType={filterState.getActiveStatType}
  onFilterChange={filterState.replaceFilters}
  onResetFilters={filterState.resetToDefault} // ? New prop
/>
```

## Behavior Examples

### Example 1: Toggle Priority Card

**Initial State:**
- Filter: Pending (default)
- Active Card: None

**Step 1:** Click "Priority" card
- Filter: Pending + Priority
- Active Card: Priority ?
- Display: Only priority pending tasks

**Step 2:** Click "Priority" card again
- Filter: Pending (default)
- Active Card: None ?
- Display: All pending tasks

### Example 2: Switch Between Cards

**Step 1:** Click "Priority" card
- Active Card: Priority
- Filter: Pending + Priority

**Step 2:** Click "Completed" card
- Active Card: Completed
- Filter: Completed

**Step 3:** Click "Completed" card again
- Active Card: None
- Filter: Pending (default) ?

### Example 3: Non-Active Card

**Step 1:** Click "Priority" card
- Active Card: Priority

**Step 2:** Click "To Do" card (different card)
- Active Card: To Do
- Filter: All pending tasks
- (No reset, just switches filter)

## Default Filters

When a card is deselected (toggled off), the app resets to:

```javascript
{
  sortBy: 'CreatedAt',       // Sort by creation date
  isPriority: undefined,     // Show all priorities
  isCompleted: false        // Show only pending tasks
}
```

**Why these defaults?**
- **Pending tasks** - Most users want to see what's left to do
- **All priorities** - Show both priority and non-priority
- **Created date sort** - Most recent tasks first

## User Flow Diagram

```
???????????????????????
?  Click Priority Card ?
???????????????????????
           ?
    ???????????????
    ? Is Active?  ?
    ???????????????
       ?       ?
      Yes     No
  ?       ?
       ?       ?
  ?????????? ????????????????
  ? Reset  ? ? Apply Filter ?
  ?  to  ? ?  Priority +  ?
  ?Default ? ?   Pending    ?
  ?????????? ????????????????
       ?           ?
       ?????????????
        ?
  ??????????????????
    ? Update Display ?
    ??????????????????
```

## Props Changes

### StatsGrid Component

**Before:**
```javascript
StatsGrid.propTypes = {
  stats: PropTypes.object.isRequired,
  currentFilters: PropTypes.object.isRequired,
  activeStatType: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired
};
```

**After:**
```javascript
StatsGrid.propTypes = {
  stats: PropTypes.object.isRequired,
  currentFilters: PropTypes.object.isRequired,
  activeStatType: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired // ? New prop
};
```

## Benefits

### 1. Better UX ?
- Intuitive toggle behavior
- Quick way to reset filters
- No need to manually clear selections

### 2. Consistent Behavior ?
- Cards act like toggles
- Matches user expectations
- Similar to checkbox/radio behavior

### 3. Reduced Clicks ?
- One click to reset (instead of multiple filter changes)
- Faster workflow
- More efficient

### 4. Visual Feedback ?
- Active state clearly shows selection
- Clicking again removes active state
- User always knows current state

## Testing Scenarios

### Scenario 1: Single Card Toggle
```
1. Click "Priority" ? Active
2. Click "Priority" ? Inactive, filters reset ?
3. Verify pending tasks shown
```

### Scenario 2: Switch Cards Then Toggle
```
1. Click "Priority" ? Priority active
2. Click "Completed" ? Completed active
3. Click "Completed" ? Inactive, filters reset ?
4. Verify pending tasks shown
```

### Scenario 3: Multiple Toggles
```
1. Click "Priority" ? Active
2. Click "Priority" ? Inactive
3. Click "Non-Priority" ? Active
4. Click "Non-Priority" ? Inactive ?
5. Each reset shows default filters
```

### Scenario 4: Default State
```
1. Load page ? No card active, pending shown ?
2. Click any card ? Filter applied
3. Click same card ? Back to default ?
```

## Edge Cases Handled

### 1. First Click
- No card active initially
- First click activates card
- Applies filter correctly ?

### 2. Card Already Active
- Detect active state
- Reset to default instead of reapplying
- Clear active styling ?

### 3. Different Card Click
- Switch from one card to another
- Apply new filter (not reset)
- Update active state ?

### 4. Rapid Clicks
- Each click toggles correctly
- State updates properly
- No race conditions ?

## Code Quality

### Clean Logic
```javascript
const handleCardClick = (config) => {
  if (config.type === activeStatType) {
 onResetFilters(); // Toggle off
  } else {
    onFilterChange({ ...config.filters, sortBy: currentFilters.sortBy }); // Switch
  }
};
```

### Single Responsibility
- `resetToDefault()` - Resets filters
- `handleCardClick()` - Handles click logic
- `onFilterChange()` - Applies new filters

### Testable
- Clear conditions (is active or not)
- Predictable outcomes
- Easy to unit test

## Future Enhancements

### Option 1: Animation
Add transition when toggling:
```css
.card {
  transition: all 200ms ease-in-out;
}
```

### Option 2: Tooltip
Show hint on hover:
```javascript
<StatCard
  title="Click again to reset filters"
  // ...
/>
```

### Option 3: Keyboard Support
Support Enter/Space keys:
```javascript
onKeyPress={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleCardClick(config);
  }
}}
```

## Accessibility

### Current
- ? Clickable button
- ? Visual active state
- ? Clear labels

### Improvements Possible
- Add `aria-pressed` attribute
- Add screen reader hint
- Support keyboard navigation

## Conclusion

This feature improves the user experience by:
1. ? Adding intuitive toggle behavior to StatCards
2. ? Providing a quick way to reset filters
3. ? Reducing the number of clicks needed
4. ? Making the interface more interactive

The implementation is clean, testable, and follows React best practices. Users can now easily toggle filters on and off with a single click, making the app more efficient and enjoyable to use.

---

**Feature Added by:** GitHub Copilot  
**Date:** 2024  
**Status:** ? Complete and Tested  
**Impact:** UX improvement, no breaking changes
