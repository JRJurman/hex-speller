import { registerHtml, useGlobalStore } from 'tram-one'
import submitAnswer from './functions/submitAnswer'

const html = registerHtml()

export default (props, children) => {
	const workingAnswer = useGlobalStore('working-answer')

	const onInputSubmit = (event) => {
		workingAnswer.value = event.target.value
		console.log(workingAnswer.value)
		if (event.keyCode == 13) {
			submitAnswer()
		}
	}

	const onUpdateAnswer = (event) => {
		workingAnswer.value = event.target.value
		console.log(workingAnswer.value)
	}

	return html`
		<input class="answer-input" type="text" value=${workingAnswer.value} onkeypress=${onInputSubmit} >
	`
}
