---
title: Never Use v-if and v-for on Same Element
impact: MEDIUM-HIGH
impactDescription: Prevents hidden performance issues and confusion
tags: template, v-if, v-for, anti-pattern
---

## Never Use v-if and v-for on Same Element

When `v-if` and `v-for` are on the same element, `v-if` has higher priority in Vue 3, which often leads to errors or unintended behavior.

**Incorrect (v-if and v-for together):**

```vue
<template>
  <!-- BAD in Vue 3: v-if is evaluated first, but 'item' doesn't exist yet! -->
  <div 
    v-for="item in items" 
    v-if="item.isActive"
    :key="item.id"
  >
    {{ item.name }}
  </div>
  
  <!-- BAD: v-if evaluated for every iteration -->
  <div 
    v-for="item in items"
    v-if="shouldShowList"
    :key="item.id"
  >
    {{ item.name }}
  </div>
</template>
```

**Correct (filter with computed):**

```vue
<template>
  <!-- GOOD: Filter in computed, iterate over result -->
  <div v-for="item in activeItems" :key="item.id">
    {{ item.name }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps<{
  items: Item[]
}>()

// Filter once, not per-render
const activeItems = computed(() => 
  props.items.filter(item => item.isActive)
)
</script>
```

**Correct (wrap in template for conditional list):**

```vue
<template>
  <!-- GOOD: v-if on container, v-for on items -->
  <template v-if="shouldShowList">
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
  </template>
  
  <!-- Or use a wrapper element -->
  <div v-if="shouldShowList" class="list">
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

**Multiple conditions:**

```vue
<template>
  <!-- GOOD: Combine conditions in computed -->
  <div v-for="item in visibleActiveItems" :key="item.id">
    {{ item.name }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const visibleActiveItems = computed(() => 
  items.value
    .filter(item => item.isActive)
    .filter(item => item.isVisible)
)
</script>
```

**For showing message when filtered list is empty:**

```vue
<template>
  <div v-if="activeItems.length === 0">
    No active items
  </div>
  <div v-else>
    <div v-for="item in activeItems" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const activeItems = computed(() => 
  items.value.filter(item => item.isActive)
)
</script>
```

**ESLint rule to catch this:**

```json
{
  "rules": {
    "vue/no-use-v-if-with-v-for": "error"
  }
}
```

Reference: [Style Guide - v-if with v-for](https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for)
