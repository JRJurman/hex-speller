import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useEffect, useGlobalStore } from 'tram-one'
import AnswerSection from './answer-section'
import AppHeader from './app-header'
import LetterSection from './letter-section'
import './styles.css'

/**
 * The entry point of the app, and where we mount the app on the DOM.
 * Read more about it here: https://tram-one.io/#components
 */

const html = registerHtml({
	'app-header': AppHeader,
	'letter-section': LetterSection,
	'answer-section': AnswerSection
})

const getRandomLettersForDay = () => {
	const today = new Date()
	const date = today.getDate()
	const month = today.getMonth()

	const commonConsants = ['R','S','T','N','L'] // should have 1
	const genericConstants = ['H','C','F','B','G','P','D','M'] // should have 2
	const uncommonConsants = ['W','J','Q','V','Y','K','X','Z'] // should have 2
	const vowels = ['A', 'E', 'I', 'O', 'U'] // should have 2

	const shuffleBasedOnDate = (letterA, letterB) => {
		return (letterA.charCodeAt(0)%date) - (letterB.charCodeAt(0)%month)
	}

	const shuffledCommonConsants = commonConsants.sort(shuffleBasedOnDate)
	const shuffledGenericConstants = genericConstants.sort(shuffleBasedOnDate)
	const shuffledUncommonConsants = uncommonConsants.sort(shuffleBasedOnDate)
	const shuffledVowels = vowels.sort(shuffleBasedOnDate)

	const pickedConstants = [
		...shuffledCommonConsants.slice(0, 1),
		...shuffledGenericConstants.slice(0, 2),
		...shuffledUncommonConsants.slice(0, 2),
	]

	const pickedVowels = shuffledVowels.slice(0, 2)

	// determine the required letter by picking one of the (common or generic) constants (based on date and month again)
	const requiredIndex = (date+month)%3

	return {
		consants: pickedConstants.filter((letter, index) => index != requiredIndex),
		required: pickedConstants[requiredIndex],
		vowels: pickedVowels
	}
}

const home = () => {
	useGlobalStore('letters', getRandomLettersForDay())

	useGlobalStore('answers', [])

	useGlobalStore('shuffle', {shuffleValue: 0})

	useGlobalStore('working-answer', {value: ''})

	useGlobalStore('error', {value: ''})

	return html`
		<main>
			<app-header>hex-speller</app-header>
			<section class="main-section">
				<answer-section />
				<letter-section />
			</section>
			<footer>
				Rules: Create words that are four or more letters.
				Words must only use letters in the grid,
				and must	include the center letter.<br/>
				<br/>
				Created by <a href="https://jrjurman.com">Jesse Jurman</a><br/>
				Written in <a href="https://tram-one.io">Tram-One</a><br/>
				Inspired by <a href="https://www.nytimes.com/puzzles/spelling-bee">The New York Times' Spelling Bee</a>
			</footer>
		</main>
	`
}

// start the app on a div with id="app"
start(home, '#app')
