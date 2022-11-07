import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'User name cannot be empty' })
  @ApiProperty({ description: '用户名称', default: '' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'User password cannot be empty' })
  @ApiProperty({ description: '用户密码', default: '' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'User email cannot be empty' })
  @ApiProperty({ description: '用户邮箱', default: '' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'User phone cannot be empty' })
  @ApiProperty({ description: '用户手机号', default: '' })
  phone: string;

  @IsString()
  @ApiProperty({ description: '用户头像', default: '' })
  avatar: string;
}
