import { TbCopyright } from 'react-icons/tb';

type RequireOnlyOne<T> = {
	[K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

export namespace Sitemap {
	type BaseGroup = {
		title: string;
		description: string;
		icon?: React.ReactNode;
		exempt?: boolean;
	};

	export type Group = BaseGroup &
		RequireOnlyOne<{
			link?: string;
			callback?: () => void;
			items: Item[];
		}>;

	type BaseItem = {
		title: string;
		description: string;
		icon?: React.ReactNode;
		exempt?: boolean;
		open_in_new?: boolean;
	};

	export type Item = BaseItem &
		RequireOnlyOne<{
			link?: string;
			callback?: () => void;
		}>;
}

export interface Info {
	name: string;
	slogan: string;
	domain: string;
	logo_src: string;
	copyright?: React.ReactElement;
	sitemap: Sitemap.Group[];
	banner?: {
		text: string;
		url: string;
	};
	contact?: {
		email?: string;
		phone?: string;
		hours?: string[];
		location?: {
			address: string;
			CSZ: string;
		};
	};
	socials?: {
		name: string;
		url: string;
		icon: React.ReactElement;
	}[];
	last_update: Date;
}

export const info: Info = {
	name: 'Costellar Template',
	slogan: 'Modern. Fast. Awesome.',
	copyright: (
		<div className='flex items-center gap-1 text-sm'>
			<TbCopyright />
			<p>2025 Costellar</p>
		</div>
	),
	logo_src: '/costellar_logo.svg',
	domain: 'https://costellar.net',
	sitemap: [
		{
			title: 'Sitemap',
			description: 'A map to our site.',
			link: '/sitemap',
			exempt: true,
		},
		{
			title: 'Products',
			description: 'All of our services',
			items: [
				{
					title: 'Quoting',
					description: 'Get a free quote for your own website!',
					link: '/quote',
				},
				{
					title: 'Management',
					description: 'Get a free quote for your own website!',
					link: '/management',
				},
			],
		},
		{
			title: 'About',
			description: 'Everything to know about our services.',
			items: [
				{
					title: 'Features',
					description: 'The included services we provide in our websites.',
					link: '/features',
				},
				{
					title: 'Portfolio',
					description: "View our portfolio of websites we've made.",
					link: '/portfolio',
				},
			],
		},
		{
			title: 'Resources',
			description: 'Extra pages like TOS, Privacy, etc.',
			items: [
				{
					title: 'Terms',
					description: 'Costellar terms of service.',
					link: '/terms',
				},
				{
					title: 'Privacy',
					description: 'Costellar Privacy Policy.',
					link: '/privacy',
				},
			],
		},
	],
	contact: {
		email: 'contact@costellar.net',
	},
	last_update: new Date(2025, 2, 11),
};
