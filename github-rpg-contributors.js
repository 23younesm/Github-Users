/**
 * Copyright 2025 23younesm
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';


/**
 * `github-rpg-contributors`
 * Displays GitHub contributors with unique RPG characters.
 *
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.organization = "haxtheweb";
    this.repo = "webcomponents";
    this.limit = 10;
    this.contributors = [];
  }

  static get properties() {
    return {
      ...super.properties,
      organization: { type: String, reflect: true },
      repo: { type: String, reflect: true },
      limit: { type: Number, reflect: true },
      contributors: { type: Array }
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary, black);
          background-color: var(--ddd-theme-accent, white);
          font-family: var(--ddd-font-navigation, sans-serif);
          padding: 16px;
          border-radius: 8px;
        }
        h2 {
          font-size: 1.2em;
          margin-bottom: 12px;
        }
        .contributors-list {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .contributor {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          background: var(--ddd-theme-surface, #f3f3f3);
          border-radius: 8px;
          text-align: center;
        }
        .avatar {
          width: 60px;
          height: 60px;

          border: 2px solid var(--ddd-theme-primary, black);
        }
        .contributor a {
          text-decoration: none;
          color: var(--ddd-theme-primary, black);
          font-weight: bold;
        }
        .rpg-character {
          font-size: 2rem;
          margin: 8px 0;
        }
      `
    ];
  }

  updated(changedProperties) {
    if (changedProperties.has("organization") || changedProperties.has("repo") || changedProperties.has("limit")) {
      this.fetchContributors();
    }
  }

  async fetchContributors() {
    const response = await fetch(`https://api.github.com/repos/${this.organization}/${this.repo}/contributors`);
    const data = await response.json();
    this.contributors = data.slice(0, this.limit);
  }

  generateRpgCharacter(name) {
    return new RPGCharacter(name).generate();
  }

  getRandom8DigitNumber() {
    return Math.floor(10000000 + Math.random() * 90000000);
  }
  
  render() {
    return html`
      <h2>Contributors to <a href="https://github.com/${this.organization}/${this.repo}" target="_blank">${this.organization}/${this.repo}</a></h2>
      <div class="contributors-list">
        ${this.contributors.map(
          (contributor) => {
            const seednum = this.getRandom8DigitNumber(); // Generate a unique seed per contributor
            return html`
              <div class="contributor">
                <a href="https://github.com/${contributor.login}" target="_blank">
                  <img src="${contributor.avatar_url}" alt="${contributor.login}" class="avatar" />
                  <span>${contributor.login}</span>
                </a>
                <div class="rpg-character">
                  <rpg-character seed="${seednum}"></rpg-character>
                </div>
                <p>Contributions: ${contributor.contributions}</p>
                <p>Seed: ${seednum}</p>
              </div>
            `;
          }
        )}
      </div>
    `;
  }
}  

customElements.define(GithubRpgContributors.tag, GithubRpgContributors);
