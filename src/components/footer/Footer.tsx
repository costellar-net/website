import React from 'react';
import Grid from './Grid';
import { info } from '@/lib/info';
import Email from '../Email';
import Anchor from '../ui/Anchor';

const Footer: React.FC = () => {
	return (
		<div className='w-full [background:linear-gradient(120deg,#eed0ad,#e8c7ef_38%,#d2ccee_76%,#b2d1ee)] dark:[background:none] [backgroundSize:400% 400%] [animation:bg\_gradient_10s_ease_infinite] [animationPlayState:running]'>
			<div className='w-full py-20 center [background:radial-gradient(110%_75%_at_50%_110%,transparent,var(--color-light-900)_75%)] dark:[background:radial-gradient(110%_75%_at_50%_110%,transparent,var(--color-dark-500)_75%)]'>
				<div className='w-full md:w-2/3 px-10 py-8 mx-3 bg-gradient-to-b from-light-700 dark:from-dark-600 rounded-3xl'>
					<div className='flex justify-between gap-5 flex-col sm:flex-row'>
						<Grid />
					</div>
					<p className='my-10'>
						Contact us at <Email />.
					</p>
					<hr className='my-10 border-t-2 border-solid w-full border-lowlight-300 dark:border-highlight-200' />
					<div className='flex items-center gap-5 flex-col'>
						<p className='text-3xl font-bold text-center'>{info.slogan}</p>
						<div className='flex gap-5 justify-between w-[340px]'>
							{' '}
							{/* 340px is the width of the slogan */}
							{info.copyright ?? info.name}
							<Anchor href='/sitemap.xml'>Sitemap</Anchor>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
