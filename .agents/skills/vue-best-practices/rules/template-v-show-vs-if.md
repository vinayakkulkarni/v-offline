---
title: v-show for Frequent Toggles, v-if for Rare
impact: MEDIUM-HIGH
impactDescription: Reduces DOM thrashing for frequent toggles
tags: template, v-show, v-if, conditional, performance
---

## v-show for Frequent Toggles, v-if for Rare

`v-if` removes/adds elements from DOM. `v-show` toggles CSS display. Choose based on toggle frequency.

**Incorrect (v-if for frequently toggled content):**

```vue
<template>
  <div>
    <button @click="showDetails = !showDetails">Toggle</button>
    
    <!-- BAD: Creates/destroys DOM on every click -->
    <div v-if="showDetails" class="details-panel">
      <ExpensiveComponent :data="data" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showDetails = ref(false)
// User toggles this rapidly...
</script>
```

**Correct (v-show for frequent toggles):**

```vue
<template>
  <div>
    <button @click="showDetails = !showDetails">Toggle</button>
    
    <!-- GOOD: Just toggles display: none -->
    <div v-show="showDetails" class="details-panel">
      <ExpensiveComponent :data="data" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showDetails = ref(false)
</script>
```

**When to use which:**

| Scenario | Use |
|----------|-----|
| Tabs toggled by user | `v-show` |
| Dropdown menus | `v-show` |
| Accordion panels | `v-show` |
| Feature flags (rarely change) | `v-if` |
| Auth-gated content | `v-if` |
| Error states | `v-if` |
| Initial expensive render | `v-if` (lazy) |

**v-if is lazier (better initial load):**

```vue
<template>
  <!-- v-if: Component not created until condition is true -->
  <HeavyComponent v-if="isVisible" />
  
  <!-- v-show: Component created immediately, just hidden -->
  <HeavyComponent v-show="isVisible" />
</template>
```

**Combine for best of both:**

```vue
<template>
  <!-- Only create when first needed, then toggle with v-show -->
  <div v-if="hasBeenOpened">
    <ExpensiveModal v-show="isOpen" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const isOpen = ref(false)
const hasBeenOpened = ref(false)

watch(isOpen, (open) => {
  if (open) hasBeenOpened.value = true
})
</script>
```

**v-if with v-else-if chain:**

```vue
<template>
  <!-- v-if chains are fine - only one branch renders -->
  <LoadingSpinner v-if="isLoading" />
  <ErrorMessage v-else-if="error" :error="error" />
  <DataDisplay v-else :data="data" />
</template>
```

**Avoid v-show with heavy initial content:**

```vue
<template>
  <!-- BAD: Creates 1000 items immediately even if hidden -->
  <div v-show="showList">
    <div v-for="item in thousandItems" :key="item.id">
      {{ item.name }}
    </div>
  </div>
  
  <!-- GOOD: Only creates when shown -->
  <div v-if="showList">
    <div v-for="item in thousandItems" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

Reference: [v-if vs v-show](https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show)
