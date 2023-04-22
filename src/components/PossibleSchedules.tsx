import generateRandomColor from '../utils/generateRandomColor';
import GenerateSchedules, { IPossibleSchedule } from '../utils/GenerateSchedules';
import FramePossibleSchedule from './FramePossibleSchedule';

interface Props {
	data: GenerateSchedules;
}
function PossibleSchedules({ data }: Props) {
	let allPossibleSchedules: IPossibleSchedule[] | null = null;

	try {
		allPossibleSchedules = data.getAllPossibleSchedules();
	} catch (err) {
		console.error(err);
		return (
			<>
				<p>Error: {(err as Error).message}</p>
			</>
		);
	}
	const hoursArr = data.getTimeColumnInStringFormat();

	const subjects = data.subjects.map((subject) => {
		subject.hexColor = generateRandomColor();
		return subject;
	});

	return (
		<div>
			{allPossibleSchedules.length !== 0 ? (
				<>
					<h2 className='text-3xl font-bold underline mb-5'>
						{allPossibleSchedules.length} possible schedules have been generated
					</h2>
					{allPossibleSchedules.map((possibleSchedule, i) => (
						<FramePossibleSchedule data={possibleSchedule} key={i} hoursArr={hoursArr} subjects={subjects} />
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
