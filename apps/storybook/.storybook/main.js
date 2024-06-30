import { join, dirname } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  // Note: we want to reference the UI library's folder like this because stories are not transpiled and part of the bundle
  stories: [
    '../../web/src/**/*.stories.tsx',
    '../../../packages/ui-library/src/**/*.stories.tsx',
  ],
  staticDirs: [
    // Note: we can't reference node_modules because Turbo optimizes node_modules - and packages work the same way
    { from: '../../../packages/ui-library/dist/images', to: '/images' },
    { from: '../../../packages/ui-library/dist/fonts', to: '/fonts' },
  ],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
}
export default config
