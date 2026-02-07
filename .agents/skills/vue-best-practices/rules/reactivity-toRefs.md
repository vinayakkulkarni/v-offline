---
title: Use toRefs() When Destructuring is Needed
impact: CRITICAL
impactDescription: Maintains reactivity while enabling destructuring
tags: reactivity, toRefs, destructuring, composables
---

## Use toRefs() When Destructuring is Needed

When you need to destructure a reactive object (e.g., returning from a composable), use `toRefs()` to maintain reactivity.

**Incorrect (loses reactivity when returned):**

```typescript
// composables/useCounter.ts
import { reactive } from 'vue'

export function useCounter() {
  const state = reactive({
    count: 0,
    doubleCount: 0
  })

  function increment() {
    state.count++
    state.doubleCount = state.count * 2
  }

  // BAD: Destructuring here loses reactivity
  return {
    ...state, // count and doubleCount are now plain values!
    increment
  }
}

// In component - won't be reactive
const { count, increment } = useCounter()
```

**Correct (using toRefs):**

```typescript
// composables/useCounter.ts
import { reactive, toRefs } from 'vue'

export function useCounter() {
  const state = reactive({
    count: 0,
    doubleCount: 0
  })

  function increment() {
    state.count++
    state.doubleCount = state.count * 2
  }

  return {
    ...toRefs(state), // Each property becomes a ref
    increment
  }
}

// In component - fully reactive
const { count, doubleCount, increment } = useCounter()
// count.value and doubleCount.value are reactive
```

**Alternative: Return refs directly:**

```typescript
// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter() {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return {
    count,
    doubleCount,
    increment
  }
}
```

**Use toRef() for single properties:**

```typescript
import { reactive, toRef } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

// Extract single property as ref
const countRef = toRef(state, 'count')
countRef.value++ // Updates state.count
```

**Props pattern with toRefs:**

```vue
<script setup>
import { toRefs } from 'vue'

const props = defineProps<{
  title: string
  count: number
}>()

// Convert props to refs for use in composables
const { title, count } = toRefs(props)
</script>
```

Reference: [toRefs](https://vuejs.org/api/reactivity-utilities.html#torefs)
