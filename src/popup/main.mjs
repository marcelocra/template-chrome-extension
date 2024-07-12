import {h, render} from './vendored/preact.mjs';
import htm from './vendored/htm.mjs';

const html = htm.bind(h);

function App(props) {
    return html`<div className="bg-slate-300">Hello ${props.name}!</div>`;
}

render(html`<${App} name="World" />`, document.body);
