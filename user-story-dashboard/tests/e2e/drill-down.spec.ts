import { test, expect } from "@playwright/test";
test("dashboard filter and drill-down journey", async ({ page }) => {
 await page.goto("/");
 await expect(page.getByRole("heading", { name: "User Story Dashboard" })).toBeVisible();
 await page.getByRole("button", { name: "Clear filters" }).click();
 await page.getByRole("button", { name: "Load filtered stories" }).click();
 await expect(page.getByRole("region", { name: "Matching stories" })).toBeVisible();
});
