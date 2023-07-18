import { SetMetadata } from '@nestjs/common';

export const MessageKey = Symbol('messageKey');

export const Message = (msg: string) => {
  return SetMetadata(MessageKey, msg);
};
