import { JSONValue } from 'npm:postgres@3.4.5';
import { sql } from '../../postgres.db.ts';

export const postEvent = async (
	userId: string,
	eventType: string,
	metadata: JSONValue = {},
	timestamp: Date
) => {
	try {
		return await sql`
      INSERT INTO events (userId, eventType, metadata, timestamp)
      VALUES (${userId}, ${eventType}, ${sql.json(metadata)}, ${timestamp})
    `;
	} catch (error) {
		throw new Error(`SQL failed to POST event: ${error}`);
	}
};
