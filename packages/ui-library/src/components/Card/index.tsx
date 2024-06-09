import { JSX } from 'react'
import clsx from 'clsx'

export type IProps = {
  uri?: string
} & JSX.IntrinsicElements['div']

export const Card = ({ children, className, uri, ...divProps }: IProps) => (
  <div
    className={clsx('w-full bg-white rounded-xs shadow-light', className)}
    {...divProps}
  >
    {children}
  </div>
)
