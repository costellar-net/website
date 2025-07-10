'use client';

import Anchor from '@/components/ui/Anchor';
import Button from '@/components/ui/Button';
import type { Website } from '@/types/website';
import Link from 'next/link';
import { HiArchive, HiPlusCircle, HiXCircle } from 'react-icons/hi';

interface P {
	websites: Website[];
}

const Dashboard: React.FC<P> = ({ websites }) => {
	return (
		<div className='w-full px-5 md:w-3/4 xl:w-2/3 min-h-1/2 flex flex-col justify-evenly gap-10'>
			<div className='flex flex-col gap-1'>
				<h1 className='text-3xl font-title font-bold'>Costellar Launchpad</h1>
				<p>A place to manage your website.</p>
			</div>
			<div className='w-full flex flex-wrap gap-[5vw]'>
				<div className='flex flex-col gap-2 items-start text-xl'>
					<p className='text-2xl font-title font-bold'>Your Websites</p>
					{websites.map((website, i) => (
						<Link
							aria-label={`Link to /launchpad/${website}`}
							className='flex flex-col bg-lowlight-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 focusable transition-colors rounded-xl px-5 py-3 cursor-pointer'
							href={`/launchpad/${website.url}`}
							key={i}>
							<p className='text-lg font-title font-bold'>{website.name}</p>
							<p>https://{website.url}</p>
						</Link>
					))}
				</div>
				<div className='flex flex-col gap-2 items-start text-xl'>
					<p className='text-2xl font-title font-bold'>Manage Subscription</p>
					<Button variant='Link'>
						<HiXCircle className='size-6' />
						<p>Unsubscribe</p>
					</Button>
					<Button variant='Link'>
						<HiArchive className='size-6' />
						<p>View history</p>
					</Button>
				</div>
				<div className='flex flex-col gap-2 items-start text-xl'>
					<p className='text-2xl font-title font-bold'>Other</p>
					<Anchor href='/quote'>
						<HiPlusCircle className='size-6' />
						<p>New Website</p>
					</Anchor>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
