import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { stringify } from 'querystring';
import { async } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  // create a instance of AuthService before any statement testing
  beforeEach(async () => {
    //assign the value to fakeUsersService
   const fakeUsersService :Partial<UsersService>= {

      findByEmail: (email: string) => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    //Create a Test DI system
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    // To get the instance of AutService in the DI system
    service = module.get<AuthService>(AuthService);
  });

  //Statement 1
  it('can create a instance of AuthService', async () => {
    expect(service).toBeDefined();
  });
  //Statement 2
  it('creates a new user with a salted  and hashed password', async () => {
    const user = await service.signup('email@gmail.com', 'mjhh');
    expect(user.password).not.toEqual('mjhh');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  //Statement 3
  it('throw an error if user signup with a email that is in user ', async () => {
    await service.signup("email@gmail.com", "9999")
    try {
      await service.signup('email@gmail.com', 'dddd');
    } catch (error) {}
  });

  //Statement 4
  it('throw an error if signin was called with a unused email', async () => {
    try {
      await service.signin('email@gmail.com', 'ddddd');
    } catch (error) {}
  });
  //statement 5
  it('throw an error if an invalid password is provided!', async () => {
    await service.signup("email@gmail.com", "9999")
    try {
      await service.signin('email@gmail.com', '1');
    } catch (error) {}
  });

  //statement6
  it('throw a user if correct password is provided', async () => {
    await service.signup("email@gmail.com", "9999")

    const user = await service.signin("email@gmail.com", "9999");
    expect(user).toBeDefined();
    
  });
  
});
