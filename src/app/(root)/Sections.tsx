'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Grid from './Grid';
import Link from 'next/link';

const words = [
	{
		name: 'Quality',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
				<path d='M440-52v-410L86-663v335q0 34 17 63t46 46L440-52Zm80 0 291-167q29-17 46-46t17-63v-337L520-463v411Zm174-602 134-77-285-164q-29-17-63-17t-63 17l-71 41 348 200ZM479-531l133-76-347-201-135 78 349 199Z' />
			</svg>
		),
		start: '#1e99e6',
		stop: '#0068a7',
	},
	{
		name: 'Blazingly Fast',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
				<path d='m43-569 182-184q23-23 53-31.5t62-2.5l56 11q-60 72-97 134t-75 150L43-569Zm254 102q40-94 86-165.5T486-761q87-87 209-130.5T932-920q15 115-28 237T774-474q-57 57-128.5 103.5T480-284L297-467Zm317-135q21 21 51.5 21t51.5-21q21-21 21-51t-21-51q-21-21-51.5-21T614-704q-21 21-21 51t21 51ZM582-31l-78-181q88-38 150-75t134-97l11 57q6 32-2.5 61.5T765-213L582-31ZM119-316q45-45 107-45t107 45q45 45 45 107t-45 107q-33 33-112 56T30-13q10-112 33-191t56-112Z' />
			</svg>
		),
		start: '#f9bd52',
		stop: '#ff230d',
	},
	{
		name: 'Modern',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
				<path d='M272-74v-126h145v-83q-49-14-89-43.5T265-401q-99 5-168-66.5T28-640v-40q0-53 36.5-89.5T154-806h80v-80h492v80h80q53 0 89.5 36.5T932-680v40q0 101-69 172.5T695-401q-23 45-63 74.5T543-283v83h145v126H272Zm-38-454v-152h-80v40q0 38 22 68.5t58 43.5Zm492 0q36-13 58-43.5t22-68.5v-40h-80v152Z' />
			</svg>
		),
		start: '#e915bb',
		stop: '#8c26b4',
	},
	{
		name: 'Functional',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
				<path d='m197-495-13-65q-9.45-4.06-17.73-8.53Q158-573 150-579l-62 19-52-89 50-43q-2-9.25-2-18.5t2-18.5l-50-43 52-90 62 20q8-6 16.27-10.47 8.28-4.47 17.73-8.53l13-65h105l13 65q9.45 4.06 17.73 8.53Q341-848 349-842l62-20 52 90-50 43q2 9.25 2 18.5t-2 18.5l50 43-52 89-62-19q-8 6-16.27 10.47-8.28 4.47-17.73 8.53l-13 65H197Zm52.21-143q29.79 0 51.29-21.42t21.5-51.5Q322-741 300.58-762t-51.5-21Q219-783 198-761.79t-21 51q0 29.79 21.21 51.29t51 21.5ZM600-9l-18-84q-24-7-46-19.5T497-143l-80 28-56-96 64-56q-6-25-6-50t6-50l-64-56 56-96 80 28q17-18 39-30.5t46-19.5l18-84h112l18 84q24 7 45.5 19.5T814-491l80-28 56 96-64 56q6 25 6 50t-6 50l64 56-56 96-80-28q-17 18-38.5 30.5T730-93L712-9H600Zm56-200q45 0 76-31.5t31-76.5q0-45-31.21-76.5T656-425q-45 0-76.5 31.5T548-317q0 45 31.5 76.5T656-209Z' />
			</svg>
		),
		start: '#a9c2fd',
		stop: '#ee8a93',
	},
];

const Sections: React.FC = () => {
	const [index, setIndex] = useState(0);
	const duration = 2;

	useEffect(() => {
		const tick = () => {
			setIndex((prevIndex) => (prevIndex + 1) % words.length);
		};
		const timer = setInterval(tick, duration * 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<div className='px-1 py-20 w-full flex justify-center items-center'>
				<m.div
					initial={{ opacity: 0, scale: 0.75 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: 'spring', duration: 0.7 }}
					className='p-[5%] sm:mx-[5%] center bg-[var(--bg-high)] rounded-3xl sm:w-3/4'>
					<div className='flex flex-col gap-5 text-center'>
						<p className='text-4xl lg:text-7xl font-bold'>Finally a website that&apos;s {''}</p>
						<AnimatePresence mode='wait'>
							<m.div
								key={index}
								initial={{ opacity: 0, scale: 1.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5 }}
								className='flex items-center gap-5 justify-center'>
								<p
									className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold glow !leading-tight'
									style={{ '--start': words[index].start, '--stop': words[index].stop } as React.CSSProperties}>
									{words[index].name}.
								</p>
							</m.div>
						</AnimatePresence>
					</div>
				</m.div>
			</div>

			<div className='px-1 py-20 w-full center'>
				<m.div
					initial={{ opacity: 0, scale: 0.75 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: 'spring', duration: 0.7 }}
					className='flex flex-col gap-5 text-center'>
					<p className='text-5xl font-bold'>What We Offer</p>
					<Grid />
				</m.div>
			</div>

			<div className='px-1 py-20 w-full center'>
				<m.div
					initial={{ opacity: 0, scale: 0.75 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: 'spring', duration: 0.7 }}
					className='p-[5%] size-11/12 center bg-[var(--space)] text-[var(--bg-high)] rounded-3xl overflow-hidden'>
					<video
						className='object-cover size-full absolute'
						style={{
							maskImage: 'linear-gradient(to right, #0006 5%, #000 20%, #000 80%, #0006 95%)',
						}}
						playsInline
						autoPlay
						muted
						loop
						src='/galaxy.mp4'
					/>
					<div className='flex flex-col gap-10 items-center'>
						<p className='text-5xl font-bold text-center'>What&apos;s the price?</p>
						<Link
							className='button'
							aria-label='Form'
							href='/quoting'
							style={{ '--color': 'var(--accent-opacity)' } as React.CSSProperties}>
							Talk Today
						</Link>
					</div>
				</m.div>
			</div>
		</>
	);
};

export default Sections;
