import React from 'react';
import Image from './Image';
import { ImageProps } from 'next/image';

interface P extends Omit<ImageProps, 'alt'> {
	alt?: string;
	size?: number;
	className?: string;
}

const ProfilePicture: React.FC<P> = ({ alt = 'Profile Picture', size = 50, className = 'rounded-full', ...props }) => {
	return <Image alt={alt} width={size} height={size} fallbackText='' className={className} {...props} />;
};

export default ProfilePicture;
