import posthog, { isPosthogConfigured } from './posthog.js'

const contactFormLogger = {
  submitted() {
    if (isPosthogConfigured) {
      posthog.logger.info('contact form request submitted', {
        feature: 'contact_form',
      })
    }
  },

  failed() {
    if (isPosthogConfigured) {
      posthog.logger.warn('contact form request failed', {
        feature: 'contact_form',
      })
    }
  },
}

export default contactFormLogger
