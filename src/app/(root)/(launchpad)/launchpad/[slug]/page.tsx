import Manage from './Manage';
import Setup from './Setup';
import Loader from '@/components/ui/Loader';
import { fetchWebsite } from '@/lib/actions/website';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	let data;

	try {
		data = await fetchWebsite(slug);
	} catch (e) {
		return (
			<div className='px-[20%] py-20'>
				<p className='text-red-500'>An error occurred while fetching the website. Please try again later.</p>
			</div>
		);
	}

	if (data === undefined) {
		return (
			<div className='px-[20%] py-20'>
				<Loader />
			</div>
		);
	}

	if (data === null) {
		// TODO: Change this
		return <p>No website was found</p>;
	}

	return (
		<div className='h-screen center'>
			<div className='w-full px-5 md:w-3/4 xl:w-2/3 min-h-1/2 flex flex-col justify-evenly gap-10'>
				{data.status >= 100 ? <Manage website={data} /> : <Setup website={data} />}
			</div>
		</div>
	);
}
