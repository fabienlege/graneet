import { registerAs } from "@nestjs/config";
import { join, resolve } from "path";

export default registerAs('database', () => {
  return {
    type: "postgres",
    logging: true,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    entities: [resolve('dist', 'src', '**', '*.entity.{ts,js}')],
    migrations: [resolve('dist', 'src', 'migrations', '*{.ts,.js}')],
    cli: {
      migrationsDir: 'src/migrations'
    },
    synchronize: false,
  }
})