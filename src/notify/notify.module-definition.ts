import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface NotifyModuleOptions {
  count: number;
}
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<NotifyModuleOptions>().build();
