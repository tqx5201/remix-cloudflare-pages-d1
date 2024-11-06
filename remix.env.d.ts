/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />
interface Env extends z.infer<typeof serverSchema> {
    QINIU_ACCESS_KEY: string;
    QINIU_SECRET_KEY: string;
  }
