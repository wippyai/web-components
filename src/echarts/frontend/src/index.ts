import { WippyVueElement, define } from '@wippy-fe/webcomponent-vue'
import type { WippyElementConfig, WippyPropsSchema } from '@wippy-fe/webcomponent-vue'
import type { ComponentProps } from './types.ts'
import type { Events } from './constants.ts'
import EChartsCanvas from './app/echarts-canvas.vue'
import stylesText from './styles.css?inline'
import pkg from '../package.json'

class EChartsElement extends WippyVueElement<ComponentProps, Events> {
  static get wippyConfig(): WippyElementConfig<ComponentProps> {
    return {
      propsSchema: pkg.wippy.props as WippyPropsSchema,
      hostCssKeys: ['themeConfigUrl'] as const,
      inlineCss: stylesText,
    }
  }

  static get vueConfig() {
    return { rootComponent: EChartsCanvas }
  }
}

export async function webComponent() {
  return EChartsElement
}

define(import.meta.url, EChartsElement)
