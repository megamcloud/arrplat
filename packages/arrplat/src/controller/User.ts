import { Context } from 'koa'
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers"

@JsonController()
export default class User {
    @Get('/users')
    get() {
        return 'this is all users'
    }
}
