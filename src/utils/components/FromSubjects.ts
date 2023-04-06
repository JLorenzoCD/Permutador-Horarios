import { useState } from 'react';

import { defaultSchedule, defaultSubject } from '../../data';
import generateRandomColor from '../generateRandomColor';

import type { ChangeEvent, FormEvent } from 'react';
import { ISchedule, ISubject } from '../../types/Subject';

function FromSubjects(subjects: ISubject[]) {
	const [subject, setSubject] = useState({ ...defaultSubject, hexColor: generateRandomColor() });
	const [schedule, setSchedule] = useState({ ...defaultSchedule, subjectId: subjects[0].id ?? 0 });

	const handleChangeSubject = (e: ChangeEvent<HTMLInputElement>) => {
		setSubject((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const handleChangeSchedule = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		if (e.target.name === 'name' || e.target.name === 'subjectId') {
			setSchedule((prevState) => {
				return { ...prevState, [e.target.name]: e.target.value };
			});
		} else {
			setSchedule((prevState) => {
				return { ...prevState, time: { ...prevState.time, [e.target.name]: e.target.value } };
			});
		}
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
		};
	};

	return { subject, schedule, handleChangeSubject, handleChangeSchedule, createSubject, createSchedule };
}

export default FromSubjects;
