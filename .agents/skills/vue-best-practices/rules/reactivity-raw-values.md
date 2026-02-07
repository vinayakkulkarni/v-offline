---
title: Use toRaw() for Read-Only Operations on Large Data
impact: HIGH
impactDescription: Avoids proxy overhead in tight loops
tags: reactivity, toRaw, performance, iteration
---

## Use toRaw() for Read-Only Operations on Large Data

When performing read-only operations (filtering, searching, serialization) on large reactive data, use `toRaw()` to work with the underlying object directly, avoiding proxy overhead.

**Incorrect (proxy overhead in loops):**

```typescript
import { ref } from 'vue'

const items = ref<Item[]>(generateLargeDataset(10000))

function searchItems(query: string) {
  // BAD: Each access goes through reactive proxy
  return items.value.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  )
}

function serializeData() {
  // BAD: JSON.stringify with reactive proxy is slower
  return JSON.stringify(items.value)
}
```

**Correct (using toRaw):**

```typescript
import { ref, toRaw } from 'vue'

const items = ref<Item[]>(generateLargeDataset(10000))

function searchItems(query: string) {
  // Get raw array - no proxy overhead
  const rawItems = toRaw(items.value)
  return rawItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  )
}

function serializeData() {
  // Much faster serialization
  return JSON.stringify(toRaw(items.value))
}
```

**When to use toRaw:**

| Scenario | Use toRaw? |
|----------|------------|
| Iterating over large arrays (1000+ items) | Yes |
| JSON serialization | Yes |
| Passing to external libraries that don't need reactivity | Yes |
| Comparison operations | Yes |
| Modifying data (need reactivity to trigger) | No |

**Performance-critical search example:**

```typescript
import { ref, toRaw, computed } from 'vue'

const allProducts = ref<Product[]>([])
const searchQuery = ref('')

// Use toRaw in computed for large datasets
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return allProducts.value
  
  // Use raw data for filtering
  const raw = toRaw(allProducts.value)
  return raw.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  )
})
```

**Sending to Web Workers:**

```typescript
import { toRaw } from 'vue'

const data = ref(complexData)

// Web Workers can't handle reactive proxies
worker.postMessage(toRaw(data.value))
```

**Note:** The returned value from `toRaw()` should be treated as read-only. Mutating it won't trigger reactivity updates.

Reference: [toRaw](https://vuejs.org/api/reactivity-advanced.html#toraw)
