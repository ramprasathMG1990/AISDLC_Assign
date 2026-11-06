import { test, expect } from "@playwright/test";
for(const width of [320,768,1440]){
 test(`dashboard layout at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto("/");
  await expect(page.getByRole("heading",{name:"User Story Dashboard"})).toBeVisible();
 });
}
