'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, m } from 'motion/react';

interface P extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	label: React.ReactNode;
	delay?: number;
}

/**
 * @param delay - in milliseconds
 */
const Tooltip: React.FC<P> = ({ children, label, delay = 500, ...props }) => {
	const [open, setOpen] = useState(false);
	const openTimeout = React.useRef<NodeJS.Timeout | null>(null);
	const uuid = Math.random();

	const handleMouseEnter = () => {
		openTimeout.current = setTimeout(() => setOpen(true), delay);
	};

	const handleMouseLeave = () => {
		if (openTimeout.current) {
			clearTimeout(openTimeout.current);
			openTimeout.current = null;
		}
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			if (openTimeout.current) {
				clearTimeout(openTimeout.current);
			}
		};
	}, []);

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
			<AnimatePresence>
				{open && (
					<m.div
						key={uuid}
						initial={{ opacity: 0, y: 10, rotateX: 45 }}
						animate={{ opacity: 1, y: 0, rotateX: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, type: 'spring', bounce: 0 }}
						style={{ transformPerspective: 1200 }}
						className='z-100 font-bold rounded-xl pointer-events-none center absolute left-0 top-[calc(100%+5px)] bottom-full px-3 py-4 whitespace-nowrap bg-stone-950/90 text-light-800'>
						{label}
					</m.div>
				)}
				{children}
			</AnimatePresence>
		</div>
	);
};

export default Tooltip;
