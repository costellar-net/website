'use client';

import React, { useState } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, MotionConfig, m } from 'motion/react';

import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { features } from '@/lib/features';

import { HiArrowLeft, HiArrowRight, HiCheckCircle, HiRefresh } from 'react-icons/hi';
import Anchor from '@/components/ui/Anchor';
import Checkbox from '@/components/ui/Checkbox';
import Slider from '@/components/ui/Slider';
import Accordion from '@/components/ui/Accordion';
import { info } from '@/lib/info';

const future = [
	{
		icon: <p className='text-sm size-5 bg-link text-light-900 font-title font-bold rounded-full center select-none'>1</p>,
		name: 'Purchase & Ownership',
		description:
			'You will receive the complete source code for your website once we are done and you are satisfied with the website. Once delivered, the code and website are fully yours.',
	},
	{
		icon: <p className='text-sm size-5 bg-link text-light-900 font-title font-bold rounded-full center select-none'>2</p>,

		name: 'Transfer',
		description: (
			<div className='space-y-2 leading-tight'>
				<p className='font-semibold'>
					We will assist in transferring the website to your preferred hosting and required services at no additional cost.
				</p>
				<p>
					Note, these services will usually require you to pay, depending on the service, which you can choose youself{' '}
					<span className='text-dark-900/60 dark:text-highlight-900'>
						(Estimates are listed on the Specifications slide)
					</span>
					.
				</p>
				<p>
					This method allows you full control over pricing and function as you&apos;re the one choosing the services{' '}
					<span className='text-dark-900/60 dark:text-highlight-900'>(We will have recommendations if you are unsure)</span>.
				</p>
			</div>
		),
	},
	{
		icon: <p className='text-sm size-5 bg-link text-light-900 font-title font-bold rounded-full center select-none'>3</p>,
		name: 'Ongoing Management (Optional)',
		description: (
			<>
				<p className='font-semibold'>As the code is now completely yours, you may:</p>
				<ul className='list-decimal list-inside ml-5 mt-1 space-y-1'>
					<li>
						Purchase a management plan from us <span className='text-green-600 dark:text-green-300'>(Recommended)</span>
					</li>
					<li>
						Work with another developer of your choice, such as:
						<ul className='list-disc list-inside ml-5 mt-1 leading-tight mb-3 opacity-75'>
							<li>Upwork Freelancers</li>
							<li>Fiverr Professionals</li>
							<li>Your in-house development team</li>
						</ul>
					</li>
					<li>Manage the site yourself</li>
					<li>
						Not use ongoing management <span className='text-red-700 dark:text-red-400'>(Not Recommended)</span>
					</li>
				</ul>
			</>
		),
	},
];

const sizes = ['Single Page App', '1-3 Pages', '1-10 Pages', 'Dynamic Page App'];

const specifications = [
	{ name: 'Emailing', price: '$20/m' },
	{ name: 'Contact Form', price: '$0/m' },
	{ name: 'Newsletter Signup', price: '$20/m' },
	{ name: 'Blogs', price: 'Pay as you go' },
	{ name: 'Forums', price: 'Pay as you go' },
	{ name: 'Instant Messaging', price: 'Pay as you go' },
	{ name: 'Account/Auth System', price: 'Pay as you go' },
	{ name: 'Admin Dashboard', price: '$0/m' },
	{ name: 'Analytics', price: '$0/m' },
	{ name: 'Database', price: 'Pay as you go' },
	{ name: 'E-commerce', price: '$0/m' },
	{ name: 'Payment Integration', price: '$0/m' },
	// { name: 'Multilingual Support', price: '' },
	// { name: 'Booking System', price: '' },
	// { name: 'Push Notifications', price: '' },
];

