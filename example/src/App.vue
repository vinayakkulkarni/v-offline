<template>
  <SiteHeader />
  <main class="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
    <section
      class="grid gap-10 border-b border-line pb-12 pt-6 lg:grid-cols-[1.25fr_1fr] lg:gap-14 lg:pt-12"
    >
      <div class="min-w-0">
        <p class="font-mono text-xs uppercase tracking-wider text-muted">
          Your connection, detected by &lt;VOffline&gt;
        </p>
        <VOffline
          :key="pingUrl"
          :ping-url="pingUrl"
          online-class="text-online"
          offline-class="text-signal"
          @detected-condition="onDetected"
        >
          <p
            class="mt-2 font-black leading-[0.85] tracking-tight text-[clamp(4rem,17vw,11rem)]"
            aria-live="polite"
          >
            {{ online ? 'online' : 'offline' }}
          </p>
        </VOffline>
        <p class="mt-6 max-w-xl text-lg font-light leading-relaxed text-muted">
          A Vue 3 component that listens to the browser's
          <code class="font-mono text-base text-ink">online</code> and
          <code class="font-mono text-base text-ink">offline</code> events, then
          pings a URL to confirm the network really works.
        </p>
        <div class="mt-8">
          <InstallCommand />
        </div>
      </div>

      <div class="flex min-w-0 flex-col gap-5">
        <fieldset class="rounded-md border border-line bg-surface p-4">
          <legend
            class="px-1 font-mono text-xs uppercase tracking-wider text-muted"
          >
            ping-url
          </legend>
          <div class="flex flex-col gap-1.5">
            <label
              v-for="target in targets"
              :key="target.url"
              class="flex cursor-pointer items-center gap-3 rounded px-2 py-2 text-sm hover:bg-sunken"
            >
              <input
                v-model="pingUrl"
                type="radio"
                name="ping-url"
                :value="target.url"
                class="accent-signal"
                @change="
                  track('Demo Interaction', {
                    action: 'ping-url',
                    target: target.label,
                  })
                "
              />
              <span class="font-mono">{{ target.label }}</span>
              <span class="ml-auto text-xs text-muted">{{ target.note }}</span>
            </label>
          </div>
          <button
            type="button"
            class="mt-4 w-full rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-signal-ink transition-opacity hover:opacity-90"
            @click="runCheck"
          >
            Run check
          </button>
          <p class="mt-3 text-xs leading-relaxed text-muted">
            The button fires an <code class="font-mono">online</code> event. To
            see a real change, turn off your network or set DevTools to Offline.
          </p>
        </fieldset>
        <EventLog :entries="entries" />
      </div>
    </section>

    <section class="pt-12">
      <UsageSnippet :ping-url="pingUrl" />
    </section>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { VOffline } from 'v-offline';
  import { track } from './analytics';
  import EventLog from './components/EventLog.vue';
  import type { LogEntry } from './components/EventLog.vue';
  import InstallCommand from './components/InstallCommand.vue';
  import SiteHeader from './components/SiteHeader.vue';
  import UsageSnippet from './components/UsageSnippet.vue';

  const targets = [
    { label: 'google.com', url: 'https://google.com', note: 'default' },
    { label: 'cloudflare.com', url: 'https://www.cloudflare.com', note: '' },
    {
      label: 'unreachable.invalid',
      url: 'https://unreachable.invalid',
      note: 'always fails',
    },
  ];

  const pingUrl = ref(targets[0].url);
  const online = ref(navigator.onLine);
  const entries = ref<LogEntry[]>([]);
  let nextId = 0;

  function onDetected(isOnline: boolean): void {
    online.value = isOnline;
    nextId += 1;
    entries.value = [
      {
        id: nextId,
        time: new Date().toLocaleTimeString(),
        online: isOnline,
        url: pingUrl.value,
      },
      ...entries.value,
    ].slice(0, 50);
  }

  function runCheck(): void {
    window.dispatchEvent(new Event('online'));
    track('Demo Interaction', { action: 'run-check' });
  }
</script>
