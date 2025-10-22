import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class GameGenerator extends LitElement {
  static properties = {
    dados: { type: Object },
    podeComprar: { type: Boolean },
  };

  static styles = css`
    .generator {
      background: #1e1e1e;
      padding: 10px;
      border-radius: 8px;
      margin: 10px auto;
      max-width: 400px;
    }

    button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 6px;
    }

    button:disabled {
      background-color: #555;
      cursor: not-allowed;
    }
  `;

  render() {
    const g = this.dados;
    return html`
      <div class="generator">
        <strong>${g.nome}</strong><br />
        Quantidade: ${g.quantidade}<br />
        Produção: ${(g.producao * g.quantidade).toFixed(2)}/s<br />
        Custo: ${g.custo.toFixed(1)}<br />
        <button
          ?disabled=${!this.podeComprar}
          @click=${() => this.dispatchEvent(new CustomEvent("comprar"))}
        >
          Comprar
        </button>
      </div>
    `;
  }
}

customElements.define("game-generator", GameGenerator);
