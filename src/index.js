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

const home = () => {
	useGlobalStore('letters', {
		consants: ['F', 'B', 'C', 'D'],
		required: 'G',
		vowels: ['A', 'E']
	})

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
