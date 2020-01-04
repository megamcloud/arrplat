#!/usr/bin/env ts-node
// @ts-ignore
import config from '../arrplat.config.json'
import { Builder } from '@arrplat/core'
// @ts-ignore
import { ArrplatConfig } from '@arrplat/common'

const gradient = require('gradient-string');

// TODO
// 1. init build
//    - plugins
//        - pages
//        - store
//        - middleware
// 2. write config files
async function main() {
// Works with aliases
//   gradient.atlas.multiline('Multi line\nstring');

// Works with advanced options
  gradient('cyan', 'pink').multiline('Multi line\nstring', {interpolation: 'hsv'});

  const { log } = console
  const str = '   	The PaaS Framework for Enterprise'
  const title = Buffer.from('DQogICAgICAgICAgICAgICAgICAgICAgXyBfICAgICAgICAgICAgXyAgICAgICAgICAgIF8gICAgICAgIF8gICAgICAgICAgICAgDQogICBfXyBfIF8gX18gX18gXyAgX198IChfKSBfX18gXyBfXyB8IHxfICAgICAgX19ffCB8XyBfIF9fKF8pXyBfXyAgIF9fIF8gDQogIC8gX2AgfCAnX18vIF9gIHwvIF9gIHwgfC8gXyBcICdfIFx8IF9ffF9fX18vIF9ffCBfX3wgJ19ffCB8ICdfIFwgLyBfYCB8DQogfCAoX3wgfCB8IHwgKF98IHwgKF98IHwgfCAgX18vIHwgfCB8IHx8X19fX19cX18gXCB8X3wgfCAgfCB8IHwgfCB8IChffCB8DQogIFxfXywgfF98ICBcX18sX3xcX18sX3xffFxfX198X3wgfF98XF9ffCAgICB8X19fL1xfX3xffCAgfF98X3wgfF98XF9fLCB8DQogIHxfX18vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfF9fXy8gDQo=', 'base64').toString();

  log(gradient.pastel.multiline(title));
  log(gradient['atlas'](str) + '\n');

  const build = await Builder.build(config as unknown as ArrplatConfig)
}

main().then(() => {
  console.log('success')
}).catch(e => {
  console.log('error:', e)
})
