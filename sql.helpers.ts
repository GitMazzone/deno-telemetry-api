import { sql } from './postgres.db.ts';

export const andEventTypeIs = (type: string) => sql`AND eventType = ${type}`;
export const andIsFrom = (from: string) => sql`AND timestamp >= ${from}`;
export const andIsTo = (to: string) => sql`AND timestamp <= ${to}`;
export const andIsWithinDateRange = (from: string, to: string) =>
	sql`AND timestamp >= ${from} AND timestamp <= ${to}`;
