import { IsInt, Length } from 'class-validator';

export class Sms {
  @Length(11, 11, {
    message: '手机号长度不正确',
  })
  phone: string;
  @IsInt()
  code: number;
}
