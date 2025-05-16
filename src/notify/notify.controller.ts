import { Controller, Get, Inject, Session } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './notify.module-definition';

@Controller('notify')
export class NotifyController {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE,
  ) {}

  @Get()
  getNotify(@Session() session: { age: number }) {
    return {
      ...this.options,
      age: session.age++,
    };
  }
}
