import { Injectable } from '@nestjs/common';
import { UserDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      age: 25,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      age: 30,
      createdAt: new Date('2024-01-02'),
    },
  ];

  findAll(): UserDto[] {
    return this.users;
  }

  findOne(id: number): UserDto | undefined {
    return this.users.find(user => user.id === id);
  }

  create(createUserDto: CreateUserDto): UserDto {
    const newUser: UserDto = {
      id: this.users.length + 1,
      name: createUserDto.name,
      email: createUserDto.email,
      age: createUserDto.age || 0,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): UserDto | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    return this.users[userIndex];
  }

  remove(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }
}
