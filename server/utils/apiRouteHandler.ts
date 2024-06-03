import type { EventHandler, EventHandlerRequest } from 'h3';

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
	handler: EventHandler<T, D>
): EventHandler<T, D> =>
	defineEventHandler<T>(async (event) => {
		try {
			return await handler(event);
		} catch (rawError) {
			const error = rawError as Error & { statusCode?: number };
			console.error('Error in handler:', error);
			const statusCode = error.statusCode || 500;
			const message = error.message || 'Internal Server Error';
			const stack =
				process.env.NODE_ENV === 'development' ? error.stack : undefined;

			return event.node.res.end(
				JSON.stringify({
					statusCode,
					message,
					stack,
				})
			);
		}
	});
