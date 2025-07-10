import Anchor from '@/components/ui/Anchor';
import type { Website } from '@/types/website';
import React from 'react';
import { HiArrowUp, HiCheckCircle, HiDownload, HiRefresh } from 'react-icons/hi';

const status = [
	{ status: 'Received', icon: <HiDownload /> },
	{ status: 'Working', icon: <HiArrowUp /> },
	{ status: 'Revising', icon: <HiRefresh /> },
	{ status: 'Complete', icon: <HiCheckCircle /> },
];

interface P {
	website: Website;
}

const Setup: React.FC<P> = ({ website }) => {
	const current = status[website.status];

	return (
		<>
			<div className='flex flex-col gap-1'>
				<h1 className='text-3xl font-title font-bold'>Setup {website.name}</h1>
				<Anchor href={website.url} openInNew>
					View {website.url}
				</Anchor>
			</div>
			<div className='flex flex-col w-full gap-2 text-xl'>
				<div className='flex gap-2 items-center'>
					{React.cloneElement(current.icon, { className: 'size-6' })}
					<p className='text-2xl font-title font-bold'>{current.status}</p>
				</div>
				{/* Progress Bar */}
				<div className='w-full h-1 bg-dark-400 rounded-full overflow-hidden'>
					<div
						className='h-full bg-accent transition-all duration-300'
						style={{
							width: `${((status.indexOf(current) + 1) / status.length) * 100}%`,
						}}
					/>
				</div>
				<p></p>
			</div>
		</>
	);
};

export default Setup;
