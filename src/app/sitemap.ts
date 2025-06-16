import { info } from '@/lib/info';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const sitemap: MetadataRoute.Sitemap = [
		{
			url: info.domain,
			lastModified: info.last_update,
			changeFrequency: 'monthly',
			priority: 1,
		},
	];

	info.sitemap.forEach((group) => {
		if (group.link && !group.exempt) {
			sitemap.push({
				url: info.domain + group.link,
				lastModified: info.last_update,
				changeFrequency: 'monthly',
				priority: 0.5,
			});
		}

		if (group.items) {
			group.items.forEach((item) => {
				if (!item.link || item.exempt) {
					return;
				}

				sitemap.push({
					url: info.domain + item.link,
					lastModified: info.last_update,
					changeFrequency: 'monthly',
					priority: 0.5,
				});
			});
		}
	});

	return sitemap;
}
