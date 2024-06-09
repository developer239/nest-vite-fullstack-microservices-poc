import { JSX } from 'react'

export type IProps = JSX.IntrinsicElements['svg']

export default (svgProps: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    height="100%"
    width="100%"
    {...svgProps}
  >
    <path d="M4 12.667C4 13.4 4.6 14 5.333 14h5.334C11.4 14 12 13.4 12 12.667v-8H4v8zm8.667-10h-2.333L9.667 2H6.334l-.667.667H3.334V4h9.333V2.667z" />
  </svg>
)
