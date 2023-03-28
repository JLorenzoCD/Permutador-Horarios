import type { ISchedule, ISubject } from '../types/Subject';

import { Days } from '../utils/days';

// Ejempolo basico sobre una pestaña con sus respectivas materias y horarios de cursado
export const subjectsExample: ISubject[] = [
	{
		id: 1,
		subject: 'Mathematics',
		possible_schedules: [
			{
				id: 1,
				name: 'Comicion 1',
				time: {
					day: Days.THURSDAY,
					start: '08:30',
					end: '10:00',
				},
			},
			{
				id: 2,
				name: 'Comicion 2',
				time: {
					day: Days.TUESDAY,
					start: '13:30',
					end: '15:00',
				},
			},
			{
				id: 3,
				name: 'Comicion 3',
				time: {
					day: Days.WEDNESDAY,
					start: '13:30',
					end: '15:00',
				},
			},
		],
	},
	{
		id: 2,
		subject: 'Literature',
		possible_schedules: [
			{
				id: 4,
				name: 'Comicion 1',
				time: {
					day: Days.MONDAY,
					start: '08:30',
					end: '10:00',
				},
			},
			{
				id: 5,
				name: 'Comicion 2',
				time: {
					day: Days.MONDAY,
					start: '13:30',
					end: '15:00',
				},
			},
		],
	},
	{
		id: 3,
		subject: 'English',
		possible_schedules: [
			{
				id: 6,
				name: 'Comicion 1',
				time: {
					day: Days.MONDAY,
					start: '10:30',
					end: '12:00',
				},
			},
			{
				id: 7,
				name: 'Comicion 2',
				time: {
					day: Days.TUESDAY,
					start: '11:00',
					end: '13:30',
				},
			},
		],
	},
];

export const defaultSubject: ISubject = {
	id: 0,
	subject: '',
	possible_schedules: [],
};

export const defaultSchedule: ISchedule = {
	id: 0,
	name: '',
	time: {
		day: Days.MONDAY,
		start: '08:00',
		end: '10:00',
	},
};
