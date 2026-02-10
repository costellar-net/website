import { FormSchema } from '@/app/(root)/quote/page';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		if (!process.env.CRM_DATABASE_ID || !process.env.API_ROUTE || !process.env.NOTION_FORM_API_KEY) {
			return NextResponse.json(
				{
					result: 'Missing required environment variables.',
					required: ['CRM_DATABASE_ID', 'API_ROUTE', 'NOTION_FORM_API_KEY'],
				},
				{ status: 500 },
			);
		}

		const { name, email, website, message, size, specifications, base, monthly }: FormSchema = await req.json();

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
				...(size && {
					Size: {
						rich_text: [
							{
								text: {
									content: size,
								},
							},
						],
					},
				}),
				...(specifications &&
					specifications.length > 0 && {
						Specifications: {
							rich_text: [
								{
									text: {
										content: specifications.join(', '),
									},
								},
							],
						},
					}),
				...(message && {
					Message: {
						rich_text: [
							{
								text: {
									content: message,
								},
							},
						],
					},
				}),
				...(typeof base === 'number' && {
					Base: {
						number: base,
					},
				}),
				...(typeof monthly === 'number' && {
					Monthly: {
						number: monthly,
					},
				}),
				...(website && {
					Link: {
						url: website,
					},
				}),
			},
		};

		const res = await fetch(process.env.API_ROUTE, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NOTION_FORM_API_KEY}`,
				'Notion-Version': '2022-06-28',
			},
			body: JSON.stringify(requestBody),
		});

		const contentType = res.headers.get('content-type') ?? '';
		const data = contentType.includes('application/json') ? await res.json() : await res.text();
		console.log('Notion API response:', data);

		return NextResponse.json(
			{
				result: res.ok ? 200 : res.status,
				notion: data,
			},
			{ status: res.ok ? 200 : res.status },
		);
	} catch (error) {
		console.error('Quote API error:', error);
		return NextResponse.json(
			{
				result: 500,
				message: 'Failed to process quote request.',
			},
			{ status: 500 },
		);
	}
}
