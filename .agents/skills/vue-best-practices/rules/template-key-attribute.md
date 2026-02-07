---
title: Always Use Unique Keys in v-for
impact: MEDIUM-HIGH
impactDescription: Enables efficient list updates, prevents bugs
tags: template, v-for, key, lists, performance
---

## Always Use Unique Keys in v-for

Keys help Vue track element identity for efficient updates. Without proper keys, Vue uses an "in-place patch" strategy that can cause bugs and poor performance.

**Incorrect (no key or index as key):**

```vue
<template>
  <!-- BAD: No key -->
  <div v-for="item in items">
    {{ item.name }}
  </div>
  
  <!-- BAD: Index as key - breaks when list reorders -->
  <div v-for="(item, index) in items" :key="index">
    <input v-model="item.name" />
  </div>
</template>
```

**Why index keys are bad:**

```vue
<template>
  <!-- Items: ['A', 'B', 'C'] with keys [0, 1, 2] -->
  <!-- After removing 'B': ['A', 'C'] with keys [0, 1] -->
  <!-- Vue thinks: item at index 1 changed from 'B' to 'C' -->
  <!-- Instead of: 'B' was removed -->
  
  <div v-for="(item, index) in items" :key="index">
    <input v-model="item.value" />
    <!-- Input states get mixed up! -->
  </div>
</template>
```

**Correct (unique identifier as key):**

```vue
<template>
  <!-- GOOD: Unique ID -->
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
  
  <!-- GOOD: Unique string -->
  <div v-for="user in users" :key="user.email">
    <UserCard :user="user" />
  </div>
</template>
```

**For items without IDs, generate stable keys:**

```typescript
import { ref } from 'vue'

interface Item {
  id: string
  name: string
}

// Generate IDs when data arrives
function processItems(rawItems: RawItem[]): Item[] {
  return rawItems.map((item, index) => ({
    ...item,
    id: item.id || `item-${item.name}-${index}` // Fallback
  }))
}

const items = ref<Item[]>([])

async function loadItems() {
  const raw = await fetchItems()
  items.value = processItems(raw)
}
```

**Composite keys for nested loops:**

```vue
<template>
  <div v-for="group in groups" :key="group.id">
    <h3>{{ group.name }}</h3>
    <!-- Combine parent + child for uniqueness -->
    <div v-for="item in group.items" :key="`${group.id}-${item.id}`">
      {{ item.name }}
    </div>
  </div>
</template>
```

**When index IS acceptable:**

```vue
<template>
  <!-- OK: Static list that never reorders/filters -->
  <li v-for="(step, index) in staticSteps" :key="index">
    Step {{ index + 1 }}: {{ step }}
  </li>
  
  <!-- OK: Simple display without form inputs -->
  <span v-for="(tag, index) in tags" :key="index">
    {{ tag }}
  </span>
</template>
```

**Key on template:**

```vue
<template>
  <template v-for="section in sections" :key="section.id">
    <h2>{{ section.title }}</h2>
    <p>{{ section.content }}</p>
    <hr />
  </template>
</template>
```

Reference: [List Rendering - key](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
