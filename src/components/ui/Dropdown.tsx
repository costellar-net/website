import { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface DropdownProps<T extends string> {
	label: string;
	options: { label: string; value: T }[];
	value: T;
	onChange: (value: T) => void;
	className?: string;
	buttonClassName?: string;
	menuClassName?: string;
}

export function Dropdown<T extends string>({
	label,
	options,
	value,
	onChange,
	className = '',
	buttonClassName = '',
	menuClassName = '',
}: DropdownProps<T>) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		if (open) {
			document.addEventListener('mousedown', handleClick);
		} else {
			document.removeEventListener('mousedown', handleClick);
		}
		return () => document.removeEventListener('mousedown', handleClick);
	}, [open]);

	const selected = options.find((o) => o.value === value);

	return (
		<div ref={ref} className={`inline-block ${className}`}>
			<button
				type='button'
				className={`focusable flex items-center gap-1 px-3 py-2 rounded-xl bg-light-100 dark:bg-highlight-100 hover:bg-lowlight-200 hover:dark:bg-highlight-200 transition-colors cursor-pointer md:text-lg ${buttonClassName}`}
				onClick={() => setOpen((o) => !o)}
				aria-haspopup='listbox'
				aria-expanded={open}>
				<span className='flex items-center gap-1'>
					<span className='max-sm:hidden whitespace-nowrap'>{label} </span>
					<span className='whitespace-nowrap'>{selected?.label}</span>
				</span>
				<HiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={22} />
			</button>
			{open && (
				<ul
					className={`text-xl absolute left-0 mt-2 w-full z-10 bg-light-100 dark:bg-dark-300 rounded-xl overflow-hidden shadow-xl ${menuClassName}`}
					role='listbox'>
					{options.map((opt) => (
						<li
							key={opt.value}
							className={`px-4 py-2 cursor-pointer hover:bg-light-200 hover:dark:bg-dark-100 transition-colors ${
								opt.value === value ? 'font-bold' : ''
							}`}
							onClick={() => {
								onChange(opt.value);
								setOpen(false);
							}}
							role='option'
							aria-selected={opt.value === value}>
							{opt.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
