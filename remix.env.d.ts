/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />
interface Env {
    QINIU_ACCESS_KEY: string;
    QINIU_SECRET_KEY: string;
  }
/// <reference types="remix-run/server" />


declare namespace NodeJS {
  interface ProcessEnv extends Env {}
}

declare module '@remix-run/node' {
  interface PlatformContext {
    env: Env;
  }
}

declare module '@remix-run/cloudflare' {
  interface PlatformContext {
    env: Env;
  }
}
