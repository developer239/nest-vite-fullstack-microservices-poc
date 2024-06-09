import { JSX } from 'react'
import clsx from 'clsx'
import { Spinner } from '../Spinner'

export type IProps = {
  isLoading?: boolean
  isBrand?: boolean
} & JSX.IntrinsicElements['button']

export const FAB = ({
  isBrand,
  isLoading,
  children,
  ...buttonProps
}: IProps) => (
  <button
    className={clsx(
      'fixed right-[1.6rem] bottom-[1.6rem] flex items-center justify-center w-[5.6rem] h-[5.6rem] bg-limed-spruce rounded-xl shadow-medium transition-all duration-250 ease-in-out hover:scale-105',
      {
        // Tailwind override issues
        'hover:bg-nandor': !isBrand,
        'bg-mountain-meadow hover:bg-mountain-meadow-dark': isBrand,
        'p-[2.1rem]': !isLoading,
        'cursor-pointer': !isLoading && !buttonProps.disabled,
        'cursor-not-allowed': isLoading || buttonProps.disabled,
      }
    )}
    {...buttonProps}
  >
    {isLoading ? <Spinner isLight isSmaller /> : children}
  </button>
)
