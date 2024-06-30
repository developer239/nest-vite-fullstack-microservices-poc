import { JSX } from 'react'

export type IProps = JSX.IntrinsicElements['svg']

export default (svgProps: IProps) => (
  <svg
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    width="100%"
    {...svgProps}
  >
    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
  </svg>
)
