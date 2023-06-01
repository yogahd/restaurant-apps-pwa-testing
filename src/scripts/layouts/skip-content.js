class SkipContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <a href='#content' class='skip_link'>Skip to content?</a>
            `;
  }
}
customElements.define('skip-content', SkipContent);
