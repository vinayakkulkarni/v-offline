import {
  AllowedComponentProps,
  ComponentCustomProps,
  DefineComponent,
  VNodeProps,
} from 'vue';

export interface VOfflineProps {
  onlineClass?: string;
  offlineClass?: string;
  pingUrl?: string;
}

type VOfflineComponentProps = AllowedComponentProps &
  ComponentCustomProps &
  VNodeProps &
  VOfflineProps;

export const VOffline: DefineComponent<VOfflineComponentProps>;
