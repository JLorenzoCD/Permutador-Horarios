import type { TimeSchedule, Subject, Day, Schedule } from '../types/Subject.interface';

/*
La idea es crear una matriz en la cual las filas sean "los dias" y las columnas "los posibles horarios", y una vez que el usuario coloque todos los datos sobre las materias y sus posibles horarios, recorrer cada uno para crear todos los posibles
*/

type Matrix = (number | string)[][];
export default class GenerateSchedules {
	subjects: Subject[];
	allTimes: TimeSchedule[] = [];
	scheduleIds: number[] = [];

	min = 24;
	max = 0;
	rango: number;

	valueInMinutesPerColumn: number;
	daysThatCouldBeOccupied: {
		[key: string]: number;
	} = {};

	numberOfRows: number = 0;
	numberOfColumns: number = 0;
	scheduleMatrix: Matrix;

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

		this.setAllTimes();

		this.setMinAndMax();
		this.rango = this.max - this.min;

		this.valueInMinutesPerColumn = valueInMinutesPerColumn;
		this.setDaysThatCouldBeOccupied();

		this.setDimensionOfTheScheduleMatrix();
		this.scheduleMatrix = this.generateScheduleMatrix();
	}

	setAllTimes() {
		let allTimes: TimeSchedule[] = [];
		let scheduleIds: number[] = [];

		this.subjects.forEach((subject) => {
			scheduleIds.push(subject.id);
			subject.possible_schedules.forEach((schedule) => {
				allTimes.push(schedule.time);
			});
		});

		this.scheduleIds = scheduleIds;
		this.allTimes = allTimes;
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
		// Se suma 1 por si hay minutos
		this.max = max + 1;
	}

	setDaysThatCouldBeOccupied() {
		const memorization: { [key: string]: number } = {};

		this.allTimes.forEach((time) => {
			if (time.day in memorization) return;
			const indexDay = this.days[time.day];
			memorization[time.day] = indexDay;
		});
		this.daysThatCouldBeOccupied = { ...memorization };
	}

	getNumberOfColumns() {
		return (this.rango * 60) / this.valueInMinutesPerColumn;
	}

	setDimensionOfTheScheduleMatrix() {
		this.numberOfRows = Object.keys(this.daysThatCouldBeOccupied).length;
		this.numberOfColumns = this.getNumberOfColumns();
	}

	generateScheduleMatrix() {
		return new Array(this.numberOfRows).fill(new Array(this.numberOfColumns).fill(-1));
	}

	generateAllPossibleSchedules() {
		const subjects = [...this.subjects];

		if (subjects.length === 0) return;
		const zeroMatter = subjects.shift() as Subject;

		const allPossibleSchedules: Matrix[] = [];

		zeroMatter.possible_schedules.forEach((schedule) => {
			const copyScheduleMatrix: Matrix = JSON.parse(JSON.stringify(this.scheduleMatrix));

			const { row, columEnd, columStart } = this.getThePositionOfScheduleInMatrix(schedule);

			for (let i = columStart; i <= columEnd; i++) {
				copyScheduleMatrix[row][i] = `${zeroMatter.id}-${schedule.id}`;
			}

			// Recorrer cada una de las otras materias
			const subjectsToCover = [...subjects];
			this.completeMatrix(copyScheduleMatrix, subjectsToCover, allPossibleSchedules);
		});
		return allPossibleSchedules;
	}
	private validateScheduleMatrix(scheduleMatrix: Matrix) {
		const ids: number[] = [];
		scheduleMatrix.forEach((row) => {
			row.forEach((colum) => {
				if (colum === -1) return;
				const subjectId = parseInt(colum.toString().split('-')[0]);

				if (!ids.includes(subjectId)) {
					ids.push(subjectId);
				}
			});
		});

		const scheduleIds = [...this.scheduleIds];

		ids.sort();
		scheduleIds.sort();

		return ids.length === scheduleIds.length && ids.every((id, index) => id === scheduleIds[index]);
	}

	private getColumsTimeSchedule(timeStart: string, timeEnd: string) {
		const [startHour, startMinute] = timeStart.split(':').map((str) => parseInt(str));
		const [endHour, endMinute] = timeEnd.split(':').map((str) => parseInt(str));

		let columStart = ((startHour - this.min) * 60) / this.valueInMinutesPerColumn;

		let columEnd = ((endHour - this.min) * 60) / this.valueInMinutesPerColumn;

		if (startMinute <= this.valueInMinutesPerColumn) {
			columStart += 1;
		} else if (startMinute > this.valueInMinutesPerColumn) {
			columStart += 2;
		}

		if (endMinute <= this.valueInMinutesPerColumn && endMinute !== 0) {
			columEnd += 1;
		} else if (endMinute > this.valueInMinutesPerColumn) {
			columEnd += 2;
		}

		return {
			columStart,
			columEnd,
		};
	}

	private getThePositionOfScheduleInMatrix(schedule: Schedule) {
		const row = this.daysThatCouldBeOccupied[schedule.time.day];
		const { columStart, columEnd } = this.getColumsTimeSchedule(schedule.time.start, schedule.time.end);

		return { row, columStart, columEnd };
	}

	private completeMatrix(scheduleMatrix: Matrix, subjects: Subject[], allPossibleSchedules: Matrix[]) {
		const subject = subjects.shift();
		if (!subject) return;

		subject.possible_schedules.forEach((schedule) => {
			const copyScheduleMatrix: Matrix = JSON.parse(JSON.stringify(scheduleMatrix));

			const { row, columEnd, columStart } = this.getThePositionOfScheduleInMatrix(schedule);

			for (let i = columStart; i <= columEnd; i++) {
				copyScheduleMatrix[row][i] = `${subject.id}-${schedule.id}`;
			}

			if (subjects.length === 0) {
				// Corroborar que de que esten todos los ids de las materias en copyScheduleMatrix de scheduleIds
				const isValid = this.validateScheduleMatrix(copyScheduleMatrix);
				if (isValid) allPossibleSchedules.push(copyScheduleMatrix);
				return;
			}

			// Seguir completando la scheduleMatrix con las demas materias
			this.completeMatrix(copyScheduleMatrix, subjects, allPossibleSchedules);
		});
	}
}
