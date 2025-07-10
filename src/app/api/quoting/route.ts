import { FormSchema } from '@/app/(root)/quote/page';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const { name, email, website, message, size, specifications, base, monthly }: FormSchema = await req.json();

	console.log({ name, email, message, website, size, specifications, base, monthly });

	return new Response(JSON.stringify({ result: 200 }), {
		status: 200,
	});

	const requestBody = {
		parent: { database_id: process.env.CRM_DATABASE_ID },
		properties: {
			Name: {
				title: [
					{
						text: {
							content: name,
						},
					},
				],
			},
			Representative: {
				rich_text: [
					{
						text: {
							content: name,
						},
					},
				],
			},
			Status: {
				select: {
					name: 'Contact Form',
				},
			},
			Email: {
				email: email,
			},
			...(phone && {
				Phone: {
					phone_number: phone,
				},
			}),
			...(website && {
				Link: {
					url: website,
				},
			}),
			'Contact Method': {
				select: {
					name: use_phone ? 'Phone' : 'Email',
				},
			},
		},
	};

	const res = await fetch(process.env.API_ROUTE!, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NOTION_FORM_API_KEY}`,
			'Notion-Version': '2022-06-28',
		},
		body: JSON.stringify(requestBody),
	});

	const data = await res.json();
	console.log('Notion API response:', data);

	return new Response(JSON.stringify({ result: data.status }), {
		status: res.ok ? 200 : res.status,
	});
}
