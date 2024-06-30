import { useNavigate } from 'react-router-dom'
import { NavLink } from 'ui-library'
import { useSignInMutation } from 'src/graphql-generated'
import { LoginForm, LoginFormValues } from 'src/modules/auth/forms/LoginForm'
import { PublicLayout } from 'src/modules/core/components/PublicLayout'

export const SignInPage = () => {
  const [signIn, { loading: isLoading }] = useSignInMutation()
  const navigate = useNavigate()

  const handleSignIn = async (data: LoginFormValues) => {
    await signIn({ variables: data })
    navigate('/')
  }

  return (
    <PublicLayout
      headerRight={
        <NavLink href="/signup" left="Don’t have an account?" right="Sign up" />
      }
    >
      <div className="min-h-full flex items-center justify-center py-[4rem] px-[3rem]">
        <LoginForm isLoading={isLoading} onSubmit={handleSignIn} />
      </div>
    </PublicLayout>
  )
}
