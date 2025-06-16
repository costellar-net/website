'use client';

import React from 'react';
import Hero from './Hero';
import { m } from 'motion/react';
import { features } from '@/lib/features';
import Link from 'next/link';
import { TbArrowRight, TbCircleCheckFilled } from 'react-icons/tb';

export default function Home() {
	return (
		<>
			<Hero />

			<div className='px-1 py-20 w-full center'>
				<m.div
					initial={{ opacity: 0, scale: 0.75 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ type: 'spring', duration: 0.7 }}
					className='flex flex-col gap-5 text-center'>
					<h2 className='text-4xl sm:text-5xl font-bold font-title'>What We Offer</h2>
					<div className='mt-5 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-5'>
						{features.map((item, i) => {
							return (
								<m.div
									initial={{ opacity: 0, scale: 0.75, y: 20 }}
									whileInView={{ opacity: 1, scale: 1, y: 0 }}
									className='flex gap-5 items-center justify-between bg-lowlight-100 dark:bg-highlight-100 py-2 px-5 sm:py-5 rounded-xl'
									key={i}>
									<p className='text-lg sm:text-2xl'>{item.name}</p>
									<TbCircleCheckFilled className='fill-green-600 size-8' />
								</m.div>
							);
						})}
						<Link
							href='/features'
							title='See All'
							className='flex gap-5 items-center justify-between bg-lowlight-100 dark:bg-highlight-100 py-2 px-5 sm:py-5 rounded-xl hover:bg-lowlight-200 hover:dark:bg-highlight-200 focus-visible:dark:bg-highlight-200 focus-visible:bg-lowlight-200 transition-all text-link'>
							<p className='text-lg sm:text-2xl'>See All</p>
							<TbArrowRight className='size-8' />
						</Link>
					</div>
				</m.div>
			</div>

			{/* <video
						className='object-cover size-full absolute'
						style={{
							maskImage: 'linear-gradient(to right, #0006 5%, #000 20%, #000 80%, #0006 95%)',
						}}
						playsInline
						autoPlay
						muted
						loop
						src='/galaxy.mp4'
					/> */}

			<div className='px-1 py-20 w-full center bg-gradient-to-b from-light-800 dark:from-dark-600'>
				<div className='flex flex-col gap-10 items-center'>
					<h3 className='text-5xl font-bold text-center'>What&apos;s the price?</h3>
					<Link
						className='button'
						aria-label='Form'
						href='/quote'
						style={{ '--color': 'var(--accent-opacity)' } as React.CSSProperties}>
						Talk Today
					</Link>
				</div>
			</div>
		</>
	);
}
