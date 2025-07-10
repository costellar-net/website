'use client';

import React from 'react';
import clsx from 'clsx';

interface SliderProps<T extends string | number = string> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
	values: T[];
	value: T;
	onChange: (value: T) => void;
	labelRenderer?: (size: T, selected: boolean) => React.ReactNode;
}

const Slider = <T extends string | number = string>({
	values,
	value,
	onChange,
	labelRenderer,
	className,
	...props
}: SliderProps<T>) => {
	const selectedIdx = values.findIndex((s) => s === value);
	return (
		<div className={clsx('flex flex-col items-center mt-10 mb-5 w-full', className)} {...props}>
			{/* Slider Track with Fill */}
			<div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 w-full pointer-events-none'>
				<div
					className='h-full bg-accent rounded-full'
					style={{
						width: `${((selectedIdx !== -1 ? selectedIdx : 0) / (values.length - 1)) * 100}%`,
						transition: 'width 0.2s',
					}}
				/>
				<div className='h-full bg-dark-100 rounded-full w-full absolute top-0 left-0 -z-10' />
			</div>
			<input
				type='range'
				min={0}
				max={values.length - 1}
				step={1}
				value={selectedIdx !== -1 ? selectedIdx : 0}
				onChange={(e) => onChange(values[parseInt(e.target.value)])}
				className='slider w-full relative z-10'
				style={{ background: 'transparent' }}
			/>
			{values.map((val, i) => {
				const percent = i / (values.length - 1);
				const left = `calc(${percent * 100}% - ${(-1 * 16) / 2}px + ${((2 * (-1 * 16)) / 2) * percent}px - 1px)`;
				const selected = value === val;
				return (
					<div className='absolute flex flex-col items-center top-[-8px]' key={String(val)} style={{ left }}>
						<hr className='h-6 w-0 border-0 border-r-2 border-dark-100 border-solid -z-10' />
						<p
							className={clsx(
								'text-xs absolute top-full mt-1 w-40 text-center',
								selected ? 'font-bold text-accent' : 'text-dark-900/60 dark:text-highlight-900'
							)}>
							{labelRenderer ? labelRenderer(val, selected) : val}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Slider;
