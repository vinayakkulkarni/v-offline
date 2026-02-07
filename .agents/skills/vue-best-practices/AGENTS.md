# Vue Best Practices - Complete Reference

> This file is auto-generated. Do not edit directly.
> Edit individual rule files in the `rules/` directory and run `bun run build`.

# Vue Best Practices

Comprehensive performance optimization guide for Vue.js applications. Contains 40+ rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new Vue components
- Implementing reactive state and computed properties
- Reviewing code for performance issues
- Refactoring existing Vue code
- Optimizing rendering and re-renders
- Working with Composition API or Options API

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Reactivity Fundamentals | CRITICAL | `reactivity-` |
| 2 | Component Performance | CRITICAL | `component-` |
| 3 | Computed & Watchers | HIGH | `computed-` |
| 4 | Template Optimization | MEDIUM-HIGH | `template-` |
| 5 | Composition API Patterns | MEDIUM | `composable-` |
| 6 | State Management | MEDIUM | `state-` |
| 7 | Async & Data Fetching | LOW-MEDIUM | `async-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Reactivity Fundamentals (CRITICAL)

- `reactivity-ref-vs-reactive` - Use ref() for primitives, reactive() for objects
- `reactivity-avoid-destructure` - Don't destructure reactive objects
- `reactivity-toRefs` - Use toRefs() when destructuring is needed
- `reactivity-shallowRef` - Use shallowRef() for large non-reactive data
- `reactivity-raw-values` - Use toRaw() for read-only operations on large data

### 2. Component Performance (CRITICAL)

- `component-v-once` - Use v-once for static content
- `component-v-memo` - Use v-memo for expensive list items
- `component-async` - Use defineAsyncComponent for heavy components
- `component-keep-alive` - Cache component state with KeepAlive
- `component-functional` - Prefer functional components for stateless UI

### 3. Computed & Watchers (HIGH)

- `computed-cache` - Use computed() for derived values, not methods
- `computed-getter-only` - Avoid setters in computed when possible
- `computed-dependencies` - Minimize computed dependencies
- `watch-immediate` - Avoid immediate watchers, use computed instead
- `watch-deep-avoid` - Avoid deep watchers on large objects
- `watch-cleanup` - Always cleanup async watchers

### 4. Template Optimization (MEDIUM-HIGH)

- `template-v-show-vs-if` - v-show for frequent toggles, v-if for rare
- `template-key-attribute` - Always use unique keys in v-for
- `template-avoid-v-if-v-for` - Never use v-if and v-for on same element
- `template-static-hoisting` - Let compiler hoist static content
- `template-event-modifiers` - Use event modifiers instead of JS handlers

### 5. Composition API Patterns (MEDIUM)

- `composable-single-responsibility` - One concern per composable
- `composable-return-refs` - Return refs, not reactive objects
- `composable-cleanup` - Handle cleanup in composables
- `composable-lazy-init` - Lazy initialize expensive resources
- `composable-provide-inject` - Use provide/inject for deep prop drilling

### 6. State Management (MEDIUM)

- `state-pinia-stores` - Split stores by domain
- `state-getters` - Use getters for computed state
- `state-actions-mutations` - Keep mutations simple, logic in actions
- `state-subscription-cleanup` - Cleanup store subscriptions

### 7. Async & Data Fetching (LOW-MEDIUM)

- `async-suspense` - Use Suspense for async component loading
- `async-error-boundaries` - Handle async errors gracefully
- `async-stale-while-revalidate` - Implement SWR pattern for data fetching
- `async-abort-controller` - Cancel pending requests on unmount

### 8. Advanced Patterns (LOW)

- `advanced-custom-directives` - Create directives for DOM manipulation
- `advanced-render-functions` - Use render functions for dynamic templates
- `advanced-teleport` - Use Teleport for modals and overlays
- `advanced-transition-groups` - Optimize list transitions

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/reactivity-ref-vs-reactive.md
rules/component-v-memo.md
rules/_sections.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`

