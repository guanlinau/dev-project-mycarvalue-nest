import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }

    return this.repo.findOneBy({ id });
  }
  findByEmail(email: string) {
    return this.repo.findBy({ email: email });
  }
  async updateOne(id: number, args: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} does not exist!`);
    }
    const updatedUser = Object.assign(user, args);
    return this.repo.save(updatedUser);
  }
  async removeOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} does not exist!`);
    }
    return this.repo.remove(user);
  }
}
