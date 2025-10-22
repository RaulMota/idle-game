import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./GameScore.js";
import "./GameGenerator.js";

export class IdleGame extends LitElement {
  static properties = {
    moedas: { type: Number },
    geradores: { type: Array },
  };

  constructor() {
    super();
    this.moedas = 10;
    this.geradores = [
      { nome: "Minerador", quantidade: 0, custo: 10, producao: 0.1, fator: 1.15 },
      { nome: "Fábrica", quantidade: 0, custo: 100, producao: 1, fator: 1.2 },
      { nome: "Usina", quantidade: 0, custo: 1000, producao: 10, fator: 1.25 },
    ];
    this.ultimoTempo = performance.now();
    this.loop();
  }

  atualizar(delta) {
    this.geradores.forEach((g) => {
      this.moedas += g.quantidade * g.producao * delta;
    });
    this.requestUpdate();
  }

  loop() {
    const agora = performance.now();
    const delta = (agora - this.ultimoTempo) / 1000;
    this.ultimoTempo = agora;
    this.atualizar(delta);
    requestAnimationFrame(() => this.loop());
  }

  comprar(i) {
    const g = this.geradores[i];
    if (this.moedas >= g.custo) {
      this.moedas -= g.custo;
      g.quantidade++;
      g.custo *= g.fator;
      this.requestUpdate();
    }
  }

  static styles = css`
    :host {
      display: block;
      text-align: center;
      color: #eee;
      font-family: Arial, sans-serif;
      padding: 20px;
    }
  `;

  render() {
    return html`
      <h1>Idle Game</h1>
      <game-score .moedas=${this.moedas}></game-score>
      <h2>Geradores</h2>
      ${this.geradores.map(
        (g, i) => html`
          <game-generator
            .dados=${g}
            .podeComprar=${this.moedas >= g.custo}
            @comprar=${() => this.comprar(i)}
          ></game-generator>
        `
      )}
    `;
  }
}

customElements.define("idle-game", IdleGame);
