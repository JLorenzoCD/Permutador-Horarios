import { useEffect, useState } from 'react';

import generateRandomColor from '@/utils/generateRandomColor';
import GenerateSchedules, { IPossibleSchedule } from '@/utils/GenerateSchedules';

import FramePossibleSchedule from './FramePossibleSchedule';
import Spinner from './Spinner';

interface Props {
	data: GenerateSchedules;
}
function PossibleSchedules({ data }: Props) {
	const [allPossibleSchedules, setallPossibleSchedules] = useState<IPossibleSchedule[]>([]);
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			(() => {
				data.getAllPossibleSchedules();
				setallPossibleSchedules(data.allPossibleSchedules);
				setLoading(false);
			})();
		} catch (err) {
			console.error(err);
			setError((err as Error).message);
		}
	}, []);

	if (error) {
		return (
			<>
				<p>Error: {error}</p>
			</>
		);
	}

	if (loading) {
		return (
			<div className='mt-5'>
				<Spinner />
			</div>
		);
	}

	const hoursArr = data.getTimeColumnInStringFormat();

	const subjects = data.subjects.map((subject) => {
		subject.hexColor = generateRandomColor();
		return subject;
	});

	return (
		<div>
			{allPossibleSchedules.length !== 0 ? (
				<>
					<h2 className='text-3xl font-bold underline mb-5'>
						{allPossibleSchedules.length} possible schedules have been generated
					</h2>
					{allPossibleSchedules.map((possibleSchedule, i) => (
						<FramePossibleSchedule data={possibleSchedule} key={i} hoursArr={hoursArr} subjects={subjects} />
					))}
				</>
			) : (
				<>
					<h2 className='text-3xl font-bold underline'>
						With the subjects and commissions given, no schedule could be generated
					</h2>
				</>
			)}
		</div>
	);
}

export default PossibleSchedules;
