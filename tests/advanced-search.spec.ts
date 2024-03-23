import { test, expect } from "@playwright/test";

test.describe("advanced search", () => {
  test("open advanced search", async ({ page }) => {
    //Arrange
    const url = "https://www.tcgplayer.com/";

    //Act
    await page.goto(url);
    await page.getByRole("button", { name: "Allow All" }).click();
    await page.getByLabel("open mobile navigation menu").click();
    await page.locator("#mp-nav-mobile-drop").getByText("Pokémon").click();
    await page.getByRole("link", { name: "Advanced Search" }).click();

    //Assert
    await expect(page.locator("text=Pokemon Singles Search")).toBeVisible();
  });

  test.only("the most expensive card in a set", async ({ page }) => {
    //Arrange
    const url = "https://www.tcgplayer.com/";
    const expectedName =
      "Charizard V (Alternate Full Art) - SWSH09: Brilliant Stars (SWSH09)";

    //Act
    await page.goto(url);
    await page.getByRole("button", { name: "Allow All" }).click();
    await page.getByLabel("open mobile navigation menu").click();
    await page.locator("#mp-nav-mobile-drop").getByText("Pokémon").click();
    await page.getByRole("link", { name: "Advanced Search" }).click();
    await page
      .getByRole("link", { name: "Brilliant Stars", exact: true })
      .click();
    await page.getByTestId("showFilters").click();
    await page
      .locator("span")
      .filter({ hasText: "Cards206" })
      .locator("span")
      .nth(1)
      .click();
    await page.getByLabel("Close the filter menu").click();
    await page.getByRole("combobox", { name: "Best Match" }).click();
    await page.getByText("Price: High to Low").click();
    await page.getByTestId("product-card__image--0").click();

    //Assert
    await expect(page.locator(".product-details__name")).toHaveText(
      expectedName
    );
  });

  test("search for a card", async ({ page }) => {
    //Arrange
    const url = "https://www.tcgplayer.com/";
    const productName = "Charizard";
    const option1 = "Base Set (Shadowless)";
    const expectedName = "Charizard - Base Set (Shadowless) (BSS)";

    //Act
    await page.goto(url);
    await page.getByRole("button", { name: "Allow All" }).click();
    await page.getByLabel("open mobile navigation menu").click();
    await page.locator("#mp-nav-mobile-drop").getByText("Pokémon").click();
    await page.getByRole("link", { name: "Advanced Search" }).click();
    await page.locator("#ProductName").fill(productName);
    await page.locator("#SetName").selectOption(option1);
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.getByTestId("product-card__image--0").click();
    await page.getByTestId("lblProductDetailsProductName").click();

    //Assert
    await expect(page.locator(".product-details__name")).toHaveText(
      expectedName
    );
  });

  test("clear searching", async ({ page }) => {
    //Arrange
    const url = "https://www.tcgplayer.com/";
    const productName = "Charizard";
    const option1 = "Base Set (Shadowless)";
    const expectedValue = "All Sets";
    const price = "200";

    //Act
    await page.goto(url);
    await page.getByRole("button", { name: "Allow All" }).click();
    await page.getByLabel("open mobile navigation menu").click();
    await page.locator("#mp-nav-mobile-drop").getByText("Pokémon").click();
    await page.getByRole("link", { name: "Advanced Search" }).click();
    await page.locator("#ProductName").fill(productName);
    await page.locator("#SetName").selectOption(option1);
    await page
      .locator("li")
      .filter({ hasText: /^Normal$/ })
      .locator("#Printing")
      .check();
    await page.locator("#Price").fill(price);
    await page.getByRole("button", { name: "Clear All" }).click();

    //Assert
    await expect(page.locator("#ProductName")).toBeEmpty;
    await expect(page.locator("#SetName")).toHaveValue(expectedValue);
    expect(await page.locator("input[value='Normal']").isChecked()).toBeFalsy();
    await expect(page.locator("#Price")).toBeEmpty;
  });
});
