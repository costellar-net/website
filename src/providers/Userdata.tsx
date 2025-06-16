'use client';

import { createContext, useEffect, useState } from 'react';

interface Userdata {
	loaded: boolean;
}

interface C {
	deleteUserdata: () => void;
	updateUserdata: (to: Partial<Userdata>) => void;
	userdata: Userdata;
}

interface P extends React.HTMLAttributes<HTMLBodyElement> {
	children: React.ReactNode;
}

const defaultUserdata: Userdata = {
	loaded: false,
};

export const UserdataContext = createContext<C>({
	deleteUserdata: () => {},
	updateUserdata: () => {},
	userdata: defaultUserdata,
});

export const UserdataProvider: React.FC<P> = ({ children }) => {
	const [userdata, setUserdata] = useState<Userdata>(defaultUserdata);

	const deleteUserdata = () => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.removeItem('userdata');

		setUserdata(defaultUserdata);
	};

	const updateUserdata = (to: Partial<Userdata>): void => {
		setUserdata({ ...userdata, ...to });
	};

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		if (!userdata.loaded) {
			const storedUserdata = window.localStorage.getItem('userdata');

			if (!storedUserdata) {
				setUserdata({ ...defaultUserdata, loaded: true });
				console.log('Created userdata');
				return;
			}

			const loadedUserdata: Userdata = JSON.parse(storedUserdata);

			setUserdata({ ...loadedUserdata, loaded: true });
			console.log('Loaded userdata');
			return;
		}

		window.localStorage.setItem('userdata', JSON.stringify(userdata));
		console.log('Saved userdata');
	}, [userdata]);

	return (
		<UserdataContext.Provider value={{ updateUserdata, deleteUserdata, userdata }}>
			{children}
		</UserdataContext.Provider>
	);
};
