import { useState } from 'react';

import { defaultSchedule, defaultSubject, defaultScheduleTime } from '@/data';

import MyNotifications from '@/utils/MyNotifications';
import generateRandomColor from '@/utils/generateRandomColor';

import type { ChangeEvent, FormEvent } from 'react';
import { ISchedule, ISubject } from '@/types/Subject';

function FromSubjects(subjects: ISubject[]) {
	const [subject, setSubject] = useState({ ...defaultSubject, hexColor: generateRandomColor() });
	const [schedule, setSchedule] = useState({ ...defaultSchedule, subjectId: -1 });

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

				const timesIndex = prevState.time.findIndex((time) => time.id === timeId);
				if (timeToChange && timesIndex !== -1) {
					const timeChanged = { ...timeToChange, [e.target.name]: e.target.value };

					const time = [...prevState.time];
					time[timesIndex] = timeChanged;

					return { ...prevState, time };
				}
				return prevState;
			});
		};
	};

	const createSubject = (addSubject: (newSubject: ISubject) => void) => {
		return (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (subject.subject.trim() === '') {
				MyNotifications.error('No es posible una materia sin nombre');
				return;
			}
			const nombreOcupado = subjects.some(
				(subjectSave) => subjectSave.subject.trim().toUpperCase() === subject.subject.trim().toUpperCase()
			);
			if (nombreOcupado) {
				MyNotifications.error('No es posible repetir el mismo nombre para una materia');
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

			if (schedule.subjectId === -1) {
				MyNotifications.error('Para crear una comision, es necesario seleccionar una materia');
				return;
			}

			if (schedule.name.trim() === '') {
				MyNotifications.error('No es posible una materia sin nombre');
				return;
			}

			const subjectSave = subjects.find((subject) => subject.id === Number(schedule.subjectId));

			if (!subjectSave) {
				MyNotifications.error('Error al buscar en materias');
				return;
			}

			const nombreOcupado = subjectSave.possible_schedules.some(
				(scheduleSave) => scheduleSave.name.trim().toUpperCase() === schedule.name.trim().toUpperCase()
			);
			if (nombreOcupado) {
				MyNotifications.error('No es posible repetir el mismo nombre para un orario en la misma materia');
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
			const newTime = { ...defaultScheduleTime, id: new Date().getTime() };
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
