import type { ISchedule, ISubject } from '../types/Subject';

import { Days } from '../utils/Days';

// Ejempolo basico sobre una pestaña con sus respectivas materias y horarios de cursado
export const subjectsExample: ISubject[] = [
	{
		id: 1,
		subject: 'Mathematics',
		possible_schedules: [
			{
				id: 1,
				name: 'Comicion 1',
				time: [
					{
						day: Days.THURSDAY,
						start: '08:30',
						end: '10:00',
						id: 1,
					},
					{
						day: Days.SATURDAY,
						start: '08:30',
						end: '10:00',
						id: 2,
					},
				],
			},
			{
				id: 2,
				name: 'Comicion 2',
				time: [
					{
						day: Days.TUESDAY,
						start: '13:30',
						end: '15:00',
						id: 3,
					},
					{
						day: Days.MONDAY,
						start: '13:30',
						end: '15:00',
						id: 4,
					},
				],
			},
			{
				id: 3,
				name: 'Comicion 3',
				time: [
					{
						day: Days.WEDNESDAY,
						start: '13:30',
						end: '15:00',
						id: 5,
					},
				],
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
				time: [
					{
						day: Days.MONDAY,
						start: '08:30',
						end: '10:00',
						id: 6,
					},
					{
						day: Days.FRIDAY,
						start: '10:30',
						end: '12:00',
						id: 7,
					},
				],
			},
			{
				id: 5,
				name: 'Comicion 2',
				time: [
					{
						day: Days.MONDAY,
						start: '13:30',
						end: '15:00',
						id: 8,
					},
				],
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
				time: [
					{
						day: Days.MONDAY,
						start: '10:30',
						end: '12:00',
						id: 9,
					},
					{
						day: Days.WEDNESDAY,
						start: '08:30',
						end: '10:00',
						id: 10,
					},
				],
			},
			{
				id: 7,
				name: 'Comicion 2',
				time: [
					{
						day: Days.TUESDAY,
						start: '11:00',
						end: '13:30',
						id: 11,
					},
				],
			},
		],
	},
];

export const defaultSubject: ISubject = {
	id: 0,
	subject: '',
	possible_schedules: [],
};

export const defaultScheduleTime = {
	day: Days.MONDAY,
	start: '08:00',
	end: '10:00',
	id: 0,
};

export const defaultSchedule: ISchedule = {
	id: 0,
	name: '',
	time: [{ ...defaultScheduleTime }],
};
