import { useState } from 'react';

import { subjectsExample } from './../data';
import GenerateSchedules from '../utils/GenerateSchedules';

import Subject from '../components/Subject';
import PossibleSchedules from '../components/PossibleSchedules';

import type { ChangeEvent } from 'react';

function Layout() {
	const [time, setTime] = useState('08:30');

	const [possibleSchedules, setPossibleSchedules] = useState<null | GenerateSchedules>(null);

	const data = [...subjectsExample];

	const handleChangeInputTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(e.target.value);
	};

	const createSchedules = () => {
		setPossibleSchedules(null);

		if (!!data) {
			const horarios = new GenerateSchedules(data);

			setPossibleSchedules(horarios);
		}
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
								<Subject data={subject} key={subject.id} />
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
			<footer>
				{possibleSchedules && (
					<>
						<PossibleSchedules data={possibleSchedules} />
					</>
				)}
			</footer>
		</>
	);
}

export default Layout;
