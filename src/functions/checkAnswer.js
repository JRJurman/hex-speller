import { useGlobalStore } from 'tram-one'
import dictionaryString from './dictionary'

const readableDictionary = dictionaryString
	.split('\n')
	.filter(word => word.length > 3) // remove words that are less than 4 letters, since those aren't allowed
	.filter(word => word.length < 20) // remove words that are longer than 20 letters, since those also aren't allowed

const checkAnswer = (answer) => {

	const letters = useGlobalStore('letters')
	const answers = useGlobalStore('answers')
	const error = useGlobalStore('error')

	// answer must have required letter
	const hasRequiredLetter = answer.match(`${letters.required}`)
	if (!hasRequiredLetter) {
		error.value = `Is missing the required letter, ${letters.required}`
		return false
	}

	// answer must not have letters that aren't in the hive
	const hiveLettersRegex = `^[${letters.required}${letters.consants.join('')}${letters.vowels.join('')}]+$`
	const onlyHasHiveLetters = answer.match(hiveLettersRegex)
	if (!onlyHasHiveLetters) {
		error.value = `Has letters not in the hexagon`
		return false
	}

	// answer must be longer than 3 letters
	const isTooShort = answer.length <= 3
	if (isTooShort) {
		error.value = `Too few letters, must be more than three`
		return false
	}

	// answer must be less than 20 letters
	const isTooLong = answer.length >= 20
	if (isTooLong) {
		error.value = `Has too many letters, must be less than twenty`
		return false
	}

	// answer must be a real word
	const isRealWord = readableDictionary.indexOf(answer)
	if (isRealWord == -1) {
		error.value = `Word not found in the dictionary`
		return false
	}

	// answer can't be one we've already done
	const isExistingAnswer = answers.indexOf(answer)
	if (isExistingAnswer != -1) {
		error.value = `Word already entered`
		return false
	}

	// we've passed all the checks
	return true
}

export default checkAnswer
