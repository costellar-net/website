import { clsx } from 'clsx';
import React from 'react';

interface P extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> {
	checked: boolean;
	onChange?: (checked: boolean) => void;
	id?: string;
	className?: string;
	checkBoxClassName?: string;
}

const Checkbox: React.FC<P> = ({ checked, onChange, id, className, checkBoxClassName, ...rest }) => {
	const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

	return (
		<label
			htmlFor={checkboxId}
			tabIndex={0}
			className={clsx(
				'inline-flex items-center space-x-2 cursor-pointer focusable hover:!outline-accent rounded-md transition-colors',
				className
			)}
			{...rest}>
			<input
				id={checkboxId}
				type='checkbox'
				checked={checked}
				onChange={(e) => onChange?.(e.target.checked)}
				className='peer hidden'
			/>
			<div
				className={clsx(
					'size-5 rounded-md border-2 border-lowlight-900 dark:border-highlight-900 peer-checked:bg-green-600 peer-checked:border-green-600 flex items-center justify-center transition-colors',
					checkBoxClassName
				)}>
				{checked && (
					<svg
						className='w-4 h-4 text-white'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='3'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<polyline points='20 6 9 17 4 12' />
					</svg>
				)}
			</div>
		</label>
	);
};

export default Checkbox;
