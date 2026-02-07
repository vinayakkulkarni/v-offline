---
title: Use ref() for Primitives, reactive() for Objects
impact: CRITICAL
impactDescription: Prevents reactivity loss and unexpected bugs
tags: reactivity, ref, reactive, primitives, objects
---

## Use ref() for Primitives, reactive() for Objects

Using the wrong reactive wrapper leads to lost reactivity or unnecessary complexity.

**Incorrect (reactive with primitive):**

```typescript
// reactive() doesn't work with primitives - this won't be reactive!
const count = reactive(0) // TypeScript error, but runtime issue in JS

// Or wrapping a primitive in an object unnecessarily
const state = reactive({ count: 0 })
// Now you must always access state.count instead of just count
```

**Correct (ref for primitives):**

```typescript
import { ref } from 'vue'

// Use ref() for primitives
const count = ref(0)
const name = ref('')
const isLoading = ref(false)

// Access with .value in script, auto-unwrapped in template
count.value++
```

**Correct (reactive for objects):**

```typescript
import { reactive } from 'vue'

// Use reactive() for objects with multiple properties
const user = reactive({
  name: 'John',
  email: 'john@example.com',
  preferences: {
    theme: 'dark'
  }
})

// Direct property access
user.name = 'Jane'
user.preferences.theme = 'light'
```

**When to use which:**

| Type | Use | Reason |
|------|-----|--------|
| Primitives (string, number, boolean) | `ref()` | reactive() doesn't work with primitives |
| Single value that gets reassigned | `ref()` | Can reassign `.value` directly |
| Objects with nested properties | `reactive()` | Cleaner syntax, no `.value` needed |
| Arrays you iterate over | `ref()` or `reactive()` | Both work; ref() if you reassign the whole array |

Reference: [Vue Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
