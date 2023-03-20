import GenerateSchedules, { IPossibleSchedule } from '../utils/GenerateSchedules';
import Schedule from './Schedule';

interface Props {
	data: GenerateSchedules;
}
function PossibleSchedules({ data }: Props) {
	let allPossibleSchedules: IPossibleSchedule[] | null = null;

	try {
		allPossibleSchedules = data.getAllPossibleSchedules();
	} catch (err) {
		return (
			<>
				<p>Error: {(err as Error).message}</p>
			</>
		);
	}
	const hoursArr = data.getTimeColumnInStringFormat();

	const generateRandomColor = () => {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);

		const rgbColor = `rgb(${r},${g},${b})`;

		return rgbColor;
	};

	const subjects = data.subjects.map((subject) => {
		subject.rgbColor = generateRandomColor();
		return subject;
	});

	return (
		<div>
			<h1>
				Posibles Horarios
				{allPossibleSchedules.map((possibleSchedule, i) => (
					<Schedule data={possibleSchedule} key={i} hoursArr={hoursArr} subjects={subjects} />
				))}
			</h1>
		</div>
	);
}

export default PossibleSchedules;
