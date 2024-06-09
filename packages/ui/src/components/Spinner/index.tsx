import clsx from 'clsx'

export type ISpinnerProps = {
  isSmaller?: boolean
  isLight?: boolean
}

export const Spinner = ({ isSmaller, isLight }: ISpinnerProps) => (
  <img
    alt="loading animation"
    className={clsx('w-[2.7rem] h-[2.7rem] animate-rotate', {
      'w-[1.9rem] h-[1.9rem]': isSmaller,
    })}
    src={isLight ? '/images/light-spinner.png' : '/images/dark-spinner.png'}
  />
)
