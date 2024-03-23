import { test, expect } from "@playwright/test";

test.describe("price guide", () => {
  test("open price guide", async ({ page }) => {
    //Arrange
    const url = "https://www.tcgplayer.com/";

    //Act
    await page.goto(url);
    await page.getByRole("button", { name: "Allow All" }).click();
    await page.getByLabel("open mobile navigation menu").click();
    await page.locator("#mp-nav-mobile-drop").getByText("Pokémon").click();
    await page.getByRole("link", { name: "Price Guide" }).click();

    //Assert
    await expect(page.locator("text=Pokemon Price Guides")).toBeVisible();
  });

  test("search a set", async ({ page }) => {
    //Arrange
    const url = "https://www.tcgplayer.com/";

    //Act
    await page.goto(url);
    await page.getByRole("button", { name: "Allow All" }).click();
    await page.getByLabel("open mobile navigation menu").click();
    await page.locator("#mp-nav-mobile-drop").getByText("Pokémon").click();
    await page.getByRole("link", { name: "Price Guide" }).click();
    await page
      .locator(
        "div:nth-child(2) > .is-horizontal > .tcg-input-field__content > .tcg-input-autocomplete__combobox-container > .tcg-input-autocomplete__dropdown-toggle-button"
      )
      .click();
    await page.getByText("SWSH09: Brilliant Stars", { exact: true }).click();
    await page.getByRole("button", { name: "Go" }).click();

    //Assert
    await expect(
      page.locator("text=SWSH09: Brilliant Stars Price")
    ).toBeVisible();
  });
});
