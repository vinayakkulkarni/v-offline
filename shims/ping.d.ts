declare module 'ping.js' {
  export type CallbackFunc = (err: boolean, ping: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type PingFunc = (source: string, cb?: CallbackFunc) => Promise<any>;
  export default class Ping {
    ping: PingFunc;
  }
}
