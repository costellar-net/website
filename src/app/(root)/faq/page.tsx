'use client';

import Email from '@/components/Email';
import Anchor from '@/components/ui/Anchor';
import { info } from '@/lib/info';
import { AnimatePresence, m } from 'motion/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const faq = [
	{
		title: 'Does Costellar provide a fair price?',
		description:
			"We believe we do, because you will recieve something hand-coded and completely custom. By this we mean that it isn't just another wix or wordpress site. We are always transparent, send you the entire code, and genuinly try to get you the best website possible.",
	},
	{
		title: 'Do I need the management plan from Costellar?',
		description:
			"No, since we send you the code and transfer the services that power the website, you have full freedom to do whatever you like. Of course, if you don't know how to code you will have a couple options like AI, hiring a SWE/Freelancer, learning code, etc. This service aims at more tech oriented people that what the heavy lifting done for them.",
	},
	{
		title: 'Are check-ins scheduled?',
		description:
			'No, we believe there\'s no big benefit of this since we code websites for long term reliability. You can always shoot us a message/email and we are happy to help. This serves more as a "patch new vulnerability" or "fix outage". ',
	},
	{
		title: 'How much is the management plan?',
		description:
			'It depends on how active/how many features you request. There is usually a base and we charge you per advanced feature but you can expect at least a $100 per month cost.',
	},
	{
		title: 'Does Costellar guarantee certain numbers/targets?',
		description:
			'No, obviously we aim for the best website we can but your how well your business, service, and advertisement is, all compose the actual traction to the website. We purely provide the website: not advertisements, not social media marketing, no other services.',
	},
];

const Page: React.FC = () => {
	const [shown, setShown] = useState<string>();

	return (
		<div className='w-full center flex-col'>
			<div className='w-[90%] center py-20 flex flex-col'>
				<h1 className='text-center text-4xl font-bold'>Frequently Asked Questions</h1>
				<p className='text-xl text-center'>
					Please let us know if you have any other questions at <Email />
				</p>
			</div>

			<div className='w-[90%] md:w-1/2 flex flex-col flex-wrap gap-3 min-h-[45vh]'>
				{faq.map((item, i) => {
					return (
						<div
							className='flex flex-col gap-3 bg-lowlight-100 hover:bg-lowlight-200 dark:bg-highlight-100 hover:dark:bg-highlight-200 p-5 rounded-xl cursor-pointer transition-colors'
							key={i}
							onClick={() => setShown((prev) => (prev === item.description ? undefined : item.description))}>
							<div className='flex gap-1 items-center'>
								<HiChevronDown />
								<p className='text-xl'>{item.title}</p>
							</div>

							<AnimatePresence>
								{shown === item.description && (
									<m.p
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0, marginTop: -12 }}
										transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
										className='text-lg'>
										{item.description}
									</m.p>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>

			<div className='w-full py-10 center bg-linear-to-b from-light-800 dark:from-dark-600 mt-10 md:mt-20'>
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
