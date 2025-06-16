'use client';

import { useColorScheme } from '@mantine/hooks';
import { createContext, useState } from 'react';
import clsx from 'clsx';
import type { Theme } from '@/types/theme';
// import { AuthContext } from './Authentication';

interface C {
	setScrollLocked: React.Dispatch<React.SetStateAction<boolean>>;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
	theme: Theme;
}

interface P extends React.HTMLAttributes<HTMLBodyElement> {
	children: React.ReactNode;
	font: string;
	className?: string;
	locked?: boolean;
	defaultTheme?: Theme;
}

export const CostellarContext = createContext<C>({
	setScrollLocked: () => {},
	setTheme: () => {},
	theme: 'system',
});

export const CostellarProvider: React.FC<P> = ({
	children,
	className,
	locked = false,
	defaultTheme = 'system',
	font,
	...props
}) => {
	// const { user } = useContext(AuthContext);

	const [scrollLocked, setScrollLocked] = useState(locked);
	const [theme, setTheme] = useState(defaultTheme);
	const defaultScheme = useColorScheme('dark');

	// useEffect(() => {
	// 	if (!user) {
	// 		return;
	// 	}

	// 	setTheme(user.settings.theme);
	// }, [user]);

	return (
		<CostellarContext.Provider value={{ theme, setScrollLocked, setTheme }}>
			<body
				className={clsx(scrollLocked && 'scroll-locked', font, theme === 'system' ? defaultScheme : theme, className)}
				{...props}>
				{children}
			</body>
		</CostellarContext.Provider>
	);
};
