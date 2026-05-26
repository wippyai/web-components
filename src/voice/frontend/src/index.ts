import { WippyVueElement, define } from '@wippy-fe/webcomponent-vue'
import type { WippyElementConfig, WippyPropsSchema } from '@wippy-fe/webcomponent-vue'
import VoiceOrb from './app/VoiceOrb.vue'
import stylesText from './styles.css?inline'
import pkg from '../package.json'

class VoiceOrbElement extends WippyVueElement<Record<string, never>, Record<string, never>> {
  static get wippyConfig(): WippyElementConfig<Record<string, never>> {
    return {
      propsSchema: pkg.wippy.props as WippyPropsSchema,
      hostCssKeys: ['fontCssUrl', 'themeConfigUrl'] as const,
      inlineCss: stylesText,
    }
  }

  static get vueConfig() {
    return {
      rootComponent: VoiceOrb,
      plugins: [],
    }
  }
}

export async function webComponent() {
  return VoiceOrbElement
}

define(import.meta.url, VoiceOrbElement)
