'use client';

import Anchor from '@/components/ui/Anchor';
import React from 'react';
import { m } from 'motion/react';
import { useViewportSize } from '@mantine/hooks';

const Hero: React.FC = () => {
	const { width } = useViewportSize();

	return (
		<header className='min-h-[75vh] center bg-[#111112] overflow-hidden'>
			<div className='max-md:top-0 md:w-3/4 md:left-[20%] md:m-[10vw] absolute'>
				<div className='size-[101%] bg-radial-gradient absolute z-10'></div>
				<video preload='none' playsInline autoPlay muted loop className='object-cover'>
					<source src='/blackhole.webm' type='video/webm' />
				</video>
			</div>
			<div className='flex flex-col gap-2 absolute md:left-[20%] max-md:top-[45%] z-20 px-5'>
				<h1 className='text-5xl font-title font-black md:min-w-[1000px]'>
					<span className='opacity-0'>Modern. Fast. Awesome</span>
					<m.span className='absolute top-0 left-0 flex text-transparent bg-gradient-to-r from-[#d0ae7d] to-[#fefefe] bg-clip-text'>
						<svg className='absolute' style={{ width: 0, height: 0 }}>
							<filter id='blackhole-distortion'>
								{/* feTurbulence creates a noise pattern; animate its baseFrequency for dynamic effect */}
								<feTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='2' result='noise'>
									<animate attributeName='baseFrequency' dur='4s' values='0.02;0.06;0.02' repeatCount='indefinite' />
								</feTurbulence>
								{/* feDisplacementMap uses the noise to displace (distort) the graphic */}
								<feDisplacementMap in='SourceGraphic' in2='noise' scale='30' xChannelSelector='R' yChannelSelector='G' />
							</filter>
						</svg>
						<m.span
							className='absolute top-0 left-0 text-white text-5xl font-bold select-none'
							style={{
								filter: 'url(#blackhole-distortion)',
								WebkitMaskImage: 'linear-gradient(to left, #0005 30%, #0000 100%)',
								maskImage: 'linear-gradient(to left, #0005 30%, #0000 100%)',
							}}
							animate={{ x: width <= 768 ? 0 : [0, '25%', 0], y: width <= 768 ? [0, '-25%', 0] : 0, scale: [1, 1.1, 1] }}
							transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'backInOut' }}>
							Modern. Fast. Awesome.
						</m.span>
						Modern. Fast. Awesome.
					</m.span>
				</h1>
				<p className='text-2xl md:text-3xl text-light-500'>
					Grow your website with a new, fast, and <br /> dynamic design, worry free.
				</p>
				<div className='flex gap-5 mt-5'>
					<Anchor href='/quote' variant='Filled'>
						Get a Free Quote
					</Anchor>
					<Anchor href='/portfolio' className='text-lg'>
						See Portfolio
					</Anchor>
				</div>
			</div>
		</header>
	);
};

export default Hero;
