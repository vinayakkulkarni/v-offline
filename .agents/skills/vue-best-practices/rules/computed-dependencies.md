---
title: Minimize Computed Dependencies
impact: HIGH
impactDescription: Reduces unnecessary recalculations
tags: computed, dependencies, optimization
---

## Minimize Computed Dependencies

Computed properties recalculate when ANY dependency changes. Keep dependencies minimal and focused.

**Incorrect (too many dependencies):**

```vue
<script setup>
import { reactive, computed } from 'vue'

const state = reactive({
  user: {
    name: 'John',
    email: 'john@example.com',
    preferences: { theme: 'dark', notifications: true },
    lastLogin: new Date(),
    sessionCount: 42
  }
})

// BAD: Depends on entire user object
// Recalculates when ANY user property changes
const greeting = computed(() => {
  return `Hello, ${state.user.name}!`
})
</script>
```

**Correct (minimal dependencies):**

```vue
<script setup>
import { reactive, computed } from 'vue'

const state = reactive({
  user: {
    name: 'John',
    email: 'john@example.com',
    preferences: { theme: 'dark', notifications: true },
    lastLogin: new Date(),
    sessionCount: 42
  }
})

// GOOD: Only depends on user.name
// Only recalculates when name changes
const greeting = computed(() => {
  return `Hello, ${state.user.name}!`
})
</script>
```

**Extract only needed properties:**

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref<Item[]>([...])

// BAD: Depends on entire items array
// Recalculates when ANY item changes
const expensiveComputed = computed(() => {
  return items.value.some(item => item.status === 'active')
})

// BETTER: Derive a simpler dependency first
const activeStatuses = computed(() => 
  items.value.map(item => item.status)
)

const hasActiveItem = computed(() =>
  activeStatuses.value.includes('active')
)
</script>
```

**Avoid computed chains with overlapping deps:**

```vue
<script setup>
import { ref, computed } from 'vue'

const data = ref({ a: 1, b: 2, c: 3 })

// BAD: Overlapping dependencies cause extra recalculations
const sumAB = computed(() => data.value.a + data.value.b)
const sumBC = computed(() => data.value.b + data.value.c)
const total = computed(() => sumAB.value + sumBC.value) // b counted twice

// BETTER: Direct calculation
const total = computed(() => 
  data.value.a + data.value.b + data.value.c
)
</script>
```

**Use separate refs for independent values:**

```vue
<script setup>
import { ref, computed } from 'vue'

// BAD: One reactive object
const form = reactive({
  name: '',
  email: '',
  message: ''
})

// Any change triggers this recompute
const isValid = computed(() => form.name && form.email)

// GOOD: Separate refs for truly independent values
const name = ref('')
const email = ref('')
const message = ref('')

// Only depends on name and email, not message
const isValid = computed(() => name.value && email.value)
</script>
```

Reference: [Computed Best Practices](https://vuejs.org/guide/essentials/computed.html#best-practices)
