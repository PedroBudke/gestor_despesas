import { test as base, createBdd } from "playwright-bdd";

export interface ApiResponse {
  status: number;
  body: Record<string, unknown>;
}

type CustomFixtures = {
  apiState: { response: ApiResponse | null };
};

export const test = base.extend<CustomFixtures>({
  apiState: async ({}, use) => {
    await use({ response: null });
  },
});

export const { Given, When, Then } = createBdd(test);
