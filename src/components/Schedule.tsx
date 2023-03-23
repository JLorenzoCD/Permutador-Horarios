import { ISubject } from '../types/Subject';
import { IPossibleSchedule } from '../utils/GenerateSchedules';

interface PropsSchedule {
	data: IPossibleSchedule;
	hoursArr: string[];
	subjects: ISubject[];
}
function Schedule({ data, hoursArr, subjects }: PropsSchedule) {
	const dia = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	const coloringSubject = (e: number | string) => {
		if (typeof e == 'number') return '';

		const subject = subjects.find((subject) => subject.id === parseInt(e.split('-')[0]));
		return subject?.rgbColor as string;
	};

	const title = (e: string) => {
		const ids = e.split('-');
		const subject = subjects.find((subject) => subject.id === parseInt(ids[0]));

		const schedule = subject?.possible_schedules.find((schedule) => schedule.id === parseInt(ids[1]));

		return schedule?.name + ' - ' + subject?.subject ?? subject?.subject ?? '';
	};

	return (
		<>
			<ScheduleBase hoursArr={hoursArr}>
				<ul className='flex'>
					{data.map((day, index) => (
						<li key={dia[index]} className='flex-1 border-r-2'>
							<div className='top'>
								<h3 className='text-center p-3'>{dia[index]}</h3>
							</div>

							<ul>
								{day?.map((e, index) => (
									<li
										key={index}
										className={`text-center p-1 h-8 ${e === -1 ? '' : 'overflow-y-scroll'}`}
										style={{ background: coloringSubject(e) }}
									>
										{e == -1 ? <br /> : title(e as string)}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</ScheduleBase>
		</>
	);
}

interface PropsScheduleBase {
	children: JSX.Element | JSX.Element[];
	hoursArr: string[];
}
function ScheduleBase({ children, hoursArr }: PropsScheduleBase) {
	return (
		<section className='overflow-x-auto mb-10'>
			<div className='flex border-2 mx-2' style={{ width: 900 }}>
				{/* Horarios */}
				<ul className='w-28 pt-12 border-x-2'>
					{hoursArr.map((hora) => (
						<li key={hora} className='text-center p-1 border-t-2 h-8'>
							{hora}
						</li>
					))}
				</ul>

				{/* Dias */}
				<div className='flex-1'>{children}</div>
			</div>
		</section>
	);
}

export default Schedule;
