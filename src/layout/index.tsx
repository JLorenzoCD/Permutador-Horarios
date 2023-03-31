import { useState } from 'react';

import { defaultSchedule, defaultSubject, subjectsExample } from './../data';
import GenerateSchedules from '../utils/GenerateSchedules';
import generateRandomColor from '../utils/generateRandomColor';

import Container from '../components/Container';
import Button from '../components/Button';
import Subject from '../components/Subject';
import PossibleSchedules from '../components/PossibleSchedules';

import type { ChangeEvent, FormEvent } from 'react';
import { Days } from '../utils/Days';

function Layout() {
	const [subjects, setSubjects] = useState([...subjectsExample]);

	const [subject, setSubject] = useState({ ...defaultSubject, hexColor: generateRandomColor() });
	const [schedule, setSchedule] = useState({ ...defaultSchedule, subject: subjects[0].subject ?? '' });

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

	const handleChangeSubject = (e: ChangeEvent<HTMLInputElement>) => {
		setSubject((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const handleChangeSchedule = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		if (e.target.name === 'name' || e.target.name === 'subject') {
			setSchedule((prevState) => {
				return { ...prevState, [e.target.name]: e.target.value };
			});
		} else {
			setSchedule((prevState) => {
				return { ...prevState, time: { ...prevState.time, [e.target.name]: e.target.value } };
			});
		}
	};

	const handleSubmitSubject = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (subject.subject.trim() === '') {
			alert('No es posible una materia sin nombre');
			return;
		}
		const nombreOcupado = subjects.some(
			(subjectSave) => subjectSave.subject.trim().toUpperCase() === subject.subject.trim().toUpperCase()
		);
		if (nombreOcupado) {
			alert('No es posible repetir el mismo nombre para una materia');
			return;
		}
		const newSubject = {
			id: new Date().getTime(),
			subject: subject.subject,
			possible_schedules: [],
			hexColor: subject.hexColor,
		};

		setSubjects((prevState) => [...prevState, newSubject]);
		setSubject({ ...defaultSubject, hexColor: generateRandomColor() });
	};

	const handleSubmitSchedule = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (schedule.name.trim() === '') {
			alert('No es posible una materia sin nombre');
			return;
		}

		const subjectSave = subjects.find((subject) => subject.subject === schedule.subject);

		if (!subjectSave) {
			alert('Error al buscar en materias');
			return;
		}

		const nombreOcupado = subjectSave.possible_schedules.some(
			(scheduleSave) => scheduleSave.name.trim().toUpperCase() === schedule.name.trim().toUpperCase()
		);
		if (nombreOcupado) {
			alert('No es posible repetir el mismo nombre para un orario en la misma materia');
			return;
		}

		const newSchedule = {
			id: new Date().getTime(),
			name: schedule.name,
			time: { ...schedule.time }, // TODO: Tengo que revisar que el horairo de finalizacion no sea menor a el horarios de comienzo
		};

		setSubjects((prevState) => {
			const subjectSave = prevState.find((subject) => subject.subject === schedule.subject);

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

	return (
		<Container>
			<header>
				<h1 className='text-3xl font-bold underline'>Aplicacion horarios</h1>
			</header>

			<main>
				<form onSubmit={handleSubmitSubject}>
					<h2 className='text-2xl'>Create new Subject</h2>
					<label className='block'>
						Subject:
						<input
							className='border ml-2'
							type='text'
							value={subject.subject}
							name='subject'
							onChange={handleChangeSubject}
						/>
					</label>
					<label className='block'>
						Color
						<input
							type='color'
							name='hexColor'
							className='ml-2'
							value={subject.hexColor}
							onChange={handleChangeSubject}
						/>
					</label>
					<Button type='submit'>Crear</Button>
				</form>
				<br />

				<form onSubmit={handleSubmitSchedule}>
					<h2 className='text-2xl'>Create new Schedule</h2>

					<label className='block'>
						Select Subject
						<select name='subject' value={schedule.subject} onChange={handleChangeSchedule} className='border ml-2'>
							{subjects &&
								subjects.map((subject) => (
									<option key={subject.id} value={subject.subject}>
										{subject.subject}
									</option>
								))}
						</select>
					</label>

					<label className='block'>
						Schedule
						<input
							type='text'
							name='name'
							className='border ml-2'
							value={schedule.name}
							onChange={handleChangeSchedule}
						/>
					</label>
					<label className='block'>
						Select day
						<select name='day' value={schedule.time.day} onChange={handleChangeSchedule} className='border ml-2'>
							<option value={Days.MONDAY}>{Days.MONDAY}</option>
							<option value={Days.TUESDAY}>{Days.TUESDAY}</option>
							<option value={Days.WEDNESDAY}>{Days.WEDNESDAY}</option>
							<option value={Days.THURSDAY}>{Days.THURSDAY}</option>
							<option value={Days.FRIDAY}>{Days.FRIDAY}</option>
							<option value={Days.SATURDAY}>{Days.SATURDAY}</option>
							<option value={Days.SUNDAY}>{Days.SUNDAY}</option>
						</select>
					</label>
					<label className='block'>
						Hora de comienzo
						<input
							type='time'
							name='start'
							onChange={handleChangeSchedule}
							value={schedule.time.start}
							className='border ml-2'
						/>
					</label>
					<label className='block'>
						Hora de finalizacion
						<input
							type='time'
							name='end'
							onChange={handleChangeSchedule}
							value={schedule.time.end}
							className='border ml-2'
						/>
					</label>

					<Button type='submit'>Crear</Button>
				</form>
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
