---
title: Use shallowRef() for Large Non-Reactive Data
impact: CRITICAL
impactDescription: 10-100× faster for large datasets
tags: reactivity, shallowRef, performance, large-data
---

## Use shallowRef() for Large Non-Reactive Data

When storing large objects or arrays where you only need to track replacement (not deep mutations), use `shallowRef()` to avoid the overhead of deep reactivity.

**Incorrect (unnecessary deep reactivity):**

```typescript
import { ref } from 'vue'

// BAD: Vue makes every nested property reactive
// For 10,000 items, this creates 10,000+ reactive proxies
const largeDataset = ref<DataItem[]>([])

async function fetchData() {
  const response = await fetch('/api/data')
  // Every property of every item becomes reactive
  largeDataset.value = await response.json()
}
```

**Correct (shallow reactivity):**

```typescript
import { shallowRef, triggerRef } from 'vue'

// Only the .value assignment is tracked, not nested mutations
const largeDataset = shallowRef<DataItem[]>([])

async function fetchData() {
  const response = await fetch('/api/data')
  // Fast: just replaces the value, no deep proxy creation
  largeDataset.value = await response.json()
}

// If you need to mutate and trigger update:
function updateItem(index: number, newData: Partial<DataItem>) {
  largeDataset.value[index] = { ...largeDataset.value[index], ...newData }
  triggerRef(largeDataset) // Manually trigger reactivity
}
```

**When to use shallowRef:**

| Scenario | Use |
|----------|-----|
| Large arrays from API (100+ items) | `shallowRef` |
| Complex nested objects you replace wholesale | `shallowRef` |
| Data that's read-only in the view | `shallowRef` |
| Objects with methods/class instances | `shallowRef` |
| Small reactive objects you mutate | `ref` or `reactive` |

**shallowReactive for objects:**

```typescript
import { shallowReactive } from 'vue'

// Only top-level properties are reactive
const state = shallowReactive({
  user: { name: 'John', email: 'john@example.com' },
  settings: { theme: 'dark' }
})

// This triggers updates
state.user = { name: 'Jane', email: 'jane@example.com' }

// This does NOT trigger updates (nested mutation)
state.user.name = 'Jane' // Won't cause re-render!
```

**Performance comparison:**

```typescript
// With ref() - 10,000 items
// ~50-100ms to make reactive

// With shallowRef() - 10,000 items  
// ~1-2ms (just stores the reference)
```

Reference: [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)
