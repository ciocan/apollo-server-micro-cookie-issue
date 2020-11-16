import { extendTheme } from '@chakra-ui/core'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = ['40em', '52em', '64em']

const theme = {
  styles: {
    global: {
      html: {
        width: '100%',
        height: '100%',
      },
      body: {
        width: '100%',
        height: '100%',
      },
    },
  },
  fonts,
  breakpoints,
}

const appTheme = extendTheme(theme)

export default appTheme
