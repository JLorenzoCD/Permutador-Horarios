import { Days } from '../utils/Days';

export interface Subject {
	id: number;
	subject: string;
	possible_schedules: Schedule[];
}

export interface Schedule {
	id: number;
	name: string;
	time: TimeSchedule;
}

export interface TimeSchedule {
	day: Days;
	start: string;
	end: string;
}
