import { useState } from 'react'
import { useLoginUserMutation } from '../../../graphql-generated'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, { loading: isLoading, error }] = useLoginUserMutation()

  const handleLogin = async () => {
    try {
      const result = await loginUser({ variables: { email, password } })
      console.log(result.data?.loginUser.message)
    } catch (err) {
      console.log('Login failed:', err)
    }
  }

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
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
    </div>
  )
}
