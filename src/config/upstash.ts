import { Client } from "@upstash/workflow";

export const workFlowClient = new Client({
  baseUrl: process.env.QSTASH_URL_DEV,
  token: process.env.QSTASH_TOKEN_DEV,
});
