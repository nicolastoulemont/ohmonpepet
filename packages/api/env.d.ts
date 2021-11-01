declare namespace NodeJS {
  interface ProcessEnv {
    TS_NODE_PROJECT: string;
    NODE_ENV: string;
    PORT: string;
    CLIENT_APP_URL: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
    DOMAIN_URL: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    TOKEN_SECRET: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    S3_BUCKET_DEV: string;
    S3_BUCKET_PROD: string;
    ALGOLIA_APP_ID: string;
    ALGOLIA_API_KEY: string;
  }
}