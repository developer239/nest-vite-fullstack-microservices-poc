import LogoIcon from '../Icons/LogoIcon'
import clsx from 'clsx'
import type { ReactNode } from 'react'

export type Props = {
  logoFill: string
  right?: ReactNode
  center?: ReactNode
}

// TODO: replace "a" with "Link" from "react-router-dom"

export const Header = ({ logoFill, center, right }: Props) => (
  <header className="absolute top-0 left-0 w-full z-10">
    <nav className="p-[4rem] flex justify-between">
      <a aria-label="go to dashboard" href="/">
        <LogoIcon
          className={clsx({
            'w-[2.9rem] h-[2.8rem]': true,
            [`${logoFill}`]: true,
          })}
        />
      </a>
      {center}
      {right}
    </nav>
  </header>
)
