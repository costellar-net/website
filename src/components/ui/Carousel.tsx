'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Button from './Button';
import { useLightbox } from '@/providers/Lightbox';
import { useViewportSize } from '@mantine/hooks';
import Anchor from './Anchor';

interface P extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Array of image URLs to display
	 */
	items: {
		name?: string;
		image: string;
		url?: string;
		price?: number;
	}[];
	/**
	 * Number of images visible at once in the viewport (fully visible count)
	 */
	visibleCount?: number;
	/**
	 * Gap between images, in pixels
	 */
	gap?: number;
	/**
	 * Height of images in px number
	 */
	height?: number;
	className?: string;
}

const Carousel: React.FC<P> = ({ className, items, visibleCount: N = 1, gap = 64, height = 600, ...props }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { width } = useViewportSize();
	const { openLightbox } = useLightbox();
	const [containerWidth, setContainerWidth] = useState(0);

	const clones = N + 1;
	const [index, setIndex] = useState(clones);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		const measure = () => {
			if (containerRef.current) {
				setContainerWidth(containerRef.current.clientWidth);
			}
		};
		measure();
		window.addEventListener('resize', measure);
		return () => window.removeEventListener('resize', measure);
	}, []);

	if (width <= 1024) {
		gap /= 2;
		height /= 2;
	}

	if (width <= 640) {
		gap /= 2;
		height /= 1.5;
	}

	const totalGap = gap * (N - 1);
	const itemWidth = (containerWidth - totalGap) / (N + 1);
	const centerOffset = (containerWidth - itemWidth) / 2;

	const extendedImages = [...items.slice(items.length - clones), ...items, ...items.slice(0, clones)];

	const current = (((index - clones) % items.length) + items.length) % items.length;

	const handleNext = () => {
		if (isTransitioning) return;
		setIndex((prev) => prev + 1);
		setIsTransitioning(true);
	};

	const handlePrev = () => {
		if (isTransitioning) return;
		setIndex((prev) => prev - 1);
		setIsTransitioning(true);
	};

	const handleDotClick = (i: number) => {
		if (isTransitioning || current === i) return;
		setIsTransitioning(true);
		setIndex(clones + i);
	};

	const handleTransitionEnd = () => {
		setIsTransitioning(false);
		if (index >= items.length + clones) {
			setIndex(clones);
		} else if (index < clones) {
			setIndex(items.length + index);
		}
	};

	return (
		<div ref={containerRef} className={clsx('max-w-screen pt-2 overflow-x-hidden', className)} {...props}>
			<div
				className='flex'
				style={{
					gap: `${gap}px`,
					transform: `translateX(-${index * (itemWidth + gap) - centerOffset}px)`,
					transition: isTransitioning ? 'transform 0.5s ease' : 'none',
				}}
				onTransitionEnd={handleTransitionEnd}>
				{extendedImages.map((item, idx) => (
					<div
						key={idx}
						className='flex-none cursor-pointer transition-transform hover:scale-[1.02]'
						style={{ width: `${itemWidth}px` }}
						onClick={() => openLightbox({ image: item.image }, items)}>
						<Image
							src={item.image}
							alt={`carousel-item-${idx}`}
							width={0}
							height={0}
							sizes='50vw'
							className={clsx('w-full object-cover rounded-3xl')}
							style={{ height }}
						/>
					</div>
				))}
			</div>

			<div className='flex justify-between w-full gap-3 mt-3 px-[25%]'>
				{width > 640 ? (
					<div className='flex flex-col gap-1 min-h-[10vh]'>
						{items[current].name && <p className='md:text-3xl font-title font-bold'>{items[current].name}</p>}
						{items[current].url && (
							<Anchor href={items[current].url} openInNew>
								{items[current].url}
							</Anchor>
						)}
					</div>
				) : (
					<div />
				)}
				<div className='flex flex-col gap-1'>
					<div className='flex gap-3'>
						<Button title='Left' icon onClick={handlePrev} disabled={isTransitioning}>
							<HiChevronLeft className='size-6' />
						</Button>

						<Button title='Right' icon onClick={handleNext} disabled={isTransitioning}>
							<HiChevronRight className='size-6' />
						</Button>
					</div>
					<div className='flex rounded-md overflow-hidden'>
						{items.map((_, i) => (
							<button
								key={i}
								onClick={() => handleDotClick(i)}
								className={clsx(
									'w-full h-1 transition-all focusable cursor-pointer',
									isTransitioning && 'opacity-50 !cursor-not-allowed',
									current === i
										? 'bg-accent hover:bg-accent-dark rounded-xs'
										: 'bg-lowlight-200 dark:bg-highlight-200 hover:dark:bg-highlight-300 hover:bg-lowlight-300'
								)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
