import type { PropType } from 'vue';
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
  () => import('vue').VNode<
    import('vue').RendererNode,
    import('vue').RendererElement,
    {
      [key: string]: any;
    }
  >,
  unknown,
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  import('vue').EmitsOptions,
  'detected-condition',
  import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps,
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
