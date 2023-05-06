import type { IDay } from '@/utils/Days';

export interface ISubject {
	id: number;
	subject: string;
	possible_schedules: ISchedule[];
	hexColor?: string;
}

export interface ISchedule {
	id: number;
	name: string;
	time: ITimeSchedule[];
}

export interface ITimeSchedule {
	id: number;
	day: IDay;
	start: string;
	end: string;
}
