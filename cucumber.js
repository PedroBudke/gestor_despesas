process.env.TS_NODE_PROJECT = "./tsconfig.cucumber.json";

module.exports = {
  default: {
    paths: ["playwright/features/**/*.feature"],
    require: [
      "playwright/support/world.ts",
      "playwright/support/hooks.ts",
      "playwright/steps/**/*.ts",
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:playwright-report/cucumber-report.html",
    ],
    publishQuiet: true,
  },
};
