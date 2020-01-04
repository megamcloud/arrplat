import { Get, JsonController } from "routing-controllers"
import mockApps from '../mock/apps'
import { response } from '@arrplat/utils'

@JsonController('/apps')
export default class App {
  @Get('/')
  getAllApps() {
    return response(mockApps)
  }
}
