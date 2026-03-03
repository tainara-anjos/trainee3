import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  private get db() {
    return this.databaseService.getDb();
  }

  async create(name: string, email: string , age: number, pet: string){
    const result = await new Promise<any>((resolve, reject) => {
      this.db.run(
        `INSERT INTO users (name, email, age, pet) VALUES (?, ?, ?, ?)`,
        [name, email, age, pet],
        function (err){ 
          if (err) return reject(err);
          resolve({id: this.lastID, name, email,age, pet});

        }
      )
    })
 return result;
  }

  async FindAll() {
    const rows = await new Promise<any[]>((resolve, reject) =>{
      this.db.all(`SELECT * FROM  users`, [], (err, rows) => {
        if (err) return reject (err);
        resolve(rows);
      });
    });
    return rows;
  }

async findOne(id: number){
  const row = await new Promise<any>((resolve, reject) => {
    this.db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
     if (err) return reject(err);
     resolve(row); 
    });
  }) ;

  return row;
}

 async update(id: number, name: string, email: string, age: number, pet: string) {
    const result = await new Promise<any>((resolve, reject) => {
      this.db.run(
        `UPDATE users SET name = ?, email = ?, age = ?, pet = ? WHERE id = ?`,
        [name, email, age, pet, id],
        function (err) {
          if (err) return reject(err);
          resolve({ updated: this.changes });
        },
      );
    });

    return result;
  }

  async remove(id: number) {
    const result = await new Promise<any>((resolve, reject) => {
      this.db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
        if (err) return reject(err);
        resolve({ deleted: this.changes });
      });
    });

    return result;
  }
}