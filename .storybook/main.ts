import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/nextjs-vite',
  features: {
    experimentalRSC: true, //require for server components
  },
  viteFinal: async (config) => {
    // Add alias to mock auth

    console.error(config)
    return config
  },
  staticDirs: ['..\\public'],
}
export default config
