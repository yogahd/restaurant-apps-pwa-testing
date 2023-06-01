class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
            <p>Copyright © Yoga Rahmahadi - 2023 - SavorySearch</p>
        </footer>     
          `;
  }
}
customElements.define('footer-bar', FooterBar);
