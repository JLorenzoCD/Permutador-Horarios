import type { ISchedule, ISubject } from '@/types/Subject';

import { Days } from '@/utils/Days';

// Ejempolo basico sobre una pestaña con sus respectivas materias y horarios de cursado
export const subjectsExample: ISubject[] = [
	{
		id: 1,
		subject: 'Discrete Mathematics I',
		possible_schedules: [
			{
				id: 7,
				name: 'Com. 1',
				time: [
					{
						day: Days.TUESDAY,
						start: '09:00',
						end: '11:00',
						id: 13,
					},
					{
						day: Days.TUESDAY,
						start: '11:00',
						end: '13:00',
						id: 14,
					},
					{
						day: Days.THURSDAY,
						start: '09:00',
						end: '11:00',
						id: 15,
					},
					{
						day: Days.THURSDAY,
						start: '11:00',
						end: '13:00',
						id: 16,
					},
				],
			},
			{
				id: 8,
				name: 'Com. 2',
				time: [
					{
						day: Days.TUESDAY,
						start: '09:00',
						end: '11:00',
						id: 17,
					},
					{
						day: Days.TUESDAY,
						start: '11:00',
						end: '13:00',
						id: 18,
					},
					{
						day: Days.THURSDAY,
						start: '09:00',
						end: '11:00',
						id: 19,
					},
					{
						day: Days.THURSDAY,
						start: '11:00',
						end: '13:00',
						id: 20,
					},
				],
			},
			{
				id: 9,
				name: 'Com. 3',
				time: [
					{
						day: Days.TUESDAY,
						start: '14:00',
						end: '16:00',
						id: 21,
					},
					{
						day: Days.TUESDAY,
						start: '16:00',
						end: '18:00',
						id: 22,
					},
					{
						day: Days.THURSDAY,
						start: '14:00',
						end: '16:00',
						id: 50,
					},
					{
						day: Days.THURSDAY,
						start: '16:00',
						end: '18:00',
						id: 51,
					},
				],
			},
			{
				id: 10,
				name: 'Com. 4',
				time: [
					{
						day: Days.TUESDAY,
						start: '14:00',
						end: '16:00',
						id: 23,
					},
					{
						day: Days.TUESDAY,
						start: '16:00',
						end: '18:00',
						id: 24,
					},
					{
						day: Days.THURSDAY,
						start: '14:00',
						end: '16:00',
						id: 55,
					},
					{
						day: Days.THURSDAY,
						start: '16:00',
						end: '18:00',
						id: 56,
					},
				],
			},
		],
	},
	{
		id: 2,
		subject: 'Introduction to Algorithms I',
		possible_schedules: [
			{
				id: 1,
				name: 'Com. 1',
				time: [
					{
						day: Days.MONDAY,
						start: '09:00',
						end: '13:00',
						id: 1,
					},
					{
						day: Days.WEDNESDAY,
						start: '09:00',
						end: '13:00',
						id: 2,
					},
				],
			},
			{
				id: 2,
				name: 'Com. 2',
				time: [
					{
						day: Days.MONDAY,
						start: '09:00',
						end: '13:00',
						id: 3,
					},
					{
						day: Days.WEDNESDAY,
						start: '09:00',
						end: '13:00',
						id: 4,
					},
				],
			},
			{
				id: 4,
				name: 'Com. 3',
				time: [
					{
						day: Days.MONDAY,
						start: '14:00',
						end: '18:00',
						id: 7,
					},
					{
						day: Days.WEDNESDAY,
						start: '14:00',
						end: '18:00',
						id: 8,
					},
				],
			},
			{
				id: 5,
				name: 'Com. 4',
				time: [
					{
						day: Days.MONDAY,
						start: '14:00',
						end: '18:00',
						id: 9,
					},
					{
						day: Days.WEDNESDAY,
						start: '14:00',
						end: '18:00',
						id: 10,
					},
				],
			},
			{
				id: 3,
				name: 'Com. 5 (Virtual)',
				time: [
					{
						day: Days.MONDAY,
						start: '09:00',
						end: '13:00',
						id: 5,
					},
					{
						day: Days.WEDNESDAY,
						start: '09:00',
						end: '13:00',
						id: 6,
					},
				],
			},
			{
				id: 6,
				name: 'Com. 6 (Virtual)',
				time: [
					{
						day: Days.MONDAY,
						start: '15:00',
						end: '19:00',
						id: 11,
					},
					{
						day: Days.WEDNESDAY,
						start: '15:00',
						end: '19:00',
						id: 12,
					},
				],
			},
		],
	},
	{
		id: 3,
		subject: 'Mathematical Analysis I',
		possible_schedules: [
			{
				id: 11,
				name: 'Com. 1',
				time: [
					{
						day: Days.WEDNESDAY,
						start: '09:00',
						end: '13:00',
						id: 30,
					},
					{
						day: Days.FRIDAY,
						start: '09:00',
						end: '13:00',
						id: 31,
					},
				],
			},
			{
				id: 12,
				name: 'Com. 2',
				time: [
					{
						day: Days.WEDNESDAY,
						start: '09:00',
						end: '13:00',
						id: 32,
					},
					{
						day: Days.FRIDAY,
						start: '09:00',
						end: '13:00',
						id: 33,
					},
				],
			},
			{
				id: 15,
				name: 'Com. 3',
				time: [
					{
						day: Days.WEDNESDAY,
						start: '14:00',
						end: '18:00',
						id: 38,
					},
					{
						day: Days.FRIDAY,
						start: '14:00',
						end: '18:00',
						id: 39,
					},
				],
			},
			{
				id: 16,
				name: 'Com. 4',
				time: [
					{
						day: Days.WEDNESDAY,
						start: '14:00',
						end: '18:00',
						id: 40,
					},
					{
						day: Days.FRIDAY,
						start: '14:00',
						end: '18:00',
						id: 41,
					},
				],
			},
			{
				id: 13,
				name: 'Com. 5 (Virtual)',
				time: [
					{
						day: Days.WEDNESDAY,
						start: '09:00',
						end: '13:00',
						id: 34,
					},
					{
						day: Days.FRIDAY,
						start: '09:00',
						end: '13:00',
						id: 35,
					},
				],
			},
			{
				id: 14,
				name: 'Com. 6 (Virtual)',
				time: [
					{
						day: Days.WEDNESDAY,
						start: '14:00',
						end: '18:00',
						id: 36,
					},
					{
						day: Days.FRIDAY,
						start: '14:00',
						end: '18:00',
						id: 37,
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
