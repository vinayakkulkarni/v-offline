---
name: vue-best-practices
description: Vue.js performance optimization guidelines for building fast, maintainable applications. This skill should be used when writing, reviewing, or refactoring Vue.js code to ensure optimal performance patterns. Triggers on tasks involving Vue components, reactivity, Composition API, state management, or performance improvements.
license: MIT
metadata:
  author: vinayakkulkarni
  version: "1.0.0"
---

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
