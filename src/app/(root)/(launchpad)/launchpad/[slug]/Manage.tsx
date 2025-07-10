import Anchor from '@/components/ui/Anchor';
import type { Website } from '@/types/website';
import Link from 'next/link';
import React from 'react';
import { GrGithub } from 'react-icons/gr';
import { HiArchive, HiChatAlt, HiDocument, HiDocumentDuplicate, HiPlusCircle, HiXCircle } from 'react-icons/hi';

interface P {
	website: Website;
}

const Manage: React.FC<P> = ({ website }) => {
	return (
		<>
			<div className='flex flex-col gap-1'>
				<h1 className='text-3xl font-title font-bold'>Manage {website.name}</h1>
				<Anchor href={website.url} openInNew>
					View {website.url}
				</Anchor>
			</div>
			<div className='w-full flex flex-wrap gap-[5vw]'>
				<div className='flex flex-col gap-2 items-start text-xl'>
					<p className='text-2xl font-title font-bold'>Update Website</p>
					<button className='bg-lowlight-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 focusable transition-colors rounded-xl px-5 py-3 flex items-center gap-1.5 cursor-pointer'>
						<HiDocument className='size-6' />
						<p>Request a New Feature</p>
					</button>
					<button className='bg-lowlight-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 focusable transition-colors rounded-xl px-5 py-3 flex items-center gap-1.5 cursor-pointer'>
						<HiDocumentDuplicate className='size-6' />
						<p>Request an Advanced Feature</p>
					</button>
					<button className='bg-lowlight-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 focusable transition-colors rounded-xl px-5 py-3 flex items-center gap-1.5 cursor-pointer'>
						<HiChatAlt className='size-6' />
						<p>Chat with our Team</p>
					</button>
					<Link
						aria-label='Link to Github'
						className='bg-lowlight-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 focusable transition-colors rounded-xl px-5 py-3 flex items-center gap-1.5 cursor-pointer'
						href={'/'}>
						{/* // TODO: change me */}
						<GrGithub className='size-6' />
						<p>View Source Code</p>
					</Link>
				</div>
				<div className='flex flex-col gap-2 items-start text-xl'>
					<p className='text-2xl font-title font-bold'>Manage Subscription</p>
					<button className='bg-lowlight-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 focusable transition-colors rounded-xl px-5 py-3 flex items-center gap-1.5 cursor-pointer'>
						<HiXCircle className='size-6' />
						<p>Unsubscribe</p>
					</button>
					<button className='bg-lowlight-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 focusable transition-colors rounded-xl px-5 py-3 flex items-center gap-1.5 cursor-pointer'>
						<HiArchive className='size-6' />
						<p>View history</p>
					</button>
				</div>
				<div className='flex flex-col gap-2 items-start text-xl'>
					<p className='text-2xl font-title font-bold'>Other</p>
					<Anchor href='/quote'>
						<HiPlusCircle className='size-6' />
						<p>New Website</p>
					</Anchor>
				</div>
			</div>
		</>
	);
};

export default Manage;
