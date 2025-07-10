import Anchor from '@/components/ui/Anchor';
import { features } from '@/lib/features';
import Link from 'next/link';
import React from 'react';

const Page: React.FC = () => {
	return (
		<>
			<div className='w-full center py-20 flex flex-col gap-3'>
				<h1 className='text-center text-5xl font-bold'>What&apos;s included</h1>
				<h2 className='text-center'>We focus on quality website.</h2>
			</div>
			<div className='flex flex-col items-center'>
				{features.map((feature, i) => {
					return (
						<div
							key={i}
							className='w-full lg:w-3/4 2xl:w-1/2 flex flex-col sm:flex-row flex-wrap align-stretch justify-center gap-5 p-5 md:p-20'>
							<div className='w-full sm:w-1/3'>
								<div className='flex gap-5 items-center pt-20 sticky top-0'>
									<h3 className='text-3xl font-bold'>{feature.name}</h3>
								</div>
							</div>
							<div className='w-full sm:w-2/5 h-full'>
								<p className='leading-relaxed sm:pt-20'>{feature.description}</p>
							</div>
						</div>
					);
				})}
			</div>
			<div className='w-full center py-20 flex flex-col'>
				<p className='text-center text-3xl font-bold'>We&apos;ll do it all for you</p>
				<p className='text-center text-xl'>With you in full control</p>
				<Link
					className='button mt-10'
					aria-label='Form'
					href='/quoting'
					style={{ '--color': 'var(--accent-opacity)' } as React.CSSProperties}>
					Get a Free Quote
				</Link>
			</div>
			<p className='text-sm mt-20 text-center px-5'>
				All &quot;rated&quot; features are based off lighthouse desktop scores which can be found at{' '}
				<Anchor href='https://pagespeed.web.dev'>https://pagespeed.web.dev</Anchor>.
			</p>
		</>
	);
};

export default Page;
