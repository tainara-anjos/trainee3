import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SanitizeUserPipe } from '../common/pipes/sanitize-user.pipe';

@Controller('users')
export class UsersController {

  @Post()
  @UsePipes(SanitizeUserPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }

}