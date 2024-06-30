import { JSX } from 'react'

export type IProps = JSX.IntrinsicElements['svg']

export default (svgProps: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 5"
    height="100%"
    width="100%"
    {...svgProps}
  >
    <path d="M0 0l5 5 5-5H0z" />
  </svg>
)
