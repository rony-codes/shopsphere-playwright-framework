import { test, expect } from "@playwright/test";

test.describe("Products API", () => {
  test("TC-001: User should get all products", async ({ request }) => {
    const response = await request.get("https://dummyjson.com/products");
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0]).toHaveProperty("id");
    expect(body.products[0]).toHaveProperty("title");
    expect(body.products[0]).toHaveProperty("price");
  });
  test("TC-002: User should get single products", async ({ request }) => {
    const response = await request.get("https://dummyjson.com/products/1");
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);

    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("price");

    expect(typeof body.title).toBe("string");
    expect(typeof body.price).toBe("number");

    expect(body.title).not.toBe("");
    expect(body.price).toBeGreaterThan(0);
  });

  test("TC-003: User can create product", async ({ request }) => {
    const response = await request.post("https://dummyjson.com/products/add", {
      data: {
        title: "QA Product",
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty("id");
    expect(typeof body.id).toBe("number");
    expect(body.title).toBe("QA Product");
    expect(typeof body.title).toBe("string");
  });

  test("TC-004: User can Update product", async ({ request }) => {
    const response = await request.put("https://dummyjson.com/products/1", {
      data: { title: "Updated Product" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.title).toBe("Updated Product");
  });

  test("TC-005: User can partially update product using PATCH", async ({
    request,
  }) => {
    const response = await request.patch("https://dummyjson.com/products/1", {
      data: {
        price: 500,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.price).toBe(500);
    expect(typeof body.price).toBe("number");
  });

  test("TC-006: User can delete product", async ({ request }) => {
    const response = await request.delete("https://dummyjson.com/products/1");

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.isDeleted).toBe(true);
  });
});
