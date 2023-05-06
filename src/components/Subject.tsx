import { ISubject } from '@/types/Subject';

import Button from './Button';

interface Props {
	data: ISubject;
	deleteSubject: (subjectId: number) => void;
	deleteSchedule: (subjectId: number, scheduleId: number) => void;
}
function Subject({ data, deleteSubject, deleteSchedule }: Props) {
	return (
		<li className='mb-5'>
			<div className='flex justify-between flex-1'>
				<h3 className='text-2xl'>{data.subject}</h3>
				<Button type='button' color='red' onClick={() => deleteSubject(data.id)}>
					Delete
				</Button>
			</div>
			<ul>
				{data.possible_schedules.map((schedule) => (
					<li key={schedule.id}>
						<Button type='button' color='red' onClick={() => deleteSchedule(data.id, schedule.id)}>
							X
						</Button>
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
