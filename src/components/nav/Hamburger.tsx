'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m } from 'motion/react';
import { info, Sitemap } from '@/lib/info';
import clsx from 'clsx';
import { TbArrowLeft, TbArrowRight } from 'react-icons/tb';
import Image from 'next/image';

interface P {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hamburger: React.FC<P> = ({ open, setOpen }) => {
	const [flyout, setFlyout] = useState<Sitemap.Group>();
	const pathname = usePathname();

	const renderGroup = (group: Sitemap.Group, i: number) => {
		if (group.exempt) return null;

		const delay = i * 0.05 + 0.05;

		if (group.items) {
			return (
				<m.button
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay, type: 'spring', bounce: 0, duration: 0.3 }}
					key={i}
					title={group.title}
					onClick={() => setFlyout(group)}
					className='pt-2 pb-4 px-6 hover:bg-highlight-200 rounded-xl transition-colors focusable flex flex-col items-start text-light-700 cursor-pointer'>
					<div className='flex justify-between items-center w-full'>
						<p className='text-3xl md:text-5xl font-title font-black'>{group.title}</p>
						{group.icon ?? <TbArrowRight className='size-8 md:size-14' />}
					</div>
					<p className='text-light-100'>{group.description}</p>
				</m.button>
			);
		}

		if (group.callback) {
			return (
				<m.button
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay, type: 'spring', bounce: 0, duration: 0.3 }}
					key={i}
					title={group.title}
					onClick={group.callback}
					className='py-4 px-6 hover:bg-highlight-200 rounded-xl transition-colors focusable text-light-700 cursor-pointer'>
					{group.icon}
					<p className='text-3xl md:text-3xl font-title font-black'>{group.title}</p>
				</m.button>
			);
		}

		if (group.link) {
			return (
				<m.div
					key={i}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay, type: 'spring', bounce: 0, duration: 0.3 }}>
					<Link
						href={group.link}
						onClick={() => setOpen(false)}
						title={group.title}
						className={clsx(
							'py-4 px-6 hover:bg-highlight-200 rounded-xl transition-colors focusable text-light-700 cursor-pointer',
							pathname === group.link && 'text-link'
						)}>
						{group.icon}
						<p className='text-3xl md:text-3xl font-title font-black'>{group.title}</p>
					</Link>
				</m.div>
			);
		}

		return <p key={i}>Error</p>;
	};

	const renderFlyoutItem = (item: Sitemap.Item, i: number) => {
		if (item.exempt) return null;

		const delay = i * 0.05 + 0.05;

		if (item.callback) {
			return (
				<m.button
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay, type: 'spring', bounce: 0, duration: 0.3 }}
					key={i}
					title={item.title}
					onClick={item.callback}
					className='py-4 px-6 hover:bg-highlight-200 rounded-xl transition-colors focusable flex flex-col text-light-700'>
					{item.icon}
					<p className='text-3xl md:text-5xl font-title font-black'>{item.title}</p>
					<p className='text-light-100'>{item.description}</p>
				</m.button>
			);
		}

		if (item.link) {
			return (
				<m.div
					key={i}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay, type: 'spring', bounce: 0, duration: 0.3 }}>
					<Link
						href={item.link}
						onClick={() => setOpen(false)}
						title={item.title}
						className={clsx(
							'py-4 px-6 hover:bg-highlight-200 rounded-xl transition-colors focusable flex flex-col text-light-700',
							pathname === item.link && 'text-link'
						)}>
						{item.icon}
						<p className='text-3xl md:text-5xl font-title font-black'>{item.title}</p>
						<p className='text-light-100 mt-1 sm:mt-2'>{item.description}</p>
					</Link>
				</m.div>
			);
		}

		return <p key={i}>Error</p>;
	};

	return (
		<>
			<AnimatePresence>
				{open && (
					<m.div
						initial={{ opacity: 0, y: '-100%' }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
						className='fixed top-0 left-0 w-screen h-screen center bg-dark-800/75 backdrop-blur-md overflow-hidden'>
						<div className='flex size-full flex-col px-5 pt-20 lg:pt-5 pb-52 gap-5 overflow-y-scroll lg:1/2 xl:w-1/3 lg:top-1/4'>
							<AnimatePresence mode='popLayout'>
								{!flyout ? (
									<m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
										<Link
											onClick={() => setOpen(false)}
											href='/'
											title='Home'
											className={clsx(
												'py-2 px-6 hover:bg-highlight-200 rounded-xl transition-colors focusable flex justify-between text-light-700',
												pathname === '/' && 'text-accent'
											)}>
											<p className='text-3xl md:text-5xl font-title font-black'>Home</p>
											<Image
												src={info.logo_src}
												alt=''
												width={30}
												height={30}
												className='rounded-xl size-8 md:size-14'
											/>
										</Link>
									</m.div>
								) : (
									<m.button
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										onClick={() => setFlyout(undefined)}
										title='Go Back'
										className='py-2 px-4 hover:bg-highlight-200 rounded-xl transition-colors focusable flex items-center gap-3 text-light-700 cursor-pointer'>
										<TbArrowLeft className='size-8 md:size-14' />
										<p className='text-3xl md:text-5xl font-title font-black'>Go Back</p>
									</m.button>
								)}
							</AnimatePresence>

							<AnimatePresence mode='popLayout'>
								{!flyout && info.sitemap.map((group, i) => renderGroup(group, i))}
							</AnimatePresence>

							<AnimatePresence mode='popLayout'>
								{flyout && flyout.items && flyout.items.map((item, i) => renderFlyoutItem(item, i))}
							</AnimatePresence>
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Hamburger;
