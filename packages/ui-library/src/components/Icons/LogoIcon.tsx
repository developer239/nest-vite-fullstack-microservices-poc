import { JSX } from 'react'

export type IProps = JSX.IntrinsicElements['svg']

export default (svgProps: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 28"
    height="100%"
    width="100%"
    {...svgProps}
  >
    <path d="M.078 27V.058H16.95v4.94H5.322v6.156h10.526v4.674H5.322v6.232H16.95V27zm21.47-3.192c0-.963.336-1.78 1.007-2.451s1.488-1.007 2.451-1.007c.481 0 .937.089 1.368.266s.804.424 1.121.741a3.424 3.424 0 011.007 2.451A3.418 3.418 0 0126.374 27c-.43.177-.887.266-1.368.266-.963 0-1.78-.336-2.451-1.007s-1.007-1.488-1.007-2.451z" />
  </svg>
)
