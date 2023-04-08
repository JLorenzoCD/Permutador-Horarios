import { useState } from 'react';

import { defaultSchedule, defaultSubject, defaultScheduleTime } from '../../data';
import generateRandomColor from '../generateRandomColor';

import type { ChangeEvent, FormEvent } from 'react';
import { ISchedule, ISubject } from '../../types/Subject';

function FromSubjects(subjects: ISubject[]) {
	const [subject, setSubject] = useState({ ...defaultSubject, hexColor: generateRandomColor() });
	const [schedule, setSchedule] = useState({ ...defaultSchedule, subjectId: subjects[0]?.id ?? -1 });

	const handleChangeSubject = (e: ChangeEvent<HTMLInputElement>) => {
		setSubject((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const handleChangeSchedule = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setSchedule((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const handleChangeScheduleTime = (timeId: number) => {
		return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setSchedule((prevState) => {
				const timeToChange = prevState.time.find((time) => time.id === timeId);

				const times = prevState.time.filter((time) => time.id !== timeId);
				if (timeToChange) {
					const timeChanged = { ...timeToChange, [e.target.name]: e.target.value };

					return { ...prevState, time: [timeChanged, ...times] };
				}
				return prevState;
			});
		};
	};

	const createSubject = (addSubject: (newSubject: ISubject) => void) => {
		return (e: FormEvent<HTMLFormElement>) => {
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

			addSubject(newSubject);
			setSubject({ ...defaultSubject, hexColor: generateRandomColor() });
		};
	};

	const createSchedule = (addSchedule: (subjectId: number, newSchedule: ISchedule) => void) => {
		return (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (schedule.name.trim() === '') {
				alert('No es posible una materia sin nombre');
				return;
			}

			const subjectSave = subjects.find((subject) => subject.id === Number(schedule.subjectId));

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
				time: [...schedule.time], // TODO: Tengo que revisar que el horairo de finalizacion no sea menor a el horarios de comienzo
			};

			addSchedule(Number(schedule.subjectId), newSchedule);
			setSchedule({ ...JSON.parse(JSON.stringify(defaultSchedule)), subjectId: subjects[0].id ?? 0 });
		};
	};

	const addTime = () => {
		setSchedule((prevState) => {
			const newTime = { ...defaultScheduleTime, id: prevState.time.length };
			return { ...prevState, time: [...prevState.time, newTime] };
		});
	};

	const deleteTime = (timeId: number) => {
		setSchedule((prevState) => {
			const times = [...prevState.time.filter((time) => time.id !== timeId)];
			return { ...prevState, time: [...times] };
		});
	};

	return {
		subject,
		schedule,
		handleChangeSubject,
		handleChangeSchedule,
		handleChangeScheduleTime,
		createSubject,
		createSchedule,
		addTime,
		deleteTime,
	};
}

export default FromSubjects;
