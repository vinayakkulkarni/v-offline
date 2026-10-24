declare module 'ping.js' {
  export type CallbackFunc = (err: string | null, ping: number) => void;
  export type PingFunc = (source: string, cb?: CallbackFunc) => Promise<number>;
  export interface PingOptions {
    favicon?: string;
    timeout?: number;
    logError?: boolean;
  }
  export default class Ping {
    constructor(options?: PingOptions);
    ping: PingFunc;
  }
}
