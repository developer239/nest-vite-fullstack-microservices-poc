import { NavLink } from 'ui-library'
import { SignUpForm } from 'src/modules/auth/forms/SignUpForm'
import { PublicLayout } from 'src/modules/core/components/PublicLayout'

export const SignUpPage = () => (
  <PublicLayout
    headerRight={
      <NavLink href="/signin" left="Already have an account?" right="Sign in" />
    }
  >
    <div className="min-h-full flex items-center justify-center py-[4rem] px-[3rem]">
      <SignUpForm
        isLoading={false}
        onSubmit={(__) => {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  </PublicLayout>
)
