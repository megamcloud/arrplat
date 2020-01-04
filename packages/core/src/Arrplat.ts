import ArrplusFactory from './ArrplusFactory'
import { ArrplusConfig } from '@arrplat/common'
import { Route } from '@arrplat/common'
import { ArrplatConfig, ArrplatOptions } from '@arrplat/common'

export default class Arrplat {
  constructor(config: ArrplatConfig | null) {
    this.config = {
      ...Arrplat._defaultConfig,
      ...config,
    }
  }

  pluginRouters: Route[] = []
  config: ArrplatConfig
  pluginConfig!: ArrplusConfig[]
  arrplus!: ArrplusFactory

  public static async init (config: ArrplatConfig) {
    const arrplat = new Arrplat(config)
    arrplat.arrplus = await ArrplusFactory.load(arrplat.config.plus)
    return arrplat
  }

  generateOptions () {
    return {
      ...this.config,
      plus: this.arrplus.options
    } as ArrplatOptions
  }

  public static _defaultConfig: ArrplatConfig = {
    name: 'Arrplat',
    description: 'This is the Arrplat',
    plus: ArrplusFactory._defaultConfig
  }
}
