import { useState } from 'react';

import { subjectsExample } from './../../data';
import GenerateSchedules from '../../utils/GenerateSchedules';

import { ISchedule, ISubject } from '../../types/Subject';

function Layout() {
	const [subjects, setSubjects] = useState([...subjectsExample]);

	const [possibleSchedules, setPossibleSchedules] = useState<null | GenerateSchedules>(null);

	const createPossibleSchedules = () => {
		setPossibleSchedules(null);

		if (!!subjects) {
			const horarios = new GenerateSchedules(subjects);

			setPossibleSchedules(horarios);
		}
	};

	const clearPossibleSchedules = () => {
		setPossibleSchedules(null);
	};

	const addSubject = (newSubject: ISubject) => {
		setSubjects((prevState) => [...prevState, newSubject]);
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

	const deleteSubject = (subjectId: number) => {
		setSubjects((prevState) => {
			const filteredSubjects = prevState.filter((subject) => subject.id !== subjectId);
			return [...filteredSubjects];
		});
	};

	const deleteSchedule = (subjectId: number, scheduleId: number) => {
		setSubjects((prevState) => {
			const subjectSave = prevState.find((subject) => subject.id === subjectId);

			if (!subjectSave) {
				return prevState;
			}

			const newPossibleSchedules = subjectSave.possible_schedules.filter((schedule) => schedule.id !== scheduleId);

			subjectSave.possible_schedules = newPossibleSchedules;

			return [...prevState];
		});
	};

	return {
		subjects,
		possibleSchedules,
		createPossibleSchedules,
		clearPossibleSchedules,
		addSubject,
		addSchedule,
		deleteSubject,
		deleteSchedule,
	};
}

export default Layout;
