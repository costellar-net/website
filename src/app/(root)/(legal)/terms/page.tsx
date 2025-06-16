import Link from 'next/link';
import React from 'react';

const sections = [
	{
		title: 'SERVICES PROVIDED',
		content:
			'Costellar provides website production services, including but not limited to design, development, and deployment of websites.',
	},
	{
		title: 'ACCEPTANCE OF TERMS',
		content:
			'By using our Service, you confirm that you have read, understood, and agree to be bound by these Terms. We may update these Terms from time to time. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.',
	},
	{
		title: 'LIABILITY DISCLAIMER',
		content:
			'To the fullest extent permitted by applicable law, Costellar shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, resulting from:',
		list: [
			'The use or the inability to use the Service;',
			'Unauthorized access to or alteration of your transmissions or data;',
			'Statements or conduct of any third party on the Service;',
			'Any other matter relating to the Service.',
		],
	},
	{
		title: 'OWNERSHIP AND TRANSFER OF WEBSITE',
		content:
			'Ownership of the website and all associated materials, including but not limited to design, content, and code, is transferred to the client upon completion of the transaction. Once payment is received and the website is delivered, the client assumes full responsibility for the website.',
	},
	{
		title: 'PAYMENT TERMS',
		content:
			'Full payment is required upon completion of the website production unless otherwise agreed upon in writing. Payment must be made according to the payment terms specified in the invoice.',
	},
	{
		title: 'CLIENT RESPONSIBILITIES',
		content:
			'The client is responsible for providing all necessary content, materials, and information required for the production of the website. The client is also responsible for reviewing and approving the website before final delivery.',
	},
	{
		title: 'REVISIONS AND MODIFICATIONS',
		content:
			'Revisions and modifications to the website after the initial delivery may incur additional charges. The scope of such revisions and the associated costs will be agreed upon in writing before any work is undertaken.',
	},
	{
		title: 'TERMINATION',
		content:
			'Costellar reserves the right to terminate services at any time if the client fails to comply with these Terms or engages in any unlawful activity. Upon termination, the client remains responsible for any outstanding payments.',
	},
	{
		title: 'GOVERNING LAW',
		content:
			'These Terms shall be governed and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions. Any disputes relating to these Terms will be subject to the exclusive jurisdiction of the courts of the United States of America.',
	},
	{
		title: 'ENTIRE AGREEMENT',
		content:
			'These Terms constitute the entire agreement between you and Costellar regarding the use of the Service and supersede all prior agreements and understandings.',
	},
];

const Page: React.FC = () => {
	return (
		<div className='flex flex-col gap-2 p-[5%] xl:ml-[25vw] xl:max-w-[50%] leading-relaxed'>
			<div className='p-10 flex flex-col gap-3 text-center text-light-800'>
				<video
					className='object-cover size-full absolute top-0 left-0 rounded-3xl shadow-xl'
					playsInline
					autoPlay
					muted
					loop
					src='/galaxy.webm'
				/>
				<h1 className='text-5xl font-title font-black'>Our Terms</h1>
				<div>
					<p>Effective: 2/20/2025</p>
					<p>Last Updated: 2/13/2025</p>
				</div>
			</div>

			<div className='py-10 flex flex-col gap-1'>
				<h2 className='text-3xl font-title font-black mb-3'>Topics Covered</h2>
				{sections.map((section, i) => {
					return (
						<div key={i}>
							{i + 1}.{' '}
							<Link href={'#' + section.title} className='capitalize link'>
								{section.title.toLowerCase()}
							</Link>
						</div>
					);
				})}
			</div>

			<p>
				Welcome to Costellar (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; &quot;us&quot;). Please read these Terms
				of Service (&quot;Terms,&quot; &quot;Terms of Service&quot;) carefully before using our website production services
				(the &quot;Service&quot;).
			</p>
			<p>
				By accessing or using the Service, you agree to be bound by these Terms. If you do not agree with any part of the
				Terms, you may not access the Service.
			</p>

			{sections.map((section, i) => {
				return (
					<section key={i} id={section.title} className='flex flex-col gap-1 mb-6'>
						<p className='capitalize font-title font-black text-2xl mt-6'>{section.title.toLowerCase()}</p>
						<p className='leading-relaxed'>{section.content}</p>
						{section.list && (
							<ul className='flex flex-col gap-2 ml-5'>
								{section.list.map((item, j) => {
									return <li key={j}>{item}</li>;
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
