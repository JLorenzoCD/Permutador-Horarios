import type { Subject } from '../types/Subject.interface';

import { Days } from '../utils/days';

// Ejempolo basico sobre una pestaña con sus respectivas materias y horarios de cursado
export const subjectsExample: Subject[] = [
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
				id: 1,
				name: 'Comicion 1',
				time: {
					day: Days.MONDAY,
					start: '08:30',
					end: '10:00',
				},
			},
			{
				id: 2,
				name: 'Comicion 2',
				time: {
					day: Days.MONDAY,
					start: '13:30',
					end: '15:00',
				},
			},
		],
	},
];
