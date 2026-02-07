---
title: Return Refs from Composables, Not Reactive Objects
impact: MEDIUM
impactDescription: Enables destructuring while maintaining reactivity
tags: composable, refs, reactive, return-value
---

## Return Refs from Composables, Not Reactive Objects

When returning state from composables, use refs (or toRefs) so consumers can destructure without losing reactivity.

**Incorrect (returning reactive object):**

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
  
  // BAD: Returning reactive object
  return { state, increment }
}

// In component - awkward usage
const { state, increment } = useCounter()
// Must access as state.count, state.doubleCount
```

```typescript
// Worse: Spreading loses reactivity
export function useCounter() {
  const state = reactive({ count: 0 })
  
  // BAD: Destructured values are not reactive!
  return { ...state, increment }
}
```

**Correct (returning refs):**

```typescript
// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = initial
  }
  
  // GOOD: Refs can be destructured
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// In component - clean destructuring
const { count, doubleCount, increment } = useCounter()
// count.value and doubleCount.value are reactive
```

**If using reactive internally, convert with toRefs:**

```typescript
// composables/useUser.ts
import { reactive, toRefs } from 'vue'

export function useUser() {
  const state = reactive({
    name: '',
    email: '',
    isLoading: false
  })
  
  async function loadUser(id: string) {
    state.isLoading = true
    try {
      const user = await api.getUser(id)
      state.name = user.name
      state.email = user.email
    } finally {
      state.isLoading = false
    }
  }
  
  // Convert to refs for return
  return {
    ...toRefs(state),
    loadUser
  }
}

// In component
const { name, email, isLoading, loadUser } = useUser()
```

**Consistent return structure:**

```typescript
// composables/useFetch.ts
import { ref, shallowRef } from 'vue'

export function useFetch<T>(url: string) {
  const data = shallowRef<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)
  
  async function execute() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  }
  
  // Consistent pattern: state refs + action functions
  return {
    data,
    error,
    isLoading,
    execute,
    // Computed helpers
    hasError: computed(() => !!error.value),
    hasData: computed(() => !!data.value)
  }
}
```

**Type-safe returns:**

```typescript
interface UseCounterReturn {
  count: Ref<number>
  doubleCount: ComputedRef<number>
  increment: () => void
  decrement: () => void
  reset: () => void
}

export function useCounter(initial = 0): UseCounterReturn {
  // Implementation...
}
```

Reference: [Composables - Conventions](https://vuejs.org/guide/reusability/composables.html#conventions-and-best-practices)
