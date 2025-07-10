'use client';

import Anchor from '@/components/ui/Anchor';
import Button from '@/components/ui/Button';
// import { login } from '@/lib/client/authentication';
// import { AuthContext } from '@/providers/Authentication';
import { MotionConfig } from 'motion/react';
import React, { useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiPause, HiPlay, HiRefresh } from 'react-icons/hi';
import clsx from 'clsx';
import Tooltip from '@/components/ui/Tooltip';

export default function Page() {
	// const { user } = useContext(AuthContext);
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const [bgPaused, setBgPaused] = useState<boolean>(false);
	// const searchParams = useSearchParams();

	// const path = searchParams.get('path');

	// useEffect(() => {
	// 	if (user) {
	// 		redirect(path ?? '/');
	// 	}
	// }, [user]);

	// if (user === undefined) {
	// 	return (
	// 		<div className='w-full min-h-screen center'>
	// 			<Loader />
	// 		</div>
	// 	);
	// }

	const handleLogin = async () => {
		setError(undefined);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			setError('a');
			// redirect(path ?? '/');
		}, 1000);
	};
	// const handleLogin = async () => {
	// 	setError(undefined);
	// 	setLoading(true);

	// 	await login()
	// 		.then(() => {
	// 			redirect(path ?? '/');
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 			setError('There was an issue logging you in.' + err);
	// 		})
	// 		.finally(() => setLoading(false));
	// };

	return (
		<MotionConfig transition={{ duration: 0.2, type: 'spring', bounce: 0 }}>
			<div className='min-h-screen w-full center'>
				<div className='size-full sm:size-[95%] lg:size-3/4 absolute center'>
					<div className='size-full'>
						<video
							className='object-cover sm:rounded-[50px] shadow-2xl w-full h-full'
							playsInline
							autoPlay
							muted
							loop
							src='/galaxy.webm'
							ref={(video) => {
								if (!video) return;

								if (bgPaused) video.pause();
								else video.play();
							}}
						/>
						<Tooltip
							label={bgPaused ? 'Play Background' : 'Pause Background'}
							className='absolute right-0 bottom-0 m-10'
							delay={0}>
							<button
								aria-label={bgPaused ? 'Play Background Video' : 'Pause Background Video'}
								className='focusable rounded-full cursor-pointer'
								onClick={() => setBgPaused((prev) => !prev)}>
								{bgPaused ? (
									<HiPlay className='fill-white/50 hover:fill-white/90 transition-colors size-10' />
								) : (
									<HiPause className='fill-white/50 hover:fill-white/90 transition-colors size-10' />
								)}
							</button>
						</Tooltip>
					</div>
				</div>
				<div className='flex flex-col items-center mx-2'>
					<div className='p-10 bg-light-900 dark:bg-dark-500 rounded-3xl'>
						<h1 className='text-2xl font-title font-bold'>Login to Launchpad</h1>
						<h2 className='text-dark-900/60 dark:text-highlight-900 mt-1 leading-tight'>
							View and manage your website from one simple dashboard.
						</h2>

						<input type='text' className='input mt-5' placeholder='email' />
						<input type='text' className='input mt-2' placeholder='password' />

						<div className='flex flex-col gap-3 mt-10'>
							{error ? (
								<Button className='w-full' onClick={handleLogin}>
									<HiRefresh className='size-4 dark:fill-dark-800' />
									Retry
								</Button>
							) : (
								<Button className='w-full' onClick={handleLogin} loading={loading}>
									<p>Login</p>
									<HiArrowRight className='size-4 dark:fill-dark-800' />
								</Button>
							)}
							{error && (
								<p className='text-red-800/90 dark:text-red-400/90 text-center'>We&apos;re sorry, there was an error.</p>
							)}
						</div>
					</div>
					<p className='text-highlight-900 mt-2 max-w-96 leading-tight text-xs text-center'>
						Account login details are given to you when you purchase a website. Please contact us if you have issues logging
						in.
					</p>
					<Anchor href='/' className='mt-5'>
						<HiArrowLeft className='size-4' />
						<p>Return to homepage</p>
					</Anchor>
				</div>
			</div>
		</MotionConfig>
	);
}
