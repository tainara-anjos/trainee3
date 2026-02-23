import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
create(@Body() body: any) {
  const { name, email, age, pet } = body;
  return this.usersService.create(name, email, age, pet);
}

  @Get()
  findAll() {
    return this.usersService.FindAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

 @Put(':id')
update(@Param('id') id: string, @Body() body: any) {
  const { name, email, age, pet } = body;
  return this.usersService.update(Number(id), name, email, age, pet);
}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}