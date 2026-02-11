import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function connect(): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
}

 