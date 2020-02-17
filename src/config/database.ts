
import { env } from '../helpers'

export default {
	default: env('DB_CONNECTION', 'postgres'),
	connections: {
		postgres: {
			type: 'postgres',
			host: env('DB_HOST', 'localhost'),
			port: env('DB_PORT', 5432),
			username: env('DB_USERNAME', 'postgres'),
			password: env('DB_PASSWORD', 'postgres'),
			database: env('DB_DATABASE', 'xena_db'),
			schema: env('DB_SCHEMA', 'public'),
		}
	}
};