---

# Detailed Rules

### Use defineAsyncComponent for Heavy Components

**Impact:** CRITICAL - Reduces initial bundle size, improves load time

## Use defineAsyncComponent for Heavy Components

Heavy components that aren't needed immediately should be loaded asynchronously to reduce initial bundle size.

**Incorrect (everything in main bundle):**

```vue
<script setup>
// BAD: All components loaded upfront
import HeavyChart from './HeavyChart.vue'
import RichTextEditor from './RichTextEditor.vue'
import DataGrid from './DataGrid.vue'
import PdfViewer from './PdfViewer.vue'
</script>

<template>
  <div>
    <HeavyChart v-if="showChart" :data="chartData" />
    <RichTextEditor v-if="showEditor" v-model="content" />
    <DataGrid v-if="showGrid" :rows="rows" />
    <PdfViewer v-if="showPdf" :url="pdfUrl" />
  </div>
</template>
```

**Correct (lazy load heavy components):**

```vue
<script setup>
import { defineAsyncComponent, ref } from 'vue'

// Lazy load - only fetched when rendered
const HeavyChart = defineAsyncComponent(() => 
  import('./HeavyChart.vue')
)

const RichTextEditor = defineAsyncComponent(() => 
  import('./RichTextEditor.vue')
)

const DataGrid = defineAsyncComponent(() => 
  import('./DataGrid.vue')
)

const PdfViewer = defineAsyncComponent(() => 
  import('./PdfViewer.vue')
)
</script>

<template>
  <div>
    <HeavyChart v-if="showChart" :data="chartData" />
    <RichTextEditor v-if="showEditor" v-model="content" />
    <DataGrid v-if="showGrid" :rows="rows" />
    <PdfViewer v-if="showPdf" :url="pdfUrl" />
  </div>
</template>
```

**With loading and error states:**

```vue
<script setup>
import { defineAsyncComponent } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorDisplay from './ErrorDisplay.vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200, // Show loading after 200ms
  timeout: 10000 // Timeout after 10s
})
</script>
```

**With Suspense (Vue 3.3+):**

```vue
<template>
  <Suspense>
    <template #default>
      <HeavyChart :data="chartData" />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() => 
  import('./HeavyChart.vue')
)
</script>
```

**Route-level code splitting (Vue Router):**

```typescript
// router/index.ts
const routes = [
  {
    path: '/dashboard',
    // Lazy load entire route
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/analytics',
    component: () => import('@/views/Analytics.vue'),
    // Webpack magic comment for chunk naming
    // component: () => import(/* webpackChunkName: "analytics" */ '@/views/Analytics.vue')
  }
]
```

**When to use async components:**

| Component Type | Async Load? |
|---------------|-------------|
| Heavy charting libraries (Chart.js, ECharts) | Yes |
| Rich text editors (TipTap, Quill) | Yes |
| PDF viewers | Yes |
| Code editors (Monaco, CodeMirror) | Yes |
| Modal content rarely opened | Yes |
| Core layout components | No |
| Small utility components | No |

