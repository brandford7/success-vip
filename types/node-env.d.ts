declare namespace NodeJS {
  export interface ProcessEnv {
    AUTH_KEYCLOAK_ID: string;
    AUTH_KEYCLOAK_SECRET: string;
    AUTH_KEYCLOAK_ISSUER: string;
  }
}
