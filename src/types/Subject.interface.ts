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
	day: Day;
	start: string;
	end: string;
}

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
