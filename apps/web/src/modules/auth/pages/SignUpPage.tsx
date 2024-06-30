import { useNavigate } from 'react-router-dom'
import { NavLink } from 'ui-library'
import { useSignUpMutation } from 'src/graphql-generated'
import { SignUpForm, SignUpFormValues } from 'src/modules/auth/forms/SignUpForm'
import { PublicLayout } from 'src/modules/core/components/PublicLayout'

export const SignUpPage = () => {
  const [signUp, { loading: isLoading }] = useSignUpMutation()
  const navigate = useNavigate()

  const handleSignUp = async (data: SignUpFormValues) => {
    await signUp({ variables: data })
    navigate('/')
  }

  return (
    <PublicLayout
      headerRight={
        <NavLink
          href="/signin"
          left="Already have an account?"
          right="Sign in"
        />
      }
    >
      <div className="min-h-full flex items-center justify-center py-[4rem] px-[3rem]">
        <SignUpForm isLoading={isLoading} onSubmit={handleSignUp} />
      </div>
    </PublicLayout>
  )
}
