import type { ComputedRef, PropType } from 'vue';
declare const _default: import('vue').DefineComponent<
  {
    onlineClass: {
      type: PropType<string>;
      required: false;
      default: string;
    };
    offlineClass: {
      type: PropType<string>;
      required: false;
      default: string;
    };
    pingUrl: {
      type: PropType<string>;
      required: false;
      default: string;
    };
  },
  {
    wrapperClass: ComputedRef<string>;
  },
  {},
  {},
  {},
  import('vue/types/v3-component-options').ComponentOptionsMixin,
  import('vue/types/v3-component-options').ComponentOptionsMixin,
  {},
  string,
  Readonly<
    import('vue').ExtractPropTypes<{
      onlineClass: {
        type: PropType<string>;
        required: false;
        default: string;
      };
      offlineClass: {
        type: PropType<string>;
        required: false;
        default: string;
      };
      pingUrl: {
        type: PropType<string>;
        required: false;
        default: string;
      };
    }>
  >,
  {
    onlineClass: string;
    offlineClass: string;
    pingUrl: string;
  }
>;
export default _default;
