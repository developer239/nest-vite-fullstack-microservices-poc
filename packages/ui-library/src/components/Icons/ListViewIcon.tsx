export type IProps = JSX.IntrinsicElements['svg']

export default (svgProps: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height="100%"
    width="100%"
    {...svgProps}
  >
    <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z" />
  </svg>
)
