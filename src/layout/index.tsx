import { useState } from 'react';

import type { ChangeEvent } from 'react';

import { subjectsExample } from './../data';
import GenerateSchedules from '../utils/GenerateSchedules';

function Layout() {
	const [time, setTime] = useState('08:30');

	const data = [...subjectsExample];

	const handleChangeInputTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(e.target.value);
	};

	const createSchedules = () => {
		const horarios = new GenerateSchedules(data);

		const allPossibleSchedules = horarios.generateAllPossibleSchedules();
		console.log(allPossibleSchedules);
	};
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
				{data && (
					<>
						<h2 className='text-3xl font-bold'>Tus materias y sus posibles horarios:</h2>
						<ul>
							{data.map((subject) => (
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
					</>
				)}
				<div className='mt-5'>
					<button type='button' onClick={createSchedules}>
						Generar horarios
					</button>
				</div>
			</main>
			<footer></footer>
		</>
	);
}

export default Layout;
