'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { useLightbox } from '@/providers/Lightbox';

interface P extends React.HTMLAttributes<HTMLDivElement> {
	items: { image: string }[];
	className?: string;
}

const Showcase: React.FC<P> = ({ items, className, ...props }) => {
	const { openLightbox } = useLightbox();

	return (
		<div className={clsx('flex justify-center gap-5 flex-wrap', className)} {...props}>
			{items.map((item, j) => {
				return (
					<Image
						onClick={() => openLightbox(item, items)}
						key={j}
						src={item.image}
						sizes='50vw'
						width={0}
						height={0}
						draggable={false}
						className='object-cover w-full sm:w-1/3 xl:w-1/4 h-auto rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform'
						alt=''
					/>
				);
			})}
		</div>
	);
};

export default Showcase;
