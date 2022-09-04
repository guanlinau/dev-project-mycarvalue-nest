import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userSer: UsersService) {}

  async signup(email: string, password: string) {
    //check if the email is used already
    const user = await this.userSer.findByEmail(email);

    if (user.length) {
      throw new BadRequestException(
        'The email is already used, please try other one again!',
      );
    }

    //hash the password
    // Generate  a salt
    const salt = randomBytes(8).toString('hex'); // one number will get 2bytes ,so here is 16 bytes

    //hash the password and salt together.here use buffer to help typescript know the type of hash
    // or hash type will be unknown
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hash and salt together
    //hash is a format in buffer, so we need to converi it to a hex string,
    // so that we can plus it with salt string
    const resultPsw = salt + '.' + hash.toString('hex');

    //create a new user by this email and password and save it into the database
    const newUser = await this.userSer.create(email, resultPsw);

    //send back the response/cookie to the client
    return newUser;
  }
  async signin(email: string, password: string) {
    const [user] = await this.userSer.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Not Found User!');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new NotFoundException('Not found user!');
    }
    return user;
  }
}
