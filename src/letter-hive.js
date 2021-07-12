import { registerSvg, useGlobalStore } from 'tram-one'
import LetterHex from './letter-hex'

const svg = registerSvg({
	'letter-hex': LetterHex
})

const shuffleLetters = (letters, timesToShuffle) => {
	if (timesToShuffle == 0) return letters

	const shuffledLetters = [...letters.slice(0, -3), ...letters.slice(-2), ...letters.slice(-3, -2)].reverse()
	return shuffleLetters(shuffledLetters, timesToShuffle - 1)
}

export default (props, children) => {
	const letters = useGlobalStore('letters')
	const workingAnswer = useGlobalStore('working-answer')
	const shuffle = useGlobalStore('shuffle')
	const error = useGlobalStore('error')

	if (!letters) {
		return ''
	}

	const lettersInOrder = [
		letters.consants[0],
		letters.consants[1],
		letters.consants[2],
		letters.consants[3],
		letters.vowels[0],
		letters.vowels[1]
	]

	const shuffledLetters = shuffleLetters(lettersInOrder, shuffle.shuffleValue)

	const onSelectHex = (letter) => () => {
		workingAnswer.value = workingAnswer.value + letter
		error.value = ''
	}

	return svg`
		<svg class="letter-hive" viewbox="0 0 300 300" width="310px" height="340px">
			<letter-hex offset=${[0, 54.5]} letter=${shuffledLetters[0]} onclick=${onSelectHex(shuffledLetters[0])} />
			<letter-hex offset=${[95, 0]} letter=${shuffledLetters[1]} onclick=${onSelectHex(shuffledLetters[1])} />
			<letter-hex offset=${[190, 54.5]} letter=${shuffledLetters[2]} onclick=${onSelectHex(shuffledLetters[2])} />
			<letter-hex offset=${[190,166]} letter=${shuffledLetters[3]} onclick=${onSelectHex(shuffledLetters[3])} />
			<letter-hex offset=${[0,166]} letter=${shuffledLetters[4]} onclick=${onSelectHex(shuffledLetters[4])} />
			<letter-hex offset=${[95,222.5]} letter=${shuffledLetters[5]} onclick=${onSelectHex(shuffledLetters[5])} />

			<letter-hex offset=${[95,111]} letter=${letters.required} onclick=${onSelectHex(letters.required)} required />
		</svg>
	`
}
