'use client';

import clsx from 'clsx';
import { AnimatePresence, m } from 'motion/react';
import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { TbCircleCheckFilled } from 'react-icons/tb';

interface P extends React.HTMLAttributes<HTMLDivElement> {
	items: {
		icon?: React.ReactNode;
		name: string;
		description: React.ReactNode;
	}[];
}

const Accordion: React.FC<P> = ({ items }) => {
	const [shown, setShown] = useState<string>();

	return items.map((item, i) => {
		return (
			<div
				className='flex gap-2 flex-col w-full pt-3 cursor-pointer overflow-hidden'
				onClick={() => setShown((prev) => (prev === item.name ? undefined : item.name))}
				key={i}>
				<div className={clsx('flex items-center justify-between group', shown && shown !== item.name && 'opacity-50')}>
					<div className='flex gap-2 items-center'>
						{item.icon ? item.icon : <TbCircleCheckFilled className='fill-green-600 size-5' />}
						<p className='select-none group-hover:underline'>{item.name}</p>
					</div>
					<HiChevronDown className='size-5 self-end fill-lowlight-900 dark:fill-highlight-900' />
				</div>

				<AnimatePresence>
					{shown === item.name && (
						<m.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0, marginTop: -8 }}
							className='leading-[1.15] opacity-90'>
							{item.description}
						</m.div>
					)}
				</AnimatePresence>
				<hr className='hr mt-1' />
			</div>
		);
	});
};

export default Accordion;
