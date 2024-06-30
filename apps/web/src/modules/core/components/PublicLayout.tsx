import React from 'react'
import { Header, TrooperOutlet } from 'ui-library'

export interface IPublicLayoutProps {
  readonly headerCenter?: React.ReactNode
  readonly headerRight?: React.ReactNode
  readonly children?: React.ReactNode
}

export const PublicLayout = ({
  headerCenter,
  headerRight,
  children,
}: IPublicLayoutProps) => (
  <>
    <Header
      logoFill="fill-black md:fill-white"
      center={headerCenter}
      right={headerRight}
    />
    <main className="h-full">
      <TrooperOutlet />
      <div className="md:pl-[42rem] h-full relative">{children}</div>
    </main>
  </>
)
