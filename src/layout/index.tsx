import { useState } from 'react';

import type { ChangeEvent } from 'react';

enum Days {
	MONDAY = 'Monday',
	TUESDAY = 'Tuesday',
	WEDNESDAY = 'Wednesday',
	THURSDAY = 'Thursday',
	FRIDAY = 'Friday',
	SATURDAY = 'Saturday',
	SUNDAY = 'Sunday',
}

function Layout() {
	const [time, setTime] = useState('08:30');

	const handleChangeInputTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(e.target.value);
	};

	// Ejempolo basico sobre una pestaña con sus respectivas materias y horarios de cursado
	const dataExample = {
		title: 'Horarios de la facultad',
		subjects: [
			{
				id: 1,
				subject: 'Mathematics',
				possible_schedules: [
					{
						id: 1,
						name: 'Comicion 1',
						time: {
							day: Days.THURSDAY,
							start: '08:30',
							end: '10:00',
						},
					},
					{
						id: 2,
						name: 'Comicion 2',
						time: {
							day: Days.TUESDAY,
							start: '13:30',
							end: '15:00',
						},
					},
					{
						id: 3,
						name: 'Comicion 3',
						time: {
							day: Days.WEDNESDAY,
							start: '13:30',
							end: '15:00',
						},
					},
				],
			},
			{
				id: 2,
				subject: 'Literature',
				possible_schedules: [
					{
						id: 1,
						name: 'Comicion 1',
						time: {
							day: Days.MONDAY,
							start: '08:30',
							end: '10:00',
						},
					},
					{
						id: 2,
						name: 'Comicion 2',
						time: {
							day: Days.MONDAY,
							start: '13:30',
							end: '15:00',
						},
					},
				],
			},
		],
	};
	/*
	La idea es crear una matriz en la cual las filas sean "los dias" y las columnas "los posibles horarios", y una vez que el usuario coloque todos los datos sobre las materias y sus posibles horarios, recorrer cada uno para crear todos los posibles 
    */
	return (
		<>
			<header>
				<h1 className='text-3xl font-bold underline'>Aplicacion horarios</h1>
			</header>
			<main>
				<label>
					<input type='time' onChange={handleChangeInputTime} value={time} />
				</label>

				<br />
				<h2 className='text-2xl font-bold'>{dataExample.title}</h2>
				<ul>
					{dataExample.subjects.map((subject) => (
						<li key={subject.id} className='mb-5'>
							<h3 className='text-2xl'>{subject.subject}</h3>
							<ul>
								{subject.possible_schedules.map((schedule) => (
									<li key={schedule.id}>
										{schedule.name} - {schedule.time.day} - {schedule.time.start} to {schedule.time.end}
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</main>
			<footer></footer>
		</>
	);
}

export default Layout;
