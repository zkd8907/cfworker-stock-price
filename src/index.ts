/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { stocks } from "stock-api";


export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		console.debug(`url: ${url}`);
		const code = url.searchParams.get('code');
		console.debug(`code: ${code}`);

		if (!code) {
			return new Response('Not Found: code parameter is required', {
				status: 404
			});
		}

		const details = await stocks.tencent.searchStocks([code])

		return new Response(details);
	},
} satisfies ExportedHandler<Env>;
