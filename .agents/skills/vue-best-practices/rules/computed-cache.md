---
title: Use computed() for Derived Values, Not Methods
impact: HIGH
impactDescription: Cached results, avoids redundant calculations
tags: computed, methods, caching, performance
---

## Use computed() for Derived Values, Not Methods

Computed properties are cached based on their reactive dependencies. Methods are called on every render. Use computed for derived values.

**Incorrect (method called every render):**

```vue
<template>
  <div>
    <!-- getFilteredItems() called on EVERY render -->
    <ul>
      <li v-for="item in getFilteredItems()" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    
    <!-- Called again! Even if nothing changed -->
    <p>Total: {{ getFilteredItems().length }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([...])
const searchQuery = ref('')

// BAD: Recalculates every time it's called
function getFilteredItems() {
  console.log('Filtering...') // Logs on every render!
  return items.value.filter(item => 
    item.name.includes(searchQuery.value)
  )
}
</script>
```

**Correct (computed caches result):**

```vue
<template>
  <div>
    <!-- Same cached value used -->
    <ul>
      <li v-for="item in filteredItems" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    
    <!-- Still cached, no recalculation -->
    <p>Total: {{ filteredItems.length }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([...])
const searchQuery = ref('')

// GOOD: Only recalculates when items or searchQuery changes
const filteredItems = computed(() => {
  console.log('Filtering...') // Only logs when deps change
  return items.value.filter(item => 
    item.name.includes(searchQuery.value)
  )
})
</script>
```

**When to use methods vs computed:**

| Scenario | Use |
|----------|-----|
| Derived value displayed in template | `computed()` |
| Value used multiple times in template | `computed()` |
| Expensive calculation | `computed()` |
| Needs arguments | Method |
| Side effects (API calls, mutations) | Method |
| Event handlers | Method |

**Computed with arguments - use a getter function:**

```vue
<script setup>
import { computed } from 'vue'

const items = ref([...])

// If you need arguments, return a function from computed
// But consider if this defeats caching benefits
const getItemById = computed(() => {
  // Build a Map once when items change
  const map = new Map(items.value.map(item => [item.id, item]))
  // Return lookup function
  return (id: string) => map.get(id)
})
</script>

<template>
  <div>{{ getItemById(someId)?.name }}</div>
</template>
```

**Chained computed properties:**

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([...])
const searchQuery = ref('')
const sortOrder = ref('asc')

// Chain computeds for complex transformations
const filteredItems = computed(() => 
  items.value.filter(item => item.name.includes(searchQuery.value))
)

const sortedItems = computed(() => 
  [...filteredItems.value].sort((a, b) => 
    sortOrder.value === 'asc' 
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  )
)
</script>
```

Reference: [Computed Properties](https://vuejs.org/guide/essentials/computed.html)
