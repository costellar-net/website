import Footer from '@/components/footer/Footer';
import Nav from '@/components/nav/Nav';
import React from 'react';

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<>
			<Nav />
			{children}
			<Footer />
		</>
	);
};

export default RootLayout;
