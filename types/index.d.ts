import Vue, { VueConstructor } from 'vue';

export type VOfflineProps = {
  onlineClass?: string;
  offlineClass?: string;
  pingUrl?: string;
};

export const VOffline: VueConstructor<Vue>;
