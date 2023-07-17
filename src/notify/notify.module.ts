import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { ConfigurableModuleClass } from './notify.module-definition';

// export class NotifyModule {
//   static register(options: Record<string, any>): DynamicModule {
//     return {
//       module: NotifyModule,
//       controllers: [NotifyController],
//       providers: [
//         {
//           provide: 'NOTIFY_OPTIONS',
//           useValue: options,
//         },
//       ],
//     };
//   }
// }

@Module({
  controllers: [NotifyController],
})
export class NotifyModule extends ConfigurableModuleClass {}
