import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { h, nextTick } from 'vue';
import VOffline from './VOffline.vue';

const ping = vi.fn<(url: string) => Promise<number>>();

vi.mock('ping.js', () => ({
  default: class {
    ping(url: string): Promise<number> {
      return ping(url);
    }
  },
}));

function setNavigatorOnline(value: boolean): void {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    get: () => value,
  });
}

async function flush(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await nextTick();
}

describe('VOffline', () => {
  afterEach(() => {
    ping.mockReset();
    setNavigatorOnline(true);
  });

  it('renders the default slot inside the wrapper', () => {
    const wrapper = mount(VOffline, {
      slots: { default: () => h('span', 'content') },
    });
    expect(wrapper.find('span').text()).toBe('content');
    wrapper.unmount();
  });

  it('applies the online class while the browser is online', () => {
    setNavigatorOnline(true);
    const wrapper = mount(VOffline, {
      props: { onlineClass: 'is-online', offlineClass: 'is-offline' },
    });
    expect(wrapper.classes()).toContain('is-online');
    expect(wrapper.classes()).not.toContain('is-offline');
    wrapper.unmount();
  });

  it('applies the offline class while the browser is offline', () => {
    setNavigatorOnline(false);
    const wrapper = mount(VOffline, {
      props: { onlineClass: 'is-online', offlineClass: 'is-offline' },
    });
    expect(wrapper.classes()).toContain('is-offline');
    wrapper.unmount();
  });

  it('pings the configured url and emits true when the ping succeeds', async () => {
    ping.mockResolvedValue(42);
    const wrapper = mount(VOffline, {
      props: { pingUrl: 'https://example.com', onlineClass: 'is-online' },
    });
    window.dispatchEvent(new Event('online'));
    await flush();
    expect(ping).toHaveBeenCalledWith('https://example.com');
    expect(wrapper.emitted('detected-condition')).toEqual([[true]]);
    expect(wrapper.classes()).toContain('is-online');
    wrapper.unmount();
  });

  it('emits false and switches class when the ping fails offline', async () => {
    ping.mockRejectedValue(new Error('unreachable'));
    const wrapper = mount(VOffline, {
      props: { onlineClass: 'is-online', offlineClass: 'is-offline' },
    });
    setNavigatorOnline(false);
    window.dispatchEvent(new Event('offline'));
    await flush();
    expect(wrapper.emitted('detected-condition')).toEqual([[false]]);
    expect(wrapper.classes()).toContain('is-offline');
    wrapper.unmount();
  });

  it('removes its window listeners on unmount', async () => {
    ping.mockResolvedValue(1);
    const wrapper = mount(VOffline);
    wrapper.unmount();
    window.dispatchEvent(new Event('online'));
    await flush();
    expect(ping).not.toHaveBeenCalled();
  });
});
