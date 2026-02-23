import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: sqlite3.Database;

  onModuleInit() {
    this.db = new sqlite3.Database('database.sqlite');

    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    age INTEGER,
    pet TEXT
  )
    `);
  }

  getDb() {
    return this.db;
  }
}