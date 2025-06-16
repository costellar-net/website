import clsx from 'clsx';
import React from 'react';

interface P extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

function hasClass(prefix: string, className?: string) {
	return className?.split(/\s+/).some((cls) => cls.startsWith(prefix));
}

const Loader: React.FC<P> = ({ className = '', ...props }) => {
	const needsDefaultSize = !hasClass('size-', className);
	const needsDefaultText = !hasClass('text-', className);

	return (
		<div
			className={clsx(
				'animate-spin inline-block border-current border-t-transparent rounded-full fill-light-700 border-[3px]',
				needsDefaultSize && 'size-10',
				needsDefaultText && 'text-lowlight-900 dark:text-highlight-900',
				className,
			)}
			role='status'
			aria-label='loading'
			{...props}>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

export default Loader;
