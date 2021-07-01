import { useGlobalStore } from 'tram-one'
import dictionaryString from './dictionary'

const readableDictionary = dictionaryString
	.split('\n')
	.filter(word => word.length > 3) // remove words that are less than 4 letters, since those aren't allowed
	.filter(word => word.length < 20) // remove words that are longer than 20 letters, since those also aren't allowed

const checkAnswer = (answer) => {

	const letters = useGlobalStore('letters')
	const answers = useGlobalStore('answers')

	// answer must have required letter
	const hasRequiredLetter = answer.match(`${letters.required}`)
	if (!hasRequiredLetter) {
		console.log('hasRequiredLetter')
		return false
	}

	// answer must not have letters that aren't in the hive
	const hiveLettersRegex = `^[${letters.required}${letters.consants.join('')}${letters.vowels.join('')}]+$`
	const onlyHasHiveLetters = answer.match(hiveLettersRegex)
	if (!onlyHasHiveLetters) {
		console.log('onlyHasHiveLetters')
		return false
	}

	// answer must be a real word (these will be longer than 3 letters, and less than 20)
	const isRealWord = readableDictionary.indexOf(answer)
	if (isRealWord == -1) {
		console.log('isRealWord')
		return false
	}

	// answer can't be one we've already done
	const isExistingAnswer = answers.indexOf(answer)
	if (isExistingAnswer != -1) {
		console.log('isExistingAnswer')
		return false
	}

	// we've passed all the checks
	return true
}

export default checkAnswer
