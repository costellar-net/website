import type { Website } from '@/types/website';

const websites: Website[] = [
	{
		name: 'Custom Glass Film',
		url: 'customglassfilm.com',
		status: 100,
	},
	{
		name: 'Naples Tint Company',
		url: 'naplestintcompany.com',
		status: 0,
	},
];

export function fetchWebsite(name: string) {
	return new Promise<Website | null>((resolve) => {
		setTimeout(() => {
			resolve(websites.find((w) => w.url === name) ?? null);
		}, 1000);
	});
}

export function fetchWebsites() {
	return new Promise<Website[]>((resolve) => {
		setTimeout(() => {
			resolve(websites);
		}, 1000);
	});
}
