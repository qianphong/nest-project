import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class AppGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(context: ExecutionContext) {
    const classMetaData = this.reflector.get('roles', context.getClass());
    console.log(classMetaData);
    return true;
  }
}
