import { html, fixture, expect } from '@open-wc/testing';
import "../Github-Users.js";

describe("Github-Users test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <Github-Users
        title="title"
      ></Github-Users>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
