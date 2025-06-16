import React from 'react';
import Link from 'next/link';
import { HiX } from 'react-icons/hi';
import { info } from '@/lib/info';

interface P {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Banner: React.FC<P> = ({ setOpen }) => {
	if (!info.banner) {
		return;
	}

	return (
		<div className='w-full bg-bg-500 p-2'>
			<div className='h-10 bg-accent hover:bg-accent-dark transition-all flex items-center justify-between gap-1 rounded-xl p-2'>
				<div />
				<Link
					href={info.banner.url}
					title={info.banner.text}
					className='focusable rounded-xl w-full center text-xl font-bold uppercase'>
					{info.banner.text}
				</Link>
				<button title='Close' className='icon !p-1' onClick={() => setOpen(false)}>
					<HiX />
				</button>
			</div>
		</div>
	);
};

export default Banner;
