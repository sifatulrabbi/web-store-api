export {};

declare global {
  namespace NodeJS {
    interface Config {
      PORT: number;
    }
  }
}
