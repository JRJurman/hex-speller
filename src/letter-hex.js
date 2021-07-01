import { registerSvg } from 'tram-one'

const svg = registerSvg()

export default ({offset = [0,0], letter="A", required = false, onclick}, children) => {
	const length = 30
	const height = 104
	const width = 120

	const points = [
		[0, height/2],
		[length, 0],
		[width - length, 0],
		[width, height/2],
		[width - length, height],
		[length, height]
	]

	const coordToSVGPoint = ([x,y]) => [x + offset[0], y + offset[1]].join(',')
	const svgPoints = points.map(coordToSVGPoint).join(' ')

	return svg`
		<g class="letter-hex" onclick=${onclick}>
			<polygon class="letter-hex-polygon ${required ? 'required' : ''}" points=${svgPoints}>
			</polygon>
			<text class="letter-hex-letter" fill="white" x="${(width/2) + offset[0]}" y="${(height/2) + 20 + offset[1]}" text-anchor="middle">${letter}</text>
		</g>
	`
}
