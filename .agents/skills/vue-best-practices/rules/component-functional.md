---
title: Use Functional Approach for Stateless Components
impact: MEDIUM
impactDescription: Slightly faster render, clearer intent
tags: component, functional, stateless, performance
---

## Use Functional Approach for Stateless Components

For simple, stateless presentational components, keep them lightweight without unnecessary features.

**Note:** In Vue 3, all components are effectively optimized. The "functional" concept from Vue 2 is less relevant, but keeping components simple still matters.

**Overly complex for simple presentation:**

```vue
<!-- IconButton.vue -->
<template>
  <button :class="buttonClasses" @click="handleClick">
    <slot />
  </button>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'

const props = defineProps<{
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Unnecessary state for a simple button
const isHovered = ref(false)
const clickCount = ref(0)

// Unnecessary watcher
watch(() => props.variant, () => {
  console.log('variant changed')
})

// Unnecessary lifecycle
onMounted(() => {
  console.log('mounted')
})

const buttonClasses = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`
])

function handleClick(e: MouseEvent) {
  clickCount.value++
  emit('click', e)
}
</script>
```

**Correct (simple and focused):**

```vue
<!-- IconButton.vue -->
<template>
  <button 
    :class="['btn', `btn-${variant}`, `btn-${size}`]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
```

**Even simpler with defaults:**

```vue
<!-- IconButton.vue -->
<template>
  <button 
    :class="['btn', `btn-${variant}`, `btn-${size}`]"
  >
    <slot />
  </button>
</template>

<script setup>
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'primary',
  size: 'md'
})
</script>
```

**Render functions for highly dynamic components:**

```typescript
// For components with very dynamic rendering logic
import { h } from 'vue'

export default function DynamicHeading(props: { level: number }, { slots }) {
  return h(`h${props.level}`, slots.default?.())
}
```

**Using JSX/TSX for complex dynamic rendering:**

```tsx
// DynamicList.tsx
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    items: { type: Array, required: true },
    renderItem: { type: Function, required: true }
  },
  setup(props) {
    return () => (
      <ul>
        {props.items.map((item, index) => (
          <li key={index}>{props.renderItem(item)}</li>
        ))}
      </ul>
    )
  }
})
```

**Guidelines for simple components:**

| Feature | Include? |
|---------|----------|
| Props | Yes, if needed |
| Emits | Yes, if needed |
| computed() | Only if logic is complex |
| ref()/reactive() | Only if component needs internal state |
| watch() | Rarely - prefer computed |
| Lifecycle hooks | Only if truly needed |

Reference: [SFC Syntax](https://vuejs.org/api/sfc-spec.html)
