import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { signInPage } from "../../globalPagesSetup.js";

Then(
  "the sign in request should return a successful response",
  async function () {
    const response = await this.signInResponsePromise;
    expect(response.status()).toBe(200);

    const json = await response.json();
    //console.log("Full Response JSON:", JSON.stringify(json, null, 2));

    const value = json?.[0]?.result?.value;

    expect(value?.signed_in).toBe(1);
    expect(value?.email_address).toBe(process.env.VALID_EMAIL);
    expect(value?.first_name).toBe("QA");
    expect(value?.user_id).toBeGreaterThan(0);
    expect(value?.recognized_user).toBe(1);

    console.log(`🎉 Sign-in validated for: ${value?.email_address}`);
  }
);
  