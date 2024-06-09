import clsx from 'clsx'
// Base64
// import lightSpinner from '../../../public/images/light-spinner.png'
// import darkSpinner from '../../../public/images/dark-spinner.png'

export type IProps = {
  isSmaller?: boolean
  isLight?: boolean
}

export const Spinner = ({ isSmaller, isLight }: IProps) => (
  <img
    alt="loading animation"
    className={clsx('w-[2.7rem] h-[2.7rem] animate-rotate', {
      'w-[1.9rem] h-[1.9rem]': isSmaller,
    })}
    src={isLight ? 'images/light-spinner.png' : 'images/dark-spinner.png'}
  />
)
