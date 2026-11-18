import { WippyVueElement, define } from '@wippy-fe/webcomponent-vue'
import type { WippyElementConfig, WippyPropsSchema } from '@wippy-fe/webcomponent-vue'
import { PrimeVuePlugin } from '@wippy-fe/theme/primevue-plugin'
import type { VoiceOrbProps } from './voice-orb-props'
import VoiceOrb from './app/VoiceOrb.vue'
import stylesText from './styles.css?inline'
import pkg from '../package.json'

class VoiceOrbElement extends WippyVueElement<VoiceOrbProps, Record<string, never>> {
  static get wippyConfig(): WippyElementConfig<VoiceOrbProps> {
    return {
      propsSchema: pkg.wippy.props as WippyPropsSchema,
      hostCssKeys: ['themeConfigUrl', 'primeVueCssUrl'],
      inlineCss: stylesText,
    }
  }

  static get vueConfig() {
    return {
      rootComponent: VoiceOrb,
      plugins: [PrimeVuePlugin],
    }
  }
}

export async function webComponent() {
  return VoiceOrbElement
}

define(import.meta.url, VoiceOrbElement)
