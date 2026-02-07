---
title: One Concern per Composable
impact: MEDIUM
impactDescription: Better reusability, testability, and maintainability
tags: composable, composition-api, architecture, reusability
---

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
