import { IPossibleSchedule } from '../utils/GenerateSchedules';

interface PropsSchedule {
	data: IPossibleSchedule;
	hoursArr: string[];
}
function Schedule({ data, hoursArr }: PropsSchedule) {
	const dia = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
									<li key={index} className='text-center p-1'>
										{e == -1 ? <br /> : e}
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
		<section className='flex border-2 mx-2' style={{ width: 900 }}>
			{/* Horarios */}
			<ul className='w-28 pt-12 border-x-2'>
				{hoursArr.map((hora) => (
					<li key={hora} className='text-center p-1 border-t-2'>
						{hora}
					</li>
				))}
			</ul>

			{/* Dias */}
			<div className='flex-1'>{children}</div>
		</section>
	);
}

export default Schedule;
