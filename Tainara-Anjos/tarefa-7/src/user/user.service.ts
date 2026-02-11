// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { connect } from '../database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto) {
    const db = await connect();
    const result = await db.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [createUserDto.name, createUserDto.email]
    );
    return { id: result.lastID, ...createUserDto };
  }

  async findAll() {
    const db = await connect();
    return db.all('SELECT * FROM users');
  }

  async findOne(id: number) {
    const db = await connect();
    return db.get('SELECT * FROM users WHERE id = ?', [id]);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const db = await connect();
    await db.run(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [updateUserDto.name, updateUserDto.email, id]
    );
    return { id, ...updateUserDto };
  }

  async remove(id: number) {
    const db = await connect();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    return { deletedId: id };
  }
}
