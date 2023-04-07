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
						{schedule.name} -{' '}
						{schedule.time.map((time) => (
							<span key={time.id} className='ml-5'>
								{time.day} - {time.start} to {time.end}
							</span>
						))}
					</li>
				))}
			</ul>
		</li>
	);
}

export default Subject;
