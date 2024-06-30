import { NavLink } from 'ui-library'
import { LoginForm } from 'src/modules/auth/forms/LoginForm'
import { PublicLayout } from 'src/modules/core/components/PublicLayout'

export const SignInPage = () => (
  <PublicLayout
    headerRight={
      <NavLink href="/signup" left="Don’t have an account?" right="Sign up" />
    }
  >
    <div className="min-h-full flex items-center justify-center py-[4rem] px-[3rem]">
      <LoginForm
        isLoading={false}
        onSubmit={(__: { email: string; password: string }) => {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  </PublicLayout>
)
