'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Hamburger from './Hamburger';
import Link from 'next/link';
import { info } from '@/lib/info';
import { CostellarContext } from '@/providers/Costellar';
import Anchor from '../ui/Anchor';
import Tooltip from '../ui/Tooltip';
import { TbMenu2, TbX } from 'react-icons/tb';
import { useHotkeys } from '@mantine/hooks';
import clsx from 'clsx';

const Nav: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { setScrollLocked } = useContext(CostellarContext);

	useEffect(() => setScrollLocked(open), [open]);
	useHotkeys([['escape', () => setOpen(false)]]);

	return (
		<>
			<nav className='fixed z-30 top-0 left-0 w-screen max-w-[100vw]'>
				<Hamburger open={open} setOpen={setOpen} />
				<div
					className={clsx(
						'flex justify-between items-center mx-[5vw] xl:mx-[20vw] px-5 py-3 transition-all  rounded-3xl relative',
						!open && 'hover:bg-black/30 hover:backdrop-blur-sm'
					)}>
					<Link
						href='/'
						title='Home'
						className='flex items-center gap-2 focusable rounded-xl m-1 hover:scale-105 transition-transform'>
						<Image
							src={info.logo_src}
							alt=''
							width={30}
							height={30}
							className='transition-all w-auto rounded-xl size-[30px]'
						/>
						<p className='font-black font-title text-transparent bg-gradient-to-tr from-[#d0ae7d] to-[#111] dark:to-[#fefefe] bg-clip-text text-xl'>
							<span className='opacity-0'>Costellar</span>
							<span className='absolute top-0 left-0 flex text-transparent bg-gradient-to-r from-[#d0ae7d] to-[#111] dark:to-[#fefefe] bg-clip-text'>
								<svg className='absolute' style={{ width: 0, height: 0 }}>
									<filter id='blackhole-distortion'>
										<feTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='2' result='noise'>
											<animate
												attributeName='baseFrequency'
												dur='10s'
												values='0.02;0.06;0.02'
												repeatCount='indefinite'
											/>
										</feTurbulence>
										<feDisplacementMap
											in='SourceGraphic'
											in2='noise'
											scale='30'
											xChannelSelector='R'
											yChannelSelector='G'
										/>
									</filter>
								</svg>
								<span
									className='absolute top-0 left-0 text-black dark:text-white text-xl font-bold font-title select-none'
									style={{
										filter: 'url(#blackhole-distortion)',
										WebkitMaskImage: 'linear-gradient(to left, #0005 30%, #0000 100%)',
										maskImage: 'linear-gradient(to left, #0005 30%, #0000 100%)',
									}}>
									Costellar
								</span>
								Costellar
							</span>
						</p>
					</Link>

					<div className='flex gap-3'>
						<Anchor href='/quote' variant='Filled' className='max-sm:hidden'>
							Free Quote
						</Anchor>
						<Tooltip label={open ? 'Close Menu' : 'Open Menu'} delay={0}>
							<button
								className={clsx(
									'rounded-xl hover:bg-highlight-200 p-2 transition-colors cursor-pointer',
									open ? 'text-light-600' : 'text-dark-500 dark:text-light-600'
								)}
								onClick={() => setOpen((prev) => !prev)}
								title='Menu'>
								{open ? <TbX /> : <TbMenu2 />}
							</button>
						</Tooltip>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
