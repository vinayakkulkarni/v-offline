declare module '*.vue' {
  import { defineComponent } from '@vue/composition-api';
  import Vue, { VueConstructor } from 'vue';
  const component: ReturnType<typeof defineComponent> & {
    install(app: VueConstructor<Vue>): void;
  };
  export default component;
}
