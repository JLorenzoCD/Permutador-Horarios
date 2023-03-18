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

	return (
		<div>
			<h1>
				Posibles Horarios
				{allPossibleSchedules.map((possibleSchedule, i) => (
					<Schedule data={possibleSchedule} key={i} hoursArr={hoursArr} />
				))}
			</h1>
		</div>
	);
}

export default PossibleSchedules;
