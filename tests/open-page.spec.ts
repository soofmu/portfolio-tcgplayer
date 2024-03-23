import { test, expect } from "@playwright/test";

test("open page", async ({ page }) => {
  //Arrange
  const url = "https://www.tcgplayer.com/";
  const expectedLatestSetsSubtitle = "Latest Sets";
  const expectedLatestSetsTitle = "New sets from your favorite games:";

  //Act
  await page.goto(url);

  //Assert
  await expect(
    page.locator(".homepage-content__latest__sets__subtitle")
  ).toHaveText(expectedLatestSetsSubtitle);
  await expect(
    page.locator(".homepage-content__latest__sets__title")
  ).toHaveText(expectedLatestSetsTitle);
});
