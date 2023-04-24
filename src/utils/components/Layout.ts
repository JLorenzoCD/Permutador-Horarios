import { useEffect, useState } from 'react';

import { subjectsExample } from './../../data';
import GenerateSchedules from '../../utils/GenerateSchedules';

import { ISchedule, ISubject } from '../../types/Subject';
import { KEY_LOCAL_SOTRAGE_SUBJECTS } from '../../config';
import MyNotifications from '../MyNotifications';

function Layout() {
	const [subjects, setSubjects] = useState<ISubject[]>([]);

	const [possibleSchedules, setPossibleSchedules] = useState<null | GenerateSchedules>(null);

	useEffect(() => {
		const jsonSubjectsData = window.localStorage.getItem(KEY_LOCAL_SOTRAGE_SUBJECTS);
		if (jsonSubjectsData != null) {
			const subjectsData = JSON.parse(jsonSubjectsData) as ISubject[];

			setSubjects(subjectsData);
		}
	}, []);

	useEffect(() => {
		if (subjects.length === 0) return window.localStorage.removeItem(KEY_LOCAL_SOTRAGE_SUBJECTS);
		window.localStorage.setItem(KEY_LOCAL_SOTRAGE_SUBJECTS, JSON.stringify(subjects));
	}, [subjects]);

	const createPossibleSchedules = () => {
		setPossibleSchedules(null);

		let areSchedule = false;

		for (const subject of subjects) {
			if (subject.possible_schedules.length !== 0) {
				areSchedule = true;
				break;
			}
		}

		if (!!subjects && subjects.length !== 0 && areSchedule) {
			const horarios = new GenerateSchedules(subjects);

			setPossibleSchedules(horarios);
		}
	};

	const clearPossibleSchedules = () => {
		setPossibleSchedules(null);
	};

	const addSubject = (newSubject: ISubject) => {
		setSubjects((prevState) => [...prevState, newSubject]);

		MyNotifications.success();
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

		MyNotifications.success();
	};

	const deleteSubject = async (subjectId: number) => {
		const isConfirmed = await MyNotifications.confirmDelete();

		if (isConfirmed) {
			setSubjects((prevState) => {
				const filteredSubjects = prevState.filter((subject) => subject.id !== subjectId);
				return [...filteredSubjects];
			});
			MyNotifications.successToDelete('The subject was eliminated');
		}
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

	const setDefaultSubjects = () => {
		setSubjects([...subjectsExample]);
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
		setDefaultSubjects,
	};
}

export default Layout;
