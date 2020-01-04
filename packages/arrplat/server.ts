import 'reflect-metadata' // this shim is required
import * as Koa from 'koa'
import * as Router from 'koa-router'
import { createConnection } from 'typeorm'
import config from './arrplat.config'
import { createKoaServer } from 'routing-controllers'

const path = require('path')
const jwt = require('koa-jwt')

export default class Server {
  private constructor () {
    this.initApplication()
    this.config = { ...config }
  }

  config: any
  connect: any
  app: Koa
  instance: Server
  route: Router

  static async start () {
      const server = new Server()
      await server.initDatabase()
      server.app.listen(server.config.port);
      console.log(`🚀 Arrplat is up and running on port ${server.config.port}`);
  }

  initApplication () {
    const jwtInstance = jwt({
      secret: 'shared-secret',
      key: 'jwtdata'
    }) as Function

    // @ts-ignore
    this.app = createKoaServer({
      middlewares: [ jwtInstance ],
      cors: {
        credentials: true
      },
      controllers: [path.join(__dirname, 'src/controller/*.ts')]
    })
  }

  async initDatabase () {
    this.connect = await createConnection(this.config.db)
  }
}
