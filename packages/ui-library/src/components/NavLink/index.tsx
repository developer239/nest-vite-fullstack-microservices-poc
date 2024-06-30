import type { JSX } from 'react'
import clsx from 'clsx'

export type IProps = {
  slot?: string
  left: string
  right: string
} & JSX.IntrinsicElements['a']

// TODO: replace "a" with "Link" from "react-router-dom"

export const NavLink = ({ left, right, slot, href, className }: IProps) => (
  <a
    href={href}
    slot={slot}
    className={clsx(
      'text-iron text-sm font-primary leading-1xl',
      {
        'block md:hidden': !slot,
        'hidden md:block': Boolean(slot),
      },
      className
    )}
  >
    {left}{' '}
    <span className="uppercase font-medium text-regent-gray">{right}</span>
  </a>
)
