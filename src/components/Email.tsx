import { info } from '@/lib/info';
import Link from 'next/link';

const Email: React.FC = () => {
	if (!info.contact || !info.contact.email) {
		return null;
	}

	return (
		<Link href={`mailto:${info.contact.email}`} className='link'>
			{info.contact.email}
		</Link>
	);
};

export default Email;
