'use client';

import styles from './loader.module.css';

const Loader: React.FC = () => {
	return (
		<div className='size-full center'>
			<div className={styles.loader} />
		</div>
	);
};

export default Loader;
