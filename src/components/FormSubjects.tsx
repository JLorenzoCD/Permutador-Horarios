import { Days } from '../utils/Days';

import Button from './Button';

import FromSubjectsUtils from '../utils/components/FromSubjects';

import type { ISchedule, ISubject } from '../types/Subject';

interface Props {
	subjects: ISubject[];
	addSubject: (newSubject: ISubject) => void;
	addSchedule: (subjectId: number, newSchedule: ISchedule) => void;
}
function FormSubjects({ subjects, addSubject, addSchedule }: Props) {
	const { subject, schedule, handleChangeSubject, handleChangeSchedule, createSubject, createSchedule } =
		FromSubjectsUtils(subjects);

	return (
		<div>
			<form onSubmit={createSubject(addSubject)}>
				<h2 className='text-2xl'>Create new Subject</h2>
				<label className='block'>
					Subject:
					<input
						className='border ml-2'
						type='text'
						value={subject.subject}
						name='subject'
						onChange={handleChangeSubject}
					/>
				</label>
				<label className='block'>
					Color
					<input
						type='color'
						name='hexColor'
						className='ml-2'
						value={subject.hexColor}
						onChange={handleChangeSubject}
					/>
				</label>
				<Button type='submit'>Crear</Button>
			</form>
			<br />

			<form onSubmit={createSchedule(addSchedule)}>
				<h2 className='text-2xl'>Create new Schedule</h2>

				<label className='block'>
					Select Subject
					<select name='subjectId' value={schedule.subjectId} onChange={handleChangeSchedule} className='border ml-2'>
						{subjects &&
							subjects.map((subject) => (
								<option key={subject.id} value={subject.id}>
									{subject.subject}
								</option>
							))}
					</select>
				</label>

				<label className='block'>
					Schedule
					<input
						type='text'
						name='name'
						className='border ml-2'
						value={schedule.name}
						onChange={handleChangeSchedule}
					/>
				</label>
				<label className='block'>
					Select day
					<select name='day' value={schedule.time.day} onChange={handleChangeSchedule} className='border ml-2'>
						<option value={Days.MONDAY}>{Days.MONDAY}</option>
						<option value={Days.TUESDAY}>{Days.TUESDAY}</option>
						<option value={Days.WEDNESDAY}>{Days.WEDNESDAY}</option>
						<option value={Days.THURSDAY}>{Days.THURSDAY}</option>
						<option value={Days.FRIDAY}>{Days.FRIDAY}</option>
						<option value={Days.SATURDAY}>{Days.SATURDAY}</option>
						<option value={Days.SUNDAY}>{Days.SUNDAY}</option>
					</select>
				</label>
				<label className='block'>
					Hora de comienzo
					<input
						type='time'
						name='start'
						onChange={handleChangeSchedule}
						value={schedule.time.start}
						className='border ml-2'
					/>
				</label>
				<label className='block'>
					Hora de finalizacion
					<input
						type='time'
						name='end'
						onChange={handleChangeSchedule}
						value={schedule.time.end}
						className='border ml-2'
					/>
				</label>

				<Button type='submit'>Crear</Button>
			</form>
		</div>
	);
}

export default FormSubjects;
