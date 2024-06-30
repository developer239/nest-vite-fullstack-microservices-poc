import { useState } from 'react'
import DropdownIcon from '../Icons/DropdownIcon.tsx'
import { IUserIU } from '../../types.ts'

export type UserDropdownProps = {
  user: IUserIU
  onLogout: () => void
}

// TODO: replace "a" with "Link" from "react-router-dom"

export const UserDropdown = ({
  user,
  onLogout: handleLogout,
}: UserDropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  return (
    <div className="relative">
      <button
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : 'false'}
        onClick={handleToggleMenu}
        className="flex items-center overflow-hidden bg-transparent border-none cursor-pointer"
      >
        <span className="flex items-center justify-center w-[4rem] h-[4rem] text-regent-gray font-medium text-sm leading-sm text-center bg-mischka rounded-full uppercase">
          {user.firstName[0]}
          {user.lastName[0]}
        </span>
        <span className="inline-block ml-[0.8rem] text-regent-gray font-medium text-sm leading-sm font-primary">
          {user.firstName} {user.lastName}
        </span>
        <DropdownIcon className="flex items-center justify-center w-[1rem] h-[0.5rem] ml-[0.6rem] fill-mischka" />
      </button>

      {isMenuOpen && (
        <ul
          aria-labelledby="dropdownMenuButton"
          className="absolute mt-[1.7rem] left-0 w-full p-[1.6rem] rounded-lg shadow-stronger bg-white"
        >
          <li className="mb-[0.8rem] z-3 block text-gray-chateau font-medium text-sm font-primary leading-1xl hover:opacity-90">
            <a href="/profile" className="w-full inline-block">
              Profile
            </a>
          </li>
          <li className="z-3 block text-gray-chateau font-medium text-sm font-primary leading-1xl hover:opacity-90">
            <button
              onClick={handleLogout}
              className="w-full inline-block text-left"
            >
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
