import { registerHtml } from 'tram-one'

const html = registerHtml()

export default (props, children) => {
	return html`
		<h1 class="app-header">
			${children}
		</h1>
	`
}
