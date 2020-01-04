import Arrplat from './Arrplat'
import { ArrplatConfig } from '@arrplat/common'
import ArrplusFactory from './ArrplusFactory'

const DefaultConfig = {
  name: 'Arrplat',
  description: 'The best ',
  plus: {
    ...ArrplusFactory._defaultConfig
  },

} as ArrplatConfig

export default class Builder {
  constructor(config: ArrplatConfig) {
    this.config = {
      ...this.config,
      ...config,
    }
  }

  arrplat!: Arrplat
  config: ArrplatConfig = DefaultConfig

  static async build (config: ArrplatConfig) {
    const builder = new Builder(config)
    builder.arrplat = await Arrplat.init(config)
    const options = builder.arrplat.generateOptions()
    const fs = require('fs-extra')

    fs.writeFile('.arrplat.json', JSON.stringify(options), function(err) {
      err && console.log('Write file error...:', err)
    })

    return builder
  }
}
