import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

// Jika DDDSuper tidak tersedia, kita akan menggunakan LitElement langsung

export class EnhancedPauseComponent extends LitElement {
  static get properties() {
    return {
      visibleContent: { type: Number },
      showButtons: { type: Boolean },
      showAllOption: { type: Boolean },
      labels: { type: Array },
    };
  }

  constructor() {
    super();
    this.visibleContent = 1;
    this.showButtons = true;
    this.showAllOption = false;
    this.labels = ["Content 1", "Content 2", "Content 3", "Content 4", "Content 5", "Content 6","Content 7","Content 8","Content 9","Content 10","Content 11","Content 12"];
    console.log('EnhancedPauseComponent constructed');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('EnhancedPauseComponent connected');
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
      .wrapper {
        margin: 16px;
        padding: 16px;
        /* background-color: #f0f0f0; */
      }
      .content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out;
      }
      .content.visible {
        max-height: 100%;
      }
      .button-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
      }
      button {
        padding: 10px 20px;
        margin-right: 10px;
        background-color: #4c80da;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #2d3748;
      }
      .arrow-down {
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid #85adf1;
      cursor: pointer;
      transition: transform 2.3s ease;
    }
    `;
  }

  render() {
    console.log('Rendering EnhancedPauseComponent');
    return html`
      <div class="wrapper">
        ${this.renderContent()}
        ${this.showButtons ? this.renderButtons() : ''}
      </div>
    `;
  }

  renderContent() {
    return this.labels.map(
      (label, index) => html`
        <div class="content ${this.visibleContent > index ? "visible" : ""}">
          <!-- <h3>${label}</h3> -->
          <slot name="content-${index + 1}">Default content for ${label}</slot>
        </div>
      `
    );
  }

  renderButtons() {
    return html`
      <div class="button-container">
        <button @click=${this.handlePause}>Lanjut ...</button>
        <button
          ?hidden=${!this.showAllOption}
          @click=${this.showAll}
        >
          Tampilkan Semua
        </button>
      </div>
    `;
  }

  handlePause() {
    console.log('handlePause called');
    if (this.visibleContent < this.labels.length) {
      this.visibleContent++;
    } else {
      this.visibleContent = this.labels.length;
      this.showButtons = false;
    }
    this.showAllOption = this.visibleContent < this.labels.length;
    this.requestUpdate();
  }

  showAll() {
    console.log('showAll called');
    this.visibleContent = this.labels.length;
    this.showButtons = false;
    this.requestUpdate();
  }
}

customElements.define('enhanced-pause-component', EnhancedPauseComponent);