import { onBeforeUnmount, onMounted, ref } from 'vue';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

function readPreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'system';
}

export function useTheme() {
  const preference = ref<ThemePreference>('system');
  const isDark = ref(false);
  let media: MediaQueryList | undefined;

  function apply(): void {
    const dark =
      preference.value === 'dark' ||
      (preference.value === 'system' && media?.matches === true);
    isDark.value = dark;
    document.documentElement.classList.toggle('dark', dark);
  }

  function setPreference(next: ThemePreference): void {
    preference.value = next;
    localStorage.setItem(STORAGE_KEY, next);
    apply();
  }

  onMounted(() => {
    media = matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', apply);
    preference.value = readPreference();
    apply();
  });

  onBeforeUnmount(() => {
    media?.removeEventListener('change', apply);
  });

  return { preference, isDark, setPreference };
}
