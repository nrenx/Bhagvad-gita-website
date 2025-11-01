import { generateSitemap } from '@/lib/sitemap';

export const dynamic = 'force-static';
export const revalidate = 0;

export async function GET() {
	const sitemap = generateSitemap();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
		}
	});
}
