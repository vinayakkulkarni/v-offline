declare module '*.vue' {
  import type { App, DefineComponent, Plugin } from 'vue';
  const component: DefineComponent<{}, {}, any> & {
    install(app: App): Exclude<Plugin['install'], undefined>;
  };
  export default component;
}
