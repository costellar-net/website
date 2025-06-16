import Footer from '@/components/footer/Footer';
import Nav from '@/components/nav/Nav';
import React from 'react';

interface P {
	children: React.ReactElement;
}

const layout: React.FC<P> = ({ children }) => {
	return (
		<>
			<Nav />
			{children}
			<Footer />
		</>
	);
};

export default layout;
