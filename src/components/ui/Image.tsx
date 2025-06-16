'use client';

import React, { SyntheticEvent, useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { HiExclamationCircle } from 'react-icons/hi';

interface P extends ImageProps {
	fallbackClassName?: string;
	fallbackText?: string;
}

const Image: React.FC<P> = ({
	fallbackClassName = 'center text-center leading-tight rounded-3xl bg-lowlight-200 dark:bg-lowlight-900 dark:text-highlight-900 p-3 gap-1',
	fallbackText = 'Image not available',
	className,
	draggable = false,
	...props
}) => {
	const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event> | null>(null);

	const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		e.preventDefault();

		setError(e);
	};

	if (error) {
		return (
			<div
				className={`${fallbackClassName} ${className || ''}`}
				style={props.width && props.height ? { width: props.width, height: props.height } : {}}>
				<HiExclamationCircle className='size-5' />
				{fallbackText}
			</div>
		);
	}

	return <NextImage draggable={draggable} onError={handleError} className={className} {...props}></NextImage>;
};

export default Image;
