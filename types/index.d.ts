import Vue, { VueConstructor } from 'vue';

export type VOfflineProps = {
  slotName?: string;
  onlineClass?: string;
  offlineClass?: string;
  pingUrl?: string;
};

export const VOffline: VueConstructor<Vue>;
