import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import type { Browser } from "@playwright/test";
import type { PlaywrightWorld } from "./world";

setDefaultTimeout(30_000);

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: true });
});

Before(async function (this: PlaywrightWorld) {
  this.browser = browser;
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: PlaywrightWorld) {
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async () => {
  await browser?.close();
});
