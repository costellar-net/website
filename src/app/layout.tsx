import type { Metadata } from 'next';
import { IconProvider } from '@/providers/Icons';
import { CostellarProvider } from '@/providers/Costellar';
import { font_accent, font_body, font_title } from '@/lib/fonts';
import Animations from '@/lib/animations/lazy';
import { UserdataProvider } from '@/providers/Userdata';
import { LightboxProvider } from '@/providers/Lightbox';
import clsx from 'clsx';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'Costellar: Exceptional Web Solutions for Your Digital Success',
	description:
		"Elevate your online presence with Costellar. Our web development expertise combines innovation and precision to create bespoke digital solutions tailored to your needs. Let's transform your vision into a stunning reality.",
	keywords: [
		'make and build website development company',
		'web app and page application',
		'custom high quality simple for small business',
		'digital marketing agency',
		'online marketing',
		'social media marketing agency for small business',
		'online website design',
		'best website makers and creator',
		'modern developer',
		'blazingly fast no loading time',
		'e-commerce store, portfolio page, and company homepage',
		'professional ui ux design',
		'database data driven optimized up to date latest seo',
		'ai generated',
		'html javascript typescript css react wordpress php',
		'full stack front-end back-end',
	],
};

const schema = {
	'@context': 'http://schema.org',
	'@type': 'Organization',
	name: 'Costellar Web Design',
	url: 'https://costellar.net',
	logo: 'https://costellar.net/favicon.ico',
	sameAs: ['https://x.com/costellarllc', 'https://www.instagram.com/costellarcompany', 'https://www.tiktok.com/@costellarweb'],
	contactPoint: {
		'@type': 'ContactPoint',
		telephone: '+1-716-427-4280',
		email: 'contact@costellar.net',
		contactType: 'Customer Service',
		areaServed: 'US',
		availableLanguage: 'English',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<IconProvider>
				<CostellarProvider font={clsx(font_body.variable, font_title.variable, font_accent.variable, font_body.className)}>
					<Animations>
						<LightboxProvider>
							<UserdataProvider>{children}</UserdataProvider>
						</LightboxProvider>
					</Animations>
					<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
				</CostellarProvider>
			</IconProvider>
		</html>
	);
}
