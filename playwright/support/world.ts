import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "@playwright/test";

export interface ApiResponse {
  status: number;
  body: Record<string, unknown>;
}

export class PlaywrightWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  apiResponse: ApiResponse | null = null;
  readonly baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(PlaywrightWorld);
