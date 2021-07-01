import { useGlobalStore } from "tram-one"
import checkAnswer from "./checkAnswer"

export default () => {
	const workingAnswer = useGlobalStore('working-answer')
	const answers = useGlobalStore('answers')

	const capitalizedAnswer = workingAnswer.value.toUpperCase()
	const isValidAnswer = checkAnswer(capitalizedAnswer)

	if (isValidAnswer) {
		answers.push(capitalizedAnswer)
		workingAnswer.value = ''
	}
}
