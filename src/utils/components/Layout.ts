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

	return { subjects, possibleSchedules, createPossibleSchedules, clearPossibleSchedules, addSubject, addSchedule };
}

export default Layout;
