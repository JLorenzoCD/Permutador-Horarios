import type { TimeSchedule, Subject } from '../types/Subject.interface';

/*
La idea es crear una matriz en la cual las filas sean "los dias" y las columnas "los posibles horarios", y una vez que el usuario coloque todos los datos sobre las materias y sus posibles horarios, recorrer cada uno para crear todos los posibles
*/

export default class GenerateSchedules {
	subjects: Subject[];
	allTimes: TimeSchedule[];
	min = 24;
	max = 0;
	rango: number;

	valueInMinutesPerColumn: number;
	daysThatCouldBeOccupied: {
		[key: number]: string;
	};
	numberOfRows: number;
	numberOfColumns: number;
	scheduleMatrix: number[][];
	days = {
		Monday: 0,
		Tuesday: 1,
		Wednesday: 2,
		Thursday: 3,
		Friday: 4,
		Saturday: 5,
		Sunday: 6,
	};

	constructor(subjects: Subject[], valueInMinutesPerColumn = 30) {
		this.subjects = subjects;

		this.allTimes = this.getAllTimes();

		this.setMinAndMax();
		this.rango = this.max - this.min;

		this.valueInMinutesPerColumn = valueInMinutesPerColumn;
		this.daysThatCouldBeOccupied = this.getDaysThatCouldBeOccupied();

		this.numberOfRows = Object.keys(this.daysThatCouldBeOccupied).length;
		this.numberOfColumns = this.getNumberOfColumns();

		this.scheduleMatrix = this.generateScheduleMatrix();
	}

	getAllTimes() {
		let allTimes: TimeSchedule[] = [];

		this.subjects.forEach((subject) => {
			subject.possible_schedules.forEach((schedule) => {
				allTimes.push(schedule.time);
			});
		});

		return allTimes;
	}
	setMinAndMax() {
		let min: number = 24,
			max: number = 0;

		this.allTimes.forEach((time) => {
			const timeStart = parseInt(time.start.split(':')[0]);
			const timeEnd = parseInt(time.end.split(':')[0]);

			if (min == 24 && max == 0) {
				min = timeStart;
				max = timeEnd;
				return;
			}

			if (timeStart < min) {
				min = timeStart;
				return;
			}

			if (timeEnd > max) {
				max = timeEnd;
				return;
			}
		});

		this.min = min;
		this.max = max;
	}
	getNumberOfColumns() {
		return (this.rango * 60) / this.valueInMinutesPerColumn;
	}

	getDaysThatCouldBeOccupied() {
		const memorization: { [key: number]: string } = {};
		this.allTimes.forEach((time) => {
			if (time.day in memorization) return;
			const indexDay = this.days[time.day];
			memorization[indexDay] = time.day;
		});
		return memorization;
	}

	generateScheduleMatrix() {
		return new Array(this.numberOfRows).fill(new Array(this.numberOfColumns).fill(-1));
	}
}
