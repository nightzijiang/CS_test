import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户姓名', example: '张三' })
  @IsString()
  name: string;

  @ApiProperty({ description: '用户邮箱', example: 'zhangsan@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: '用户年龄', example: 25 })
  @IsOptional()
  @IsInt()
  age?: number;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '用户姓名', example: '李四' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '用户邮箱', example: 'lisi@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: '用户年龄', example: 30 })
  @IsOptional()
  @IsInt()
  age?: number;
}

export class UserDto {
  @ApiProperty({ description: '用户 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '用户姓名', example: '张三' })
  name: string;

  @ApiProperty({ description: '用户邮箱', example: 'zhangsan@example.com' })
  email: string;

  @ApiProperty({ description: '用户年龄', example: 25 })
  age: number;

  @ApiProperty({ description: '创建时间', example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}
