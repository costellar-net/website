import { info } from '@/lib/info';
import Link from 'next/link';
import React from 'react';

const Grid: React.FC = () => {
	return (
		<div className='grid w-1/2 gap-10 grid-rows-1 grid-flow-col'>
			{info.sitemap.map((group, i) => {
				if (group.items) {
					return (
						<div key={i}>
							<p className='text-xl mb-2'>{group.title}</p>
							<div className='flex flex-col gap-2'>
								{group.items.map((item, j) => {
									if (item.callback) {
										return (
											<button title={item.title} className='link' key={j} onClick={item.callback}>
												{item.title}
											</button>
										);
									}

									if (item.link) {
										return (
											<Link title={item.title} href={item.link} className='link' key={j}>
												{item.title}
											</Link>
										);
									}

									return <p key={j}>Error</p>;
								})}
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
};
export default Grid;
