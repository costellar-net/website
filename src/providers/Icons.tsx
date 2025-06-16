'use client';

import { IconContext } from 'react-icons';

export const IconProvider = ({ children }: { children: React.ReactNode }) => {
	return <IconContext.Provider value={{ size: '24' }}>{children}</IconContext.Provider>;
};
