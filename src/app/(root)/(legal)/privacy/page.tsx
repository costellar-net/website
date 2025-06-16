import Email from '@/components/Email';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const sections = [
	{
		title: 'Information Collection',
		content: 'We collect the following personal information when you contact us in a sale:',
		list: ['Name', 'Email Address', 'A Message (Optional)', 'Current Website (Optional)', 'Feature Preferences'],
	},
	{
		title: 'Use of Information',
		content: 'The information we collect is used solely for the following purposes:',
		list: ['To contact you regarding our products and services', 'To facilitate sales and provide customer support'],
	},
	{
		title: 'Data Liability',
		content:
			'While we take every precaution to protect your information, we cannot guarantee the security of data transmitted over the internet. You accept the inherent risks of providing information online and will not hold us liable for any breach of security.',
	},
	{
		title: 'No Selling of Information',
		content:
			'We respect your privacy and will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so.',
	},
	{
		title: 'Your Rights',
		content: (
			<>
				You have the right to request details of the personal information we hold about you. If you would like a copy of the
				information held on you, please contact us at <Email />. If you believe that any information we are holding on you is
				incorrect or incomplete, please email us as soon as possible at the above address. We will promptly correct any
				information found to be incorrect.
			</>
		),
	},
	{
		title: 'Changes to This Privacy Statement',
		content:
			'We may update this Privacy Statement from time to time. Your continued use of our services after any such changes constitutes your acceptance of the new terms.',
	},
	{
		title: 'Contact Us',
		content: (
			<>
				If you have any questions or concerns about our Privacy Statement or the handling of your personal information, please
				contact us at: <Email />
			</>
		),
	},
];

const Page: React.FC = () => {
	return (
		<div className='flex flex-col gap-2 p-[5%] xl:ml-[25vw] xl:max-w-[50%]'>
			<div className='p-10 flex flex-col gap-3 text-center text-light-800'>
				<Image
					className='object-cover size-full absolute top-0 left-0 rounded-3xl select-none shadow-xl'
					alt=''
					fill
					draggable={false}
					sizes='50vw'
					src='/galaxy_by_nathan_anderson.webp'
				/>
				<h1 className='text-5xl font-title font-black'>Your Privacy</h1>
				<div className='leading-tight'>
					<p>Effective: 7/01/2025</p>
					<p>Last Updated: 6/13/2025</p>
				</div>
			</div>

			<div className='py-10 flex flex-col gap-1'>
				<h2 className='text-3xl font-title font-black mb-3'>Topics Covered</h2>
				{sections.map((section, i) => {
					return (
						<div key={i}>
							{i + 1}.{' '}
							<Link href={'#' + section.title} className='capitalize link leading-normal'>
								{section.title.toLowerCase()}
							</Link>
						</div>
					);
				})}
			</div>

			<p className='leading-tight'>
				At Costellar, we are committed to protecting your privacy and ensuring that your personal information is handled in a
				safe and responsible manner. This Privacy Statement outlines how we collect, use, and protect your information.
			</p>

			{sections.map((section, i) => {
				return (
					<section key={i} id={section.title} className='flex flex-col gap-1 mb-6 scroll-mt-20'>
						<p className='capitalize font-title font-black text-2xl mt-6'>{section.title.toLowerCase()}</p>
						<p className='leading-relaxed'>{section.content}</p>
						{section.list && (
							<ul className='flex flex-col gap-1 ml-5'>
								{section.list.map((item, j) => {
									return <li key={j}>- {item}</li>;
								})}
							</ul>
						)}
					</section>
				);
			})}

			<div className='center w-full'>
				<Link href='/' className='link'>
					Return Home
				</Link>
			</div>
		</div>
	);
};

export default Page;
