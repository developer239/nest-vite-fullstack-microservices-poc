import { JSX } from 'react'
import ArrowBackIcon from '../Icons/ArrowBackIcon'
import CloseIcon from '../Icons/CloseIcon'
import clsx from 'clsx'

export type IProps = {
  actionType: 'close' | 'back'
} & JSX.IntrinsicElements['a']

export const HeaderActionButton = ({
  actionType,
  children,
  ...aProps
}: IProps) => {
  const getIconComponent = () => {
    switch (actionType) {
      case 'close':
        return CloseIcon
      case 'back':
        return ArrowBackIcon
      default:
        throw new Error('Invalid icon type')
    }
  }
  const Icon = getIconComponent()

  return (
    <a
      className={clsx('flex items-center cursor-pointer', {
        'hidden md:flex': actionType === 'back',
      })}
      {...aProps}
    >
      <Icon className="w-[2.4rem] h-[2.4rem]" />
      <span className="ml-[1.3rem] text-limed-spruce text-base font-primary leading-base hidden md:block">
        {children}
      </span>
    </a>
  )
}
