'use client';

import clsx from 'clsx';
import Loader from './Loader';
import React from 'react';
import Tooltip from './Tooltip';

interface P extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	loading?: boolean;
	disabled?: boolean;
	variant?: 'Outlined' | 'Low' | 'Link';
	title?: string;
	tooltip?: string;
}

const Button: React.FC<P> = ({ disabled, loading, icon, children, className, variant, title, tooltip, ...props }) => {
	const Btn = () => (
		<button
			disabled={disabled || loading}
			className={clsx(
				className,
				icon ? 'icon' : !variant && 'button',
				variant === 'Link' && 'link',
				variant === 'Outlined' &&
					'button text-dark-500! dark:text-light-900! bg-transparent! border-2! border-dark-500! dark:border-light-900! hover:bg-dark-500! dark:hover:bg-light-900! hover:text-light-800! dark:hover:text-dark-800!',
				variant === 'Low' &&
					'button text-dark-500! dark:text-light-900! bg-lowlight-100! dark:bg-highlight-100! hover:bg-lowlight-200! dark:hover:bg-highlight-200!',
				loading && 'loading'
			)}
			aria-label={tooltip ? tooltip : title ?? (typeof children === 'string' ? children : 'Button')}
			title={title ?? (typeof children === 'string' ? children : '')}
			{...props}>
			{loading ? (
				<>
					{!icon && <p>Loading</p>}
					<Loader className={clsx('text-white dark:text-dark-600', icon ? 'size-6' : 'size-4')} />
				</>
			) : (
				<>{children}</>
			)}
		</button>
	);

	if (tooltip && !disabled) {
		return (
			<Tooltip label={tooltip}>
				<Btn />
			</Tooltip>
		);
	}

	return <Btn />;
};

Button.displayName = 'Button';

export default Button;
