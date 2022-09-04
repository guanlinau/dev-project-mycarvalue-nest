import {
  Controller,
  Post,
  Body,
  Session,
  Param,
  Query,
  Get,
  Patch,
  Delete,
  NotFoundException,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { OutputUserDto } from './dtos/output-user.dto';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('/users')
@Serialize(OutputUserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(private userSer: UsersService, private authSer: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authSer.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async login(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authSer.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.userSer.findOne(session.userId);
  // }
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoami(@CurrentUserDecorator() user: User) {
    console.log(user);
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    return (session.userId = null);
  }
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userSer.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    const users = await this.userSer.findByEmail(email);
    if (!users) {
      throw new NotFoundException('User not found');
    }
    return users;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userSer.updateOne(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userSer.removeOne(parseInt(id));
  }
}
