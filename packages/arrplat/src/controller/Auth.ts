import { Context } from 'koa'
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers"
import { response } from "@arrplat/utils"
import { User } from "../entity/User"
import { getManager } from "typeorm"

@JsonController('/auth')
export default class Auth {
  userRepository = getManager().getRepository(User);

  @Post('/login')
  async login(@Body() body: any) {
    let result = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: body.username })
      .orWhere('user.phone = :phone', { phone: body.username })
      .andWhere('user.password = :password', { password: body.password })
      .getOne()

    if (!result)
      return response(result, 404, '用户名或密码错误')

    if (result.state !== 1)
      return response(result, 304, '用户不可用，请联系管理员')

    return response(result, 200)
  }
}
