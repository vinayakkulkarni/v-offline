---
title: Use defineAsyncComponent for Heavy Components
impact: CRITICAL
impactDescription: Reduces initial bundle size, improves load time
tags: component, async, lazy-loading, code-splitting
---

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
