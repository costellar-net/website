'use client';

import Anchor from '@/components/ui/Anchor';
import Carousel from '@/components/ui/Carousel';
import React, { useEffect, useState } from 'react';
import { websites } from './websites';
import Showcase from '@/components/ui/Showcase';
import { Dropdown } from '@/components/ui/Dropdown';

const displayOptions = [
	{ label: 'Carousel', value: 'carousel' },
	{ label: 'Showcase', value: 'showcase' },
];

const Page: React.FC = () => {
	const [display, setDisplay] = useState<'carousel' | 'showcase'>('carousel');
	const [search, setSearch] = useState<string>();
	const [items, setItems] = useState(websites);

	useEffect(() => {
		if (display === 'carousel') {
			setItems(websites);
		} else {
			setItems(websites.filter((site) => !search || site.name.toLowerCase().includes(search.toLowerCase())));
		}
	}, [search]);

	return (
		<>
			<div className='min-h-[30vh] md:min-h-[40vh] pt-10 center flex-col gap-3 px-3 py-6 text-center'>
				<h1 className='text-4xl md:text-5xl font-title font-bold'>What we&apos;ve done</h1>
				<p className='leading-tight'>
					These are some of the projects we have worked on. If you would like your own, reach out!
				</p>
				<Anchor href='/quote' variant='Filled' className='mt-3'>
					Get a Free Quote
				</Anchor>
			</div>
			<div className='w-full bg-gradient-to-b pt-2 sm:pt-7 from-light-800 dark:from-dark-600'>
				<div className='w-full center px-3'>
					<div className='w-full md:w-1/2'>
						<div className='flex items-center gap-3'>
							<Dropdown
								options={displayOptions}
								value={display}
								onChange={(v) => setDisplay(v as 'carousel' | 'showcase')}
								label='Display as'
							/>
							{display === 'carousel' ? (
								<p className='text-dark-900/60 dark:text-highlight-900'>Searching is unavailable for Carousel.</p>
							) : (
								<input
									defaultValue={search}
									className='input max-md:!text-base !py-1'
									type='text'
									placeholder='Search...'
									onChange={(e) => setSearch(e.currentTarget.value)}
								/>
							)}
						</div>
					</div>
				</div>
				<div className='w-full min-h-[50vh]'>
					{display === 'carousel' && <Carousel className='md:mt-5 w-full' height={700} visibleCount={1} items={items} />}
					{display === 'showcase' && !search && <Showcase className='my-10 w-full px-3' items={items} />}
					{items.length <= 0 && (
						<div className='size-full center h-[10vh]'>
							<p>We couldn&apos;t find anything for &quot;{search}&quot;.</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Page;