const schema = z.object({
	name: z.string().min(1, 'Your name is required'),
	email: z.string().min(1, 'Your email is required').email('Please use a valid email'),
	website: z
		.string()
		.optional()
		.refine((val) => !val || /^((https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(\/.*)?$/.test(val), {
			message: 'Please enter a valid website (e.g. example.com)',
		}),
	size: z.string().min(1, 'Please select a size').optional(),
	specifications: z.array(z.string()).optional(),
	message: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

const Page: React.FC = () => {
	const [form, setForm] = useState<'Questions' | 'Loading' | 'Error' | 'Success'>('Questions');
	const [step, setStep] = useState(0);
	const [selectedSpecs, setSelectedSpecs] = useState<{ name: string; price: string }[]>([]);
	const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);

	const {
		register,
		handleSubmit,
		trigger,
		setFocus,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			website: '',
			size: 'Single Page App',
		},
	});

	const websiteValue = watch('website');

	const onSubmit = async (formData: Schema) => {
		formData.specifications = selectedSpecs.map((spec) => spec.name);
		formData.size = selectedSize;

		try {
			setForm('Loading');

			console.log(formData);
			console.log(JSON.stringify(formData));

			// const response = await fetch('/api/message', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify(formData),
			// });

			// const data = await response.json();

			// if (data.status === 'Error') {
			// 	console.error(data);
			// 	setForm('Error');
			// 	return;
			// }

			setForm('Success');
		} catch (error) {
			console.error('Error:', error);
			setForm('Error');
		}
	};

	const fieldsPerStep: Array<(keyof Schema)[]> = [
		['name', 'email'],
		['website'],
		[],
		['size'],
		['specifications'],
		['message'],
		[],
	];

	const nextStep = async () => {
		const isValid = await trigger(fieldsPerStep[step]);

		if (isValid) {
			setStep((s) => s + 1);
		} else {
			// Focus the first invalid field for this step
			const stepFields = fieldsPerStep[step];
			for (const field of stepFields) {
				if (errors[field]) {
					setFocus(field);
					break;
				}
			}
		}
	};

	const prevStep = () => setStep((s) => s - 1);

	const slides = [
		<m.div initial={{ opacity: 0, y: -50, scale: 0.75 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
			<div>
				<h1 className='text-3xl font-title font-bold'>Let&apos;s talk</h1>
				<p className='text-dark-900/60 dark:text-highlight-900 mt-1 mb-5'>How should we contact you</p>
			</div>
			<div>
				<label htmlFor='name' className='text-xl mb-1 block'>
					Your Name <span className='text-red-500'>*</span>
				</label>
				<input id='name' {...register('name')} className='input' placeholder='John Doe' />
				<AnimatePresence>
					{errors.name && (
						<m.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className='text-red-700 dark:text-red-400 text-sm mt-1'>
							{errors.name.message}
						</m.p>
					)}
				</AnimatePresence>
			</div>
			<div className='mt-3'>
				<label htmlFor='email' className='text-xl mb-1 block'>
					Your Email <span className='text-red-500'>*</span>
				</label>
				<input id='email' {...register('email')} className='input' placeholder='example@example.com' />
				<AnimatePresence>
					{errors.email && (
						<m.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className='text-red-700 dark:text-red-400 text-sm mt-1'>
							{errors.email.message}
						</m.p>
					)}
				</AnimatePresence>
			</div>
		</m.div>,
		<div>
			<m.div initial={{ opacity: 0, y: -50, scale: 0.75 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
				<p className='text-3xl font-title font-bold mb-5'>New design or redesign?</p>
				<label htmlFor='website' className='text-xl block'>
					Your Current Website
				</label>
				<p className='text-dark-900/60 dark:text-highlight-900 leading-tight mb-2'>
					If you don&apos;t have one, please continue and leave this blank.
				</p>
				<input id='website' {...register('website')} className='input' placeholder='https://example.com' />
				<AnimatePresence>
					{errors.website && (
						<m.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className='text-red-700 dark:text-red-400 text-sm mt-1'>
							{errors.website.message}
						</m.p>
					)}
				</AnimatePresence>
			</m.div>
		</div>,
		<m.div initial={{ opacity: 0, y: -50, scale: 0.75 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
			<p className='text-3xl font-title font-bold'>Out of the Box</p>
			<p className='text-dark-900/60 dark:text-highlight-900 mt-1'>
				These are the features and perks you automatically will get.
			</p>
			<div className='mt-3 sm:mt-6 flex flex-col min-h-[45vh]'>
				<Accordion items={features} />
				<Anchor openInNew href='/features' className='mt-3 text-sm'>
					Read More
				</Anchor>
			</div>
		</m.div>,
		<div>
			<m.div initial={{ opacity: 0, y: -50, scale: 0.75 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
				<p className='text-3xl font-title font-bold'>Website Size</p>
				<p className='text-dark-900/60 dark:text-highlight-900 mt-1 leading-tight'>
					Make a rough guess of how many pages your website will have. Don&apos;t worry, you can change this later.
				</p>
				<Slider sizes={sizes} value={selectedSize} onChange={setSelectedSize} />
			</m.div>
		</div>,
		<m.div initial={{ opacity: 0, y: -50, scale: 0.75 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
			<p className='text-3xl font-title font-bold'>Specifications</p>
			<p className='text-dark-900/60 dark:text-highlight-900 mt-1 leading-tight'>
				Make a rough guess of what features your website will have. Don&apos;t worry, you can change this later. If you would
				like to have other features, please specify them on the next slide.
			</p>
			<div className='flex flex-col gap-1 mt-5'>
				{specifications.map((spec) => (
					<div
						key={spec.name}
						className='flex justify-between items-center gap-2 text-lg leading-[1.05] border-b-2 border-transparent group hover:border-lowlight-200 hover:dark:border-highlight-100 transition-colors'>
						<label className='flex gap-2 items-center cursor-pointer'>
							<Checkbox
								checkBoxClassName='!size-4'
								checked={selectedSpecs.includes(spec)}
								onChange={() => {
									setSelectedSpecs((prev) => (prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]));
								}}
							/>
							<span>{spec.name}</span>
						</label>
						<p className='text-dark-900/60 dark:text-highlight-900 '>{spec.price}</p>
					</div>
				))}
				{selectedSpecs.length > 0 ? (
					<button
						type='button'
						aria-label='Deselect All Specs'
						className='link mt-2 text-sm w-fit'
						onClick={() => setSelectedSpecs([])}>
						Deselect All
					</button>
				) : (
					<button
						type='button'
						aria-label='Select All Specs'
						className='link mt-2 text-sm w-fit'
						onClick={() => setSelectedSpecs(specifications)}>
						Select All
					</button>
				)}
				<p className='text-sm text-dark-900/60 dark:text-highlight-900'>
					<br /> *Estimates are only the upkeep cost, there are base charges for each that depend on your needs.
					<br />
					*If you&apos;re confused about estimates, please refer to the last slide.
				</p>
			</div>
		</m.div>,
		<div>
			<m.div initial={{ opacity: 0, y: -50, scale: 0.75 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
				<p className='text-3xl font-title font-bold'>Message</p>
				<p className='text-dark-900/60 dark:text-highlight-900 mt-1 mb-3 leading-tight'>
					Are there any other things you&apos;d like to mention, ask, or provide? (Don&apos;t worry, you can always email us
					{info.contact && (
						<>
							{' '}
							at <Anchor href={`mailto:${info.contact.email}`}>{info.contact.email}</Anchor>
						</>
					)}
					).
				</p>
				<textarea rows={5} maxLength={1000} {...register('message')} className='input' placeholder="I'd also like..." />
				<AnimatePresence>
					{errors.message && (
						<m.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className='text-red-700 dark:text-red-400 text-sm mt-1'>
							{errors.message.message}
						</m.p>
					)}
				</AnimatePresence>
			</m.div>
		</div>,
		<m.div initial={{ opacity: 0, y: -50, scale: 0.75 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
			<p className='text-3xl font-title font-bold'>Purchase Process</p>
			<p className='text-dark-900/60 dark:text-highlight-900 mt-1 mb-3 leading-tight'>
				We heavily recommend reading through all of these steps.
			</p>
			<Accordion items={future} />
			<p className='mt-5 text-dark-900/70 dark:text-highlight-900 leading-tight'>
				We believe in transparency and flexibility. You are never locked in and have full control over your website.
			</p>
		</m.div>,
	];

	return (
		<>
			{form !== 'Success' ? (
				<MotionConfig transition={{ duration: 0.2, type: 'spring', bounce: 0 }}>
					<div className='py-5 center overflow-hidden'>
						<form onSubmit={handleSubmit(onSubmit)} className='w-[90%] md:w-1/2 xl:w-1/3 flex flex-col' noValidate>
							<div className='min-h-[75vh] center'>
								<div className='w-full'>
									<MotionConfig transition={{ duration: 0.4, type: 'spring', bounce: 0 }}>
										<AnimatePresence>{slides[step]}</AnimatePresence>
									</MotionConfig>
								</div>
							</div>
							<div className='mt-5 center'>
								<div className='flex flex-col gap-2'>
									<div className='flex gap-3'>
										<Button type='button' onClick={prevStep} disabled={step <= 0}>
											<HiArrowLeft className='size-4' />
											<p>Previous</p>
										</Button>

										{step < fieldsPerStep.length - 1 && (
											<Button type='button' onClick={nextStep} disabled={step >= fieldsPerStep.length - 1}>
												<p>
													{step === 0 && 'Looks Good'}
													{step === 1 && (websiteValue === '' ? "It's a New Design" : "It's a Redesign")}
													{step === 2 && 'Sounds Good'}
													{step === 3 && 'Next'}
													{step === 4 && "That's All"}
													{step === 5 && 'Next'}
												</p>
												<HiArrowRight className='size-4' />
											</Button>
										)}

										{step >= fieldsPerStep.length - 1 && (
											<div className='flex gap-5 items-center'>
												<Button type='submit' loading={form === 'Loading' || isSubmitting}>
													{(form === 'Loading' || isSubmitting) && <Loader className='size-4' />}
													{form === 'Error' ? (
														<>
															<p>Retry</p>
															<HiRefresh className='size-4' />
														</>
													) : (
														<>
															<p>Submit</p>
															<HiCheckCircle className='size-4' />
														</>
													)}
												</Button>
											</div>
										)}
									</div>

									{/* Progress Bar */}
									<div className='w-full h-1 bg-dark-100 rounded-full overflow-hidden'>
										<div
											className='h-full bg-accent transition-all duration-300'
											style={{
												width: `${(step / (fieldsPerStep.length - 1)) * 100}%`,
											}}
										/>
									</div>

									<AnimatePresence>
										{form === 'Error' && (
											<m.p
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												className='text-red-700 dark:text-red-400 mt-1'>
												We&apos;re sorry, there was an error.
											</m.p>
										)}
									</AnimatePresence>
								</div>
							</div>
						</form>
					</div>
				</MotionConfig>
			) : (
				<MotionConfig transition={{ duration: 1, type: 'spring', bounce: 0 }}>
					<div className='center w-full min-h-[75vh] bg-gradient-to-b from-[#111112] from-60% to-dark-500 px-5 overflow-hidden'>
						<m.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							className='absolute w-full lg:w-1/2 lg:left-1/4 2xl:w-1/3 left-0 top-10'>
							<div className='size-[101%] bg-radial-gradient absolute z-10'></div>
							<video preload='none' playsInline autoPlay muted loop className='object-cover size-full'>
								<source src='/blackhole.webm' type='video/webm' />
							</video>
						</m.div>
						<m.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className='text-center z-10'>
							<p className='text-3xl font-bold font-title text-white/90'>Thank you!</p>
							<p className='leading-tight mt-1 text-white/75'>
								We will contact you as soon as possible and look forward to working with you.
							</p>
							<Anchor href='/' variant='Filled' className='mt-5'>
								Return Home
							</Anchor>
						</m.div>
					</div>
				</MotionConfig>
			)}
		</>
	);
};

export default Page;
