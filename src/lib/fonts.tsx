import localFont from 'next/font/local';

export const font_body = localFont({
	src: [
		{
			path: './fonts/Supreme-VariableItalic.ttf',
		},
		{
			path: './fonts/Supreme-Variable.ttf',
		},
	],
	variable: '--font-body',
});

export const font_title = localFont({
	src: [
		{
			path: './fonts/Manrope-Variable.ttf',
		},
	],

	variable: '--font-title',
});

export const font_accent = localFont({
	src: [
		{
			path: './fonts/Stardom-Regular.otf',
		},
	],

	variable: '--font-accent',
});
