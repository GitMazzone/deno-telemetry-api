import { sql } from '../../postgres.db.ts';
import {
	andEventTypeIs,
	andIsFrom,
	andIsTo,
	andIsWithinDateRange,
} from '../../sql.helpers.ts';

export const getEvents = async (
	userId: string | null,
	eventType: string | null,
	from: string | null,
	to: string | null,
	limit = 50,
	offset = 0
) => {
	try {
		return await sql`
      SELECT *
      FROM events
      WHERE
        userId = ${userId}
        ${eventType ? andEventTypeIs(eventType) : sql``}
        ${
					from && to
						? andIsWithinDateRange(from, to)
						: from && !to
						? andIsFrom(from)
						: to && !from
						? andIsTo(to)
						: sql``
				}
      ORDER BY timestamp DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
	} catch (error) {
		throw new Error(`SQL failed to GET events: ${error}`);
	}
};
