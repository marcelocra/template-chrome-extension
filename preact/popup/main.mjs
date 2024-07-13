import htm from "./vendored/htm.mjs";
import { h, render } from "./vendored/preact.mjs";

const html = htm.bind(h);

function App(props) {
  return html`<div class="text-red-300">Hello ${props.name}!</div>`;
}

render(html`<${App} name="World" />`, document.body);
