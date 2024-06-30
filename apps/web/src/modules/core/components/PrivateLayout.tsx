import React from 'react'
import { Header } from 'ui-library'

export interface IPrivateLayoutProps {
  readonly headerCenter?: React.ReactNode
  readonly headerRight?: React.ReactNode
  readonly children?: React.ReactNode
}

export const PrivateLayout = ({
  headerCenter,
  headerRight,
  children,
}: IPrivateLayoutProps) => (
  <>
    <Header logoFill="fill-black" center={headerCenter} right={headerRight} />
    <main className="px-[0.8rem] pt-[12rem] pb-[10rem] md:px-[12rem] md:pt-[17rem] md:pb-[28rem] bg-athens-gray h-fit-content min-h-full">
      {children}
    </main>
  </>
)
