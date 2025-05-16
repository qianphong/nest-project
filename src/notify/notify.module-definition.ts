import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface NotifyModuleOptions {
  count: number;
}
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<NotifyModuleOptions>()
    .setClassMethodName('register')
    .setExtras({ isGlobal: true }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();
