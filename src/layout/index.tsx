import { useState } from 'react';

import { subjectsExample } from './../data';
import GenerateSchedules from '../utils/GenerateSchedules';

import Container from '../components/Container';
import Button from '../components/Button';
import Subject from '../components/Subject';
import PossibleSchedules from '../components/PossibleSchedules';
import FormSubjects from '../components/FormSubjects';

import { ISchedule, ISubject } from '../types/Subject';

function Layout() {
	const [subjects, setSubjects] = useState([...subjectsExample]);

	const [possibleSchedules, setPossibleSchedules] = useState<null | GenerateSchedules>(null);

	const createSchedules = () => {
		setPossibleSchedules(null);

		if (!!subjects) {
			const horarios = new GenerateSchedules(subjects);

			setPossibleSchedules(horarios);
		}
	};

	const clearSchedules = () => {
		setPossibleSchedules(null);
	};

	const addSchedule = (subjectId: number, newSchedule: ISchedule) => {
		setSubjects((prevState) => {
			const subjectSave = prevState.find((subject) => subject.id === subjectId);

			const existeEnSubjects = subjectSave?.possible_schedules.some(
				(scheduleSave) => scheduleSave.id === newSchedule.id
			);

			if (existeEnSubjects) {
				return [...prevState];
			}

			subjectSave?.possible_schedules.push(newSchedule);

			return [...prevState];
		});
	};
	const addSubject = (newSubject: ISubject) => {
		setSubjects((prevState) => [...prevState, newSubject]);
	};

	return (
		<Container>
			<header>
				<h1 className='text-3xl font-bold underline'>Aplicacion horarios</h1>
			</header>

			<main>
				<FormSubjects subjects={subjects} addSchedule={addSchedule} addSubject={addSubject} />
				<br />
				{subjects && (
					<>
						<h2 className='text-3xl font-bold'>Tus materias y sus posibles horarios:</h2>
						<ul>
							{subjects.map((subject) => (
								<Subject data={subject} key={subject.id} />
							))}
						</ul>
					</>
				)}
				<div className='mt-5'>
					<Button type='button' color='green' onClick={createSchedules}>
						Generar horarios
					</Button>
					<Button type='button' theme='outline' color='purple' onClick={clearSchedules}>
						Limpiar horarios
					</Button>
				</div>

				<section>
					{possibleSchedules && (
						<>
							<PossibleSchedules data={possibleSchedules} />
						</>
					)}
				</section>
			</main>
		</Container>
	);
}

export default Layout;
