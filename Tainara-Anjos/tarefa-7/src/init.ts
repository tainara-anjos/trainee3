import { connect } from './database';

export async function initDB() {
  try {
    const db = await connect();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
      )
    `);

    console.log('Banco SQLite inicializado com sucesso!');
  } catch (err) {
    console.error('Erro ao inicializar o banco:', err);
  }
}
