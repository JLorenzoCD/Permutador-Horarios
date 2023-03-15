import { ISubject } from '../types/Subject';

interface Props {
	data: ISubject;
}
function Subject({ data }: Props) {
	return (
		<li className='mb-5'>
			<h3 className='text-2xl'>{data.subject}</h3>
			<ul>
				{data.possible_schedules.map((schedule) => (
					<li key={schedule.id}>
						{schedule.name} - {schedule.time.day} - {schedule.time.start} to {schedule.time.end}
					</li>
				))}
			</ul>
		</li>
	);
}

export default Subject;
