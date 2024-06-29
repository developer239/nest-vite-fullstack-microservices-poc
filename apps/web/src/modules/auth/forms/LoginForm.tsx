import { useState } from 'react'
import { useLoginUserMutation } from '../../../graphql-generated'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, { loading: isLoading, error }] = useLoginUserMutation()

  const handleLogin = async () => {
    try {
      const result = await loginUser({ variables: { email, password } })
      // eslint-disable-next-line
      console.log(result.data?.loginUser.message)
    } catch (loginError) {
      // eslint-disable-next-line
      console.log('loginError', loginError)
    }
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="button" onClick={handleLogin} disabled={isLoading}>
        Login
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
