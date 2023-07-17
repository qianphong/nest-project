import { Controller, Get, Inject, Session } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './notify.module-definition';

@Controller('notify')
export class NotifyController {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: Record<string, any>,
  ) {}

  @Get()
  getNotify(@Session() session: { age: number }) {
    return {
      ...this.options,
      age: session.age++,
    };
  }
}
