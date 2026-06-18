import { test, expect } from "@playwright/test";
import { Authapi } from "../../api/AuthAPI";

const AUTH_USER = {
  username: "emilys",
  password: "emilyspass",
};

test.describe("Authentication API", () => {
  test("TC-001: User should login successfully and receive token", async ({
    request,
  }) => {
    const authAPI = new Authapi(request);

    const response = await authAPI.login(
      AUTH_USER.username,
      AUTH_USER.password,
    );

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty("accessToken");
    expect(typeof body.accessToken).toBe("string");
    expect(body.accessToken).not.toBe("");
  });
  test("TC-002: User should fetch authenticated profile using token", async ({request}) => {
    const authAPI = new Authapi(request);
    const loginResponse = await authAPI.login(AUTH_USER.username,AUTH_USER.password);

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    const token =  loginBody.accessToken;

    const profileResponse = await authAPI.getAuthenticatedUser(token);

    expect(profileResponse.status()).toBe(200);
    const profileBody = await profileResponse.json();

    expect(profileBody).toHaveProperty('id');
    expect(profileBody).toHaveProperty('username');
    expect(profileBody.username).toBe(AUTH_USER.username);
  });

  test('TC-003: User should not fetch profile with invalid token', async ({ request }) => {
    const authAPI = new Authapi(request);

    const response = await authAPI.getAuthenticatedUser('invalid-token');

    expect(response.status()).toBe(401);
  });
});
