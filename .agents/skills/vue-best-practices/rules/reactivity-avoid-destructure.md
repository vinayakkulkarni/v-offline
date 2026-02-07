---
title: Don't Destructure Reactive Objects
impact: CRITICAL
impactDescription: Prevents silent reactivity loss
tags: reactivity, destructuring, reactive, refs
---

## Don't Destructure Reactive Objects

Destructuring a reactive object breaks the reactivity connection. The destructured values become plain, non-reactive variables.

**Incorrect (loses reactivity):**

```typescript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

// BAD: These are now plain values, not reactive!
const { count, name } = state

// This won't trigger any updates
count++ // Just increments a local variable
```

```vue
<script setup>
import { reactive } from 'vue'

const user = reactive({
  firstName: 'John',
  lastName: 'Doe'
})

// BAD: Destructured in setup - loses reactivity
const { firstName, lastName } = user
</script>

<template>
  <!-- This won't update when user changes -->
  <p>{{ firstName }} {{ lastName }}</p>
</template>
```

**Correct (maintain reactivity):**

```typescript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

// Access properties directly
state.count++
state.name = 'Vue 3'
```

```vue
<script setup>
import { reactive } from 'vue'

const user = reactive({
  firstName: 'John',
  lastName: 'Doe'
})
</script>

<template>
  <!-- Access through the reactive object -->
  <p>{{ user.firstName }} {{ user.lastName }}</p>
</template>
```

**If you need to destructure, use toRefs():**

```typescript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

// toRefs() converts each property to a ref
const { count, name } = toRefs(state)

// Now these are refs - reactivity preserved!
count.value++ // This works and updates state.count
```

Reference: [Reactivity Fundamentals - Limitations](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)
