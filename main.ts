import express, { Request, Response } from 'npm:express@4.21.1';
import { rateLimit } from 'npm:express-rate-limit';
import { getEvents } from './routes/events/getEvents.route.ts';
import { postEvent } from './routes/events/postEvent.route.ts';

const app = express();
app.use(express.json());
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		limit: 1000, // Limit each IP to 1000 requests per 15 minute window
		standardHeaders: 'draft-7',
		legacyHeaders: false,
		message: { error: 'Please try again in a bit.' },
	})
);

app.get('/api/events', async (req: Request, res: Response) => {
	try {
		const events = await getEvents(
			req.query.userId || null,
			req.query.eventType || null,
			req.query.from || null,
			req.query.to || null,
			req.query.limit || 50,
			req.query.offset || 0
		);

		res.json(events);
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error
					? error.message
					: 'Unknown Express server error trying to GET events',
		});
	}
});

app.post('/api/event', async (req: Request, res: Response) => {
	try {
		const event = await postEvent(
			req.body.userId,
			req.body.eventType,
			req.body.metadata,
			req.body.timestamp || new Date()
		);

		res.status(201).json(event);
	} catch (error) {
		res.status(500).json({
			error:
				error instanceof Error
					? error.message
					: 'Unknown Express server error trying to POST events',
		});
	}
});

app.listen(8000);
