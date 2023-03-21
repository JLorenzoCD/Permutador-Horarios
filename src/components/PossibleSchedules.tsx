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
			{allPossibleSchedules.length !== 0 ? (
				<>
					<h2 className='text-3xl font-bold underline'>
						{allPossibleSchedules.length} possible schedules have been generated
					</h2>
					{allPossibleSchedules.map((possibleSchedule, i) => (
						<Schedule data={possibleSchedule} key={i} hoursArr={hoursArr} subjects={subjects} />
					))}
				</>
			) : (
				<>
					<h2 className='text-3xl font-bold underline'>
						With the subjects and commissions given, no schedule could be generated
					</h2>
				</>
			)}
		</div>
	);
}

export default PossibleSchedules;
