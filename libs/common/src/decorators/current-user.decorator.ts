import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// TODO: should not import from apps
import { UserDocument } from '../../../../apps/auth/src/users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
