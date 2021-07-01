import { registerHtml, useGlobalStore } from 'tram-one'
import LetterHive from './letter-hive'
import checkAnswer from './functions/checkAnswer'
import submitAnswer from './functions/submitAnswer'

const html = registerHtml({
	'letter-hive': LetterHive
})

export default (props, children) => {
	const shuffle = useGlobalStore('shuffle')
	const workingAnswer = useGlobalStore('working-answer')

	const onAnswer = () => {
		submitAnswer()
	}

	// TODO shuffle and clear logic
	const onShuffle = () => {
		shuffle.shuffleValue = shuffle.shuffleValue + 1
	}

	const onClear = () => {
		workingAnswer.value = ''
	}

	return html`
		<section class="letter-section">
			<letter-hive />
			<button onclick=${onShuffle}>Shuffle</button>
			<button onclick=${onAnswer}>Answer</button>
			<button onclick=${onClear}>Clear</button>
		</section>
	`
}
