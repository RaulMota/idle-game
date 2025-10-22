import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class GameScore extends LitElement {
  static properties = {
    moedas: { type: Number },
  };

  static styles = css`
    div {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  `;

  render() {
    return html`<div>Moedas: ${this.moedas.toFixed(1)}</div>`;
  }
}

customElements.define("game-score", GameScore);
