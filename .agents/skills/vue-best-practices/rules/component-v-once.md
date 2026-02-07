---
title: Use v-once for Static Content
impact: CRITICAL
impactDescription: Eliminates re-render cost for static elements
tags: component, v-once, static, performance
---

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
