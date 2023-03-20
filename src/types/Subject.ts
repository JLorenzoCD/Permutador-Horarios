export interface ISubject {
	id: number;
	subject: string;
	possible_schedules: ISchedule[];
	rgbColor?: string;
}

export interface ISchedule {
	id: number;
	name: string;
	time: ITimeSchedule;
}

export interface ITimeSchedule {
	day: IDay;
	start: string;
	end: string;
}

export type IDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