Reference: [Async Components](https://vuejs.org/guide/components/async.html)

---

### Use Functional Approach for Stateless Components

**Impact:** MEDIUM - Slightly faster render, clearer intent

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

---

### Cache Component State with KeepAlive

**Impact:** HIGH - Preserves state, avoids expensive re-initialization

## Cache Component State with KeepAlive

Use `<KeepAlive>` to cache component instances when switching between them, preserving their state and avoiding expensive re-mounting.

**Incorrect (state lost on switch):**

```vue
<template>
  <div>
    <button @click="currentTab = 'search'">Search</button>
    <button @click="currentTab = 'results'">Results</button>
    
    <!-- Component destroyed and recreated on each switch -->
    <SearchForm v-if="currentTab === 'search'" />
    <ResultsTable v-if="currentTab === 'results'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('search')
// User's search input is lost when switching tabs!
</script>
```

**Correct (state preserved with KeepAlive):**

```vue
<template>
  <div>
    <button @click="currentTab = 'search'">Search</button>
    <button @click="currentTab = 'results'">Results</button>
    
    <!-- Components cached, state preserved -->
    <KeepAlive>
      <component :is="currentTabComponent" />
    </KeepAlive>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue'
import SearchForm from './SearchForm.vue'
import ResultsTable from './ResultsTable.vue'

const currentTab = ref('search')

const tabs = {
  search: SearchForm,
  results: ResultsTable
}

const currentTabComponent = computed(() => tabs[currentTab.value])
</script>
```

**Include/exclude specific components:**

```vue
<template>
  <!-- Only cache these components -->
  <KeepAlive include="SearchForm,ResultsTable">
    <component :is="currentView" />
  </KeepAlive>
  
  <!-- Cache all except these -->
  <KeepAlive exclude="HeavyComponent">
    <component :is="currentView" />
  </KeepAlive>
  
  <!-- Using regex -->
  <KeepAlive :include="/Form$/">
    <component :is="currentView" />
  </KeepAlive>
</template>
```

**Limit cached instances:**

```vue
<template>
  <!-- Only keep last 5 components in cache -->
  <KeepAlive :max="5">
    <component :is="currentView" />
  </KeepAlive>
</template>
```

**Lifecycle hooks for cached components:**

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

// Called when component is inserted from cache
onActivated(() => {
  console.log('Component activated from cache')
  // Refresh data if needed
  fetchLatestData()
})

// Called when component is removed to cache
onDeactivated(() => {
  console.log('Component deactivated to cache')
  // Cleanup if needed
  pauseVideoPlayback()
})
</script>
```

**With Vue Router:**

```vue
<!-- App.vue -->
<template>
  <router-view v-slot="{ Component }">
    <KeepAlive :include="['SearchView', 'DashboardView']">
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>
```

**When to use KeepAlive:**

| Scenario | Use KeepAlive? |
|----------|---------------|
| Tab-based navigation with forms | Yes |
| Wizard/stepper with user input | Yes |
| Dashboard with expensive charts | Yes |
| List → Detail → Back to list | Yes |
| Simple static content pages | No |
| Components with real-time data that must refresh | Maybe (use onActivated) |

Reference: [KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)

---

### Use v-memo for Expensive List Items

**Impact:** CRITICAL - Skip re-renders for unchanged items in large lists

## Use v-memo for Expensive List Items

For large lists where each item is expensive to render, use `v-memo` to skip re-rendering items when their dependencies haven't changed.

**Incorrect (all items re-render):**

```vue
<template>
  <!-- Every item re-renders when ANY item changes -->
  <div class="item-list">
    <div
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="selectedId = item.id"
    >
      <ExpensiveItemCard :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref(generateLargeList(1000))
const selectedId = ref(null)
</script>
```

**Correct (only changed items re-render):**

```vue
<template>
  <div class="item-list">
    <!-- v-memo: only re-render when these deps change -->
    <div
      v-for="item in items"
      :key="item.id"
      v-memo="[item.id === selectedId, item.updatedAt]"
      :class="{ selected: item.id === selectedId }"
      @click="selectedId = item.id"
    >
      <ExpensiveItemCard :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref(generateLargeList(1000))
const selectedId = ref(null)
</script>
```

**How v-memo works:**

```vue
<template>
  <!-- v-memo takes an array of dependencies -->
  <!-- Re-render ONLY when any value in the array changes -->
  <div v-memo="[dep1, dep2, dep3]">
    <!-- Expensive content -->
  </div>
</template>
```

**Real-world example - data table:**

```vue
<template>
  <table>
    <tbody>
      <tr
        v-for="row in rows"
        :key="row.id"
        v-memo="[row.id === selectedRow, row.version]"
        :class="{ selected: row.id === selectedRow }"
        @click="selectedRow = row.id"
      >
        <td>{{ row.name }}</td>
        <td>{{ formatDate(row.createdAt) }}</td>
        <td>{{ formatCurrency(row.amount) }}</td>
        <td>
          <StatusBadge :status="row.status" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

**v-memo with empty array = v-once:**

```vue
<template>
  <!-- Equivalent to v-once -->
  <div v-memo="[]">
    Static content that never updates
  </div>
</template>
```

**When to use v-memo:**

| Scenario | Use v-memo? |
|----------|------------|
| List with 100+ items | Yes |
| Items have expensive child components | Yes |
| Selection state changes frequently | Yes |
| Simple text-only items | Probably not |
| Small lists (< 50 items) | Usually not |

**Pitfall - forgetting dependencies:**

```vue
<template>
  <!-- BAD: Missing item.name as dependency -->
  <div v-memo="[item.id === selectedId]">
    {{ item.name }} <!-- Won't update if name changes! -->
  </div>
  
  <!-- GOOD: Include all reactive dependencies -->
  <div v-memo="[item.id === selectedId, item.name]">
    {{ item.name }}
  </div>
</template>
```

Reference: [v-memo](https://vuejs.org/api/built-in-directives.html#v-memo)

---

### Use v-once for Static Content

**Impact:** CRITICAL - Eliminates re-render cost for static elements

## Use v-once for Static Content

Content that never changes after initial render should use `v-once` to skip all future update checks.

**Incorrect (re-evaluated every render):**

```vue
<template>
  <div>
    <!-- This header is checked every re-render even though it never changes -->
    <header>
      <h1>{{ appTitle }}</h1>
      <p>Welcome to our application</p>
    </header>
    
    <!-- Dynamic content below -->
    <main>
      <component :is="currentView" />
    </main>
  </div>
</template>

<script setup>
const appTitle = 'My App' // Never changes
</script>
```

**Correct (skips updates with v-once):**

```vue
<template>
  <div>
    <!-- v-once: render once, never diff again -->
    <header v-once>
      <h1>{{ appTitle }}</h1>
      <p>Welcome to our application</p>
    </header>
    
    <!-- Dynamic content still updates -->
    <main>
      <component :is="currentView" />
    </main>
  </div>
</template>

<script setup>
const appTitle = 'My App'
</script>
```

**Good use cases for v-once:**

```vue
<template>
  <!-- Static terms of service -->
  <div v-once class="terms-of-service">
    <h2>Terms of Service</h2>
    <p>Long static content...</p>
  </div>
  
  <!-- Static table headers -->
  <thead v-once>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  
  <!-- Static navigation that never changes -->
  <nav v-once>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</template>
```

**When NOT to use v-once:**

```vue
<template>
  <!-- DON'T: Content that might change -->
  <div v-once>
    <p>{{ userName }}</p> <!-- If userName can change, don't use v-once -->
  </div>
  
  <!-- DON'T: Elements with dynamic bindings -->
  <button v-once :disabled="isLoading">Submit</button>
  
  <!-- DON'T: Elements with event handlers that depend on changing state -->
  <button v-once @click="handleClick">Click</button>
</template>
```

**v-once with slots:**

```vue
<!-- Parent component -->
<template>
  <Card>
    <template #header v-once>
      <h2>Static Header</h2>
    </template>
    <template #content>
      <p>{{ dynamicContent }}</p>
    </template>
  </Card>
</template>
```

Reference: [v-once](https://vuejs.org/api/built-in-directives.html#v-once)

---

### Return Refs from Composables, Not Reactive Objects

**Impact:** MEDIUM - Enables destructuring while maintaining reactivity

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

---

### One Concern per Composable

**Impact:** MEDIUM - Better reusability, testability, and maintainability

## One Concern per Composable

Each composable should handle a single, focused concern. This makes them reusable, testable, and maintainable.

**Incorrect (multiple concerns in one composable):**

```typescript
// composables/useUser.ts
export function useUser() {
  // User state
  const user = ref(null)
  const isLoading = ref(false)
  
  // Authentication (different concern!)
  const isAuthenticated = computed(() => !!user.value)
  async function login(credentials) { /* ... */ }
  async function logout() { /* ... */ }
  
  // User preferences (different concern!)
  const theme = ref('light')
  const language = ref('en')
  function setTheme(t) { theme.value = t }
  
  // User notifications (different concern!)
  const notifications = ref([])
  function addNotification(n) { /* ... */ }
  function clearNotifications() { /* ... */ }
  
  // This composable does too many things!
  return {
    user, isLoading, isAuthenticated,
    login, logout,
    theme, language, setTheme,
    notifications, addNotification, clearNotifications
  }
}
```

**Correct (separate composables):**

```typescript
// composables/useAuth.ts
export function useAuth() {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  
  async function login(credentials: Credentials) {
    const response = await authApi.login(credentials)
    user.value = response.user
  }
  
  async function logout() {
    await authApi.logout()
    user.value = null
  }
  
  return { user, isAuthenticated, login, logout }
}
```

```typescript
// composables/useUserPreferences.ts
export function useUserPreferences() {
  const theme = ref<'light' | 'dark'>('light')
  const language = ref('en')
  
  function setTheme(newTheme: 'light' | 'dark') {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }
  
  function loadPreferences() {
    theme.value = localStorage.getItem('theme') as 'light' | 'dark' || 'light'
    language.value = localStorage.getItem('language') || 'en'
  }
  
  return { theme, language, setTheme, loadPreferences }
}
```

```typescript
// composables/useNotifications.ts
export function useNotifications() {
  const notifications = ref<Notification[]>([])
  
  function add(notification: Notification) {
    notifications.value.push({
      ...notification,
      id: Date.now()
    })
  }
  
  function remove(id: number) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }
  
  function clear() {
    notifications.value = []
  }
  
  return { notifications, add, remove, clear }
}
```

**Compose composables in components:**

```vue
<script setup>
import { useAuth } from '@/composables/useAuth'
import { useUserPreferences } from '@/composables/useUserPreferences'
import { useNotifications } from '@/composables/useNotifications'

const { user, isAuthenticated, logout } = useAuth()
const { theme, setTheme } = useUserPreferences()
const { notifications, add: addNotification } = useNotifications()
</script>
```

**Higher-order composables for cross-cutting concerns:**

```typescript
// composables/useAsyncState.ts
export function useAsyncState<T>(
  asyncFn: () => Promise<T>,
  initialState: T
) {
  const state = ref<T>(initialState)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  
  async function execute() {
    isLoading.value = true
    error.value = null
    try {
      state.value = await asyncFn()
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  }
  
  return { state, isLoading, error, execute }
}

// Usage
const { state: users, isLoading, execute: loadUsers } = useAsyncState(
  () => api.fetchUsers(),
  []
)
```

Reference: [Composables](https://vuejs.org/guide/reusability/composables.html)

---

### Use computed() for Derived Values, Not Methods

**Impact:** HIGH - Cached results, avoids redundant calculations

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

---

### Minimize Computed Dependencies

**Impact:** HIGH - Reduces unnecessary recalculations

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

---

### Don't Destructure Reactive Objects

**Impact:** CRITICAL - Prevents silent reactivity loss

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

---

### Use toRaw() for Read-Only Operations on Large Data

**Impact:** HIGH - Avoids proxy overhead in tight loops

## Use toRaw() for Read-Only Operations on Large Data

When performing read-only operations (filtering, searching, serialization) on large reactive data, use `toRaw()` to work with the underlying object directly, avoiding proxy overhead.

**Incorrect (proxy overhead in loops):**

```typescript
import { ref } from 'vue'

const items = ref<Item[]>(generateLargeDataset(10000))

function searchItems(query: string) {
  // BAD: Each access goes through reactive proxy
  return items.value.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  )
}

function serializeData() {
  // BAD: JSON.stringify with reactive proxy is slower
  return JSON.stringify(items.value)
}
```

**Correct (using toRaw):**

```typescript
import { ref, toRaw } from 'vue'

const items = ref<Item[]>(generateLargeDataset(10000))

function searchItems(query: string) {
  // Get raw array - no proxy overhead
  const rawItems = toRaw(items.value)
  return rawItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  )
}

function serializeData() {
  // Much faster serialization
  return JSON.stringify(toRaw(items.value))
}
```

**When to use toRaw:**

| Scenario | Use toRaw? |
|----------|------------|
| Iterating over large arrays (1000+ items) | Yes |
| JSON serialization | Yes |
| Passing to external libraries that don't need reactivity | Yes |
| Comparison operations | Yes |
| Modifying data (need reactivity to trigger) | No |

**Performance-critical search example:**

```typescript
import { ref, toRaw, computed } from 'vue'

const allProducts = ref<Product[]>([])
const searchQuery = ref('')

// Use toRaw in computed for large datasets
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return allProducts.value
  
  // Use raw data for filtering
  const raw = toRaw(allProducts.value)
  return raw.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  )
})
```

**Sending to Web Workers:**

```typescript
import { toRaw } from 'vue'

const data = ref(complexData)

// Web Workers can't handle reactive proxies
worker.postMessage(toRaw(data.value))
```

**Note:** The returned value from `toRaw()` should be treated as read-only. Mutating it won't trigger reactivity updates.

Reference: [toRaw](https://vuejs.org/api/reactivity-advanced.html#toraw)

---

### Use ref() for Primitives, reactive() for Objects

**Impact:** CRITICAL - Prevents reactivity loss and unexpected bugs

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

---

### Use shallowRef() for Large Non-Reactive Data

**Impact:** CRITICAL - 10-100× faster for large datasets

## Use shallowRef() for Large Non-Reactive Data

When storing large objects or arrays where you only need to track replacement (not deep mutations), use `shallowRef()` to avoid the overhead of deep reactivity.

**Incorrect (unnecessary deep reactivity):**

```typescript
import { ref } from 'vue'

// BAD: Vue makes every nested property reactive
// For 10,000 items, this creates 10,000+ reactive proxies
const largeDataset = ref<DataItem[]>([])

async function fetchData() {
  const response = await fetch('/api/data')
  // Every property of every item becomes reactive
  largeDataset.value = await response.json()
}
```

**Correct (shallow reactivity):**

```typescript
import { shallowRef, triggerRef } from 'vue'

// Only the .value assignment is tracked, not nested mutations
const largeDataset = shallowRef<DataItem[]>([])

async function fetchData() {
  const response = await fetch('/api/data')
  // Fast: just replaces the value, no deep proxy creation
  largeDataset.value = await response.json()
}

// If you need to mutate and trigger update:
function updateItem(index: number, newData: Partial<DataItem>) {
  largeDataset.value[index] = { ...largeDataset.value[index], ...newData }
  triggerRef(largeDataset) // Manually trigger reactivity
}
```

**When to use shallowRef:**

| Scenario | Use |
|----------|-----|
| Large arrays from API (100+ items) | `shallowRef` |
| Complex nested objects you replace wholesale | `shallowRef` |
| Data that's read-only in the view | `shallowRef` |
| Objects with methods/class instances | `shallowRef` |
| Small reactive objects you mutate | `ref` or `reactive` |

**shallowReactive for objects:**

```typescript
import { shallowReactive } from 'vue'

// Only top-level properties are reactive
const state = shallowReactive({
  user: { name: 'John', email: 'john@example.com' },
  settings: { theme: 'dark' }
})

// This triggers updates
state.user = { name: 'Jane', email: 'jane@example.com' }

// This does NOT trigger updates (nested mutation)
state.user.name = 'Jane' // Won't cause re-render!
```

**Performance comparison:**

```typescript
// With ref() - 10,000 items
// ~50-100ms to make reactive

// With shallowRef() - 10,000 items  
// ~1-2ms (just stores the reference)
```

Reference: [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)

---

### Use toRefs() When Destructuring is Needed

**Impact:** CRITICAL - Maintains reactivity while enabling destructuring

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

---

### Never Use v-if and v-for on Same Element

**Impact:** MEDIUM-HIGH - Prevents hidden performance issues and confusion

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

---

### Always Use Unique Keys in v-for

**Impact:** MEDIUM-HIGH - Enables efficient list updates, prevents bugs

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

---

### v-show for Frequent Toggles, v-if for Rare

**Impact:** MEDIUM-HIGH - Reduces DOM thrashing for frequent toggles

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

---

### Avoid Deep Watchers on Large Objects

**Impact:** HIGH - Prevents expensive deep comparison on every change

## Avoid Deep Watchers on Large Objects

Deep watchers traverse entire object trees on every change. For large objects, this is expensive and often unnecessary.

**Incorrect (deep watch on large object):**

```vue
<script setup>
import { reactive, watch } from 'vue'

const state = reactive({
  users: [], // Could be 1000+ users
  settings: { /* nested settings */ },
  cache: { /* large cache object */ }
})

// BAD: Deep traverses entire state tree on ANY change
watch(
  () => state,
  (newState) => {
    console.log('State changed')
    saveToLocalStorage(newState)
  },
  { deep: true }
)
</script>
```

**Correct (watch specific properties):**

```vue
<script setup>
import { reactive, watch } from 'vue'

const state = reactive({
  users: [],
  settings: { theme: 'dark', language: 'en' },
  cache: {}
})

// GOOD: Watch only what you need
watch(
  () => state.settings.theme,
  (newTheme) => {
    document.body.className = newTheme
  }
)

// GOOD: Watch multiple specific properties
watch(
  () => [state.settings.theme, state.settings.language],
  ([theme, language]) => {
    updateUIPreferences(theme, language)
  }
)
</script>
```

**If you must watch an object, use getter:**

```vue
<script setup>
import { reactive, watch } from 'vue'

const user = reactive({
  name: 'John',
  email: 'john@example.com',
  profile: {
    avatar: 'url',
    bio: 'text'
  }
})

// Watch for object replacement (shallow)
watch(
  () => user.profile,
  (newProfile) => {
    // Only triggers when profile is replaced entirely
    saveProfile(newProfile)
  }
)

// If you need deep but only for profile
watch(
  () => user.profile,
  (newProfile) => {
    saveProfile(newProfile)
  },
  { deep: true } // Deep only on profile, not entire user
)
</script>
```

**Use watchEffect for reactive tracking:**

```vue
<script setup>
import { reactive, watchEffect } from 'vue'

const settings = reactive({
  theme: 'dark',
  fontSize: 14,
  language: 'en'
})

// Automatically tracks only accessed properties
watchEffect(() => {
  // Only re-runs when theme or fontSize changes
  // NOT when language changes (not accessed here)
  document.body.style.fontSize = `${settings.fontSize}px`
  document.body.className = settings.theme
})
</script>
```

**Alternative: Derive a watched value:**

```vue
<script setup>
import { reactive, computed, watch } from 'vue'

const items = reactive([/* large array */])

// Compute a simple value to watch
const itemCount = computed(() => items.length)
const hasActiveItem = computed(() => 
  items.some(item => item.active)
)

// Watch the simple computed value
watch(itemCount, (count) => {
  console.log(`Item count changed to ${count}`)
})

watch(hasActiveItem, (hasActive) => {
  if (hasActive) notifyUser()
})
</script>
```

**When deep watch is acceptable:**

| Scenario | Use deep? |
|----------|-----------|
| Small config object (< 20 properties) | OK |
| User preferences | OK |
| Form state | Consider splitting |
| Large arrays | No - watch length or computed |
| API response cache | No |

Reference: [Watchers](https://vuejs.org/guide/essentials/watchers.html)
