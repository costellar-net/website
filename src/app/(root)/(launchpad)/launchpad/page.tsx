import Loader from '@/components/ui/Loader';
import { fetchWebsites } from '@/lib/actions/website';
import React from 'react';
import Dashboard from './Dashboard';

const Page: React.FC = async () => {
	let data;

	try {
		data = await fetchWebsites();
	} catch (e) {
		return (
			<div className='px-[20%] py-20'>
				<p className='text-red-500'>An error occurred while fetching the website. Please try again later.</p>
			</div>
		);
	}

	if (!data) {
		return (
			<div className='px-[20%] py-20'>
				<Loader />
			</div>
		);
	}

	return (
		<div className='h-screen center'>
			<Dashboard websites={data} />
		</div>
	);
};

export default Page;
