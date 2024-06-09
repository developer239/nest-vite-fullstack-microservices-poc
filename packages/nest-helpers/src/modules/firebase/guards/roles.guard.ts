import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserRole } from '../roles/roles.types'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Convert ExecutionContext to GqlExecutionContext
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req // Get the request object

    if (!request) {
      return false
    }

    const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!roles) {
      return false
    }

    const { user } = request
    if (!user) {
      return false
    }

    return roles.includes(user.role)
  }
}
