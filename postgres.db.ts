import postgres from 'npm:postgres@3.4.5';

export const sql = postgres({
	host: 'localhost',
	port: 5432,
	database: 'postgres',
	username: '',
});
