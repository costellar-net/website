'use client';

import Anchor from '@/components/ui/Anchor';
import { info } from '@/lib/info';
import { AnimatePresence, m } from 'motion/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const included = [
	{
		title: 'Bug Fixes',
		description: 'We promptly resolve any bugs or technical issues that arise on your website to ensure smooth operation.',
	},
	{
		title: 'Basic Content Addition',
		description: 'Add or update simple content such as text, images, or links to keep your site fresh and relevant.',
	},
	{
		title: 'Request of Advanced Content (paid extra)',
		description: 'Request more complex features or content, such as new pages or custom functionality, for an additional fee.',
	},
	{
		title: 'Check-ins',
		description: 'Regularly scheduled reviews of your website to ensure everything is running optimally.',
	},
	{
		title: 'SEO Updates',
		description: "Ongoing improvements to your site's search engine optimization to help you stay visible online.",
	},
];

const Page: React.FC = () => {
	const [shown, setShown] = useState<string>();

	return (
		<div className='w-full center flex-col'>
			<div className='w-[90%] center py-20 flex flex-col'>
				<p className='text-xl text-center'>What&apos;s included in</p>
				<h1 className='text-center text-4xl font-bold'>Site Management</h1>
			</div>

			<div className='w-[90%] md:w-1/2 flex flex-col flex-wrap gap-3 min-h-[45vh]'>
				<div className='flex flex-col'>
					<h2 className='text-3xl font-bold'>It&apos;s our plan to keep you up to date.</h2>
					<p className='leading-tight text-dark-900/60 dark:text-highlight-900 md:text-lg'>
						So we&apos;ve made a plan just for you. Every month you pay for this plan, we will make sure your site gets:
					</p>
				</div>

				{included.map((item, i) => {
					return (
						<div
							className='flex flex-col gap-3 bg-lowlight-100 hover:bg-lowlight-200 dark:bg-highlight-100 hover:dark:bg-highlight-200 p-5 rounded-xl cursor-pointer transition-colors'
							key={i}
							onClick={() => setShown((prev) => (prev === item.description ? undefined : item.description))}>
							<div className='flex gap-3 items-center justify-between'>
								<div className='flex gap-1 items-center'>
									<HiChevronDown />
									<p className='text-2xl'>{item.title}</p>
								</div>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' className='size-8 fill-green-600'>
									<path d='m421-443-60-60q-17-17-42-17t-42 17q-17 17-16.5 42t17.5 42l98 98q19.36 19 45.18 19T466-321l211-211q17-17 17-41.5T677-615q-17-17-42-17t-42 17L421-443Zm59 397q-91 0-169.99-34.08-78.98-34.09-137.41-92.52-58.43-58.43-92.52-137.41Q46-389 46-480q0-91 34.08-169.99 34.09-78.98 92.52-137.41 58.43-58.43 137.41-92.52Q389-914 480-914q91 0 169.99 34.08 78.98 34.09 137.41 92.52 58.43 58.43 92.52 137.41Q914-571 914-480q0 91-34.08 169.99-34.09 78.98-92.52 137.41-58.43 58.43-137.41 92.52Q571-46 480-46Z' />
								</svg>
							</div>

							<AnimatePresence>
								{shown === item.description && (
									<m.p
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0, marginTop: -12 }}
										transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
										className='leading-[1.15]'>
										{item.description}
									</m.p>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>

			<div className='w-full py-10 center bg-gradient-to-b from-light-800 dark:from-dark-600 mt-10 md:mt-20'>
				<div className='w-full md:w-1/2 flex justify-center max-sm:flex-col gap-15 px-5'>
					<div className='flex flex-col gap-5'>
						<p className='text-center text-3xl font-title font-bold'>If you&apos;re interested</p>
						<Anchor href='/quote' variant='Filled'>
							Get a Free Quote
						</Anchor>
					</div>
					<div className='flex flex-col'>
						<p className='text-center text-3xl font-bold'>Already have a site?</p>
						<p className='mb-5 leading-tight text-dark-900/60 dark:text-highlight-900 max-sm:text-center'>
							Email us today at {info.contact?.email}
						</p>
						{info.contact && (
							<Link
								className='button'
								aria-label='Form'
								href={`mailto:${info.contact.email}`}
								style={{ '--color': 'var(--accent-opacity)' } as React.CSSProperties}>
								Email Us
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
