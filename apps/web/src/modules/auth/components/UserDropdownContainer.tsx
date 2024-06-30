import { useNavigate } from 'react-router-dom'
import { UserDropdown } from 'ui-library'
import { useMeQuery } from 'src/graphql-generated'
import { removeAccessToken } from 'src/modules/auth/services/localStorage'

export const UserDropdownContainer = () => {
  const { data } = useMeQuery()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeAccessToken()
    navigate('/signin')
  }

  if (!data) {
    return null
  }

  return (
    <UserDropdown
      user={{
        id: data.me.id,
        email: data.me.email,
        firstName: data.me.firstName,
        lastName: data.me.lastName,
      }}
      onLogout={handleLogout}
    />
  )
}
