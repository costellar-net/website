'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Lightbox from '@/components/ui/Lightbox';
import { CostellarContext } from './Costellar';

interface Item {
	image: string;
	name?: string;
}

interface LightboxContextType {
	openLightbox: (item: Item, contextItems?: Item[]) => void;
	closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const useLightbox = () => {
	const ctx = useContext(LightboxContext);
	if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
	return ctx;
};

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
	const [shown, setShown] = useState(false);
	const [item, setItem] = useState<Item | null>(null);
	const [contextItems, setContextItems] = useState<Item[] | undefined>(undefined);
	const { setScrollLocked } = useContext(CostellarContext);

	useEffect(() => {
		setScrollLocked(shown);
	}, [shown]);

	const openLightbox = (item: Item, contextItems?: Item[]) => {
		setItem(item);
		setContextItems(contextItems);
		setShown(true);
	};

	const closeLightbox = () => setShown(false);

	return (
		<LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
			{children}
			{shown && item && <Lightbox item={item} contextItems={contextItems} shown={shown} setShown={setShown} />}
		</LightboxContext.Provider>
	);
};
