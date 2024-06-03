import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  private readonly users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'John', email: 'john@example.com' },
  ]

  findAll() {
    return this.users
  }

  findById(id: number) {
    return this.users.find((user) => user.id === Number(id))
  }
}
