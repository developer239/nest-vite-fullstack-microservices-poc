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
  stories: ['../../../packages/ui-library/src/**/*.stories.tsx'],
  staticDirs: [
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