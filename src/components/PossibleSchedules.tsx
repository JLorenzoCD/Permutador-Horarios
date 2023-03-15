import { Days } from '../utils/days';
import GenerateSchedules, { IPossibleSchedule } from '../utils/GenerateSchedules';

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

	return (
		<div>
			<h1>
				Posibles Horarios
				{allPossibleSchedules.map((possibleSchedule, i) => (
					<Schedule data={possibleSchedule} key={i} />
				))}
			</h1>
		</div>
	);
}

// TODO: Realizar el UI del componente Schedule, tiene que verse como una tabla con los dias como columnas y las horas como filas (tiene que verse las respectivas horas, la materia y su comision)
function Schedule({ data }: { data: IPossibleSchedule }) {
	const dia = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	return (
		<>
			{data.map((day, index) => (
				<li key={index}>
					<p className='mt-5'>---------------------------</p>
					<h3>Dia: -- {dia[index]} --</h3>
					<ul>{day && day.map((time) => <li>{time === -1 ? <></> : <p>Materia y comicion: {time}</p>}</li>)}</ul>
					<p>---------------------------</p>
				</li>
			))}
		</>
	);
}

export default PossibleSchedules;
