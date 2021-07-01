import { registerHtml, useGlobalStore } from 'tram-one'
import submitAnswer from './functions/submitAnswer'

const html = registerHtml()

export default (props, children) => {
	const workingAnswer = useGlobalStore('working-answer')

	const onInputSubmit = (event) => {
		console.log('event triggered!')
		if (event.keyCode == 13) {
			submitAnswer()
		}
		workingAnswer.value = event.target.value
	}

	return html`
		<input class="answer-input" type="text" value=${workingAnswer.value} onkeyup=${onInputSubmit} onchange=${onInputSubmit} >
	`
}
