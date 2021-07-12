import { registerHtml, useGlobalStore } from 'tram-one'
import AnswerInput from './answer-input'

const html = registerHtml({
	'answer-input': AnswerInput
})

export default (props, children) => {
	const answers = useGlobalStore('answers')
	const error = useGlobalStore('error')

	if (!answers) return ''

	// words are worth 1 point for every letter beyond 3
	const addScoreForWord = (score, word) => score + word.length - 3
	const totalAnswerScore = answers.reduce(addScoreForWord, 0)

	// display answers in answer section
	const answerRows = answers.map(answer => html`<option>${answer}</option>`)

	const answersInfo = `${answers.length} ${answers.length == 1 ? ' word' : ' words'} / ${totalAnswerScore} Points`

	return html`
		<section class="answer-section">
			<select class="answer-section-select">
				<option>${answersInfo}</option>
				${answerRows}
			</select>
			<p class="answer-section-error">
				${error.value}
			</p>
			<answer-input />
		</section>
	`
}
