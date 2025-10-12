import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

const config = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    ...tsJestTransformCfg,
  },
  transformIgnorePatterns: [
    "/node_modules/(?!node-fetch|fetch-cookie)/"
  ]
};

export default config;