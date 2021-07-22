declare module '*.vue' {
  import Vue, { VueConstructor } from 'vue';
  const component: VueConstructor<Vue> & {
    install(app: VueConstructor<Vue>): void;
  };
  export default component;
}
