import { NavLink } from 'ui-library'
import { PublicLayout } from 'src/modules/core/components/PublicLayout'

export const SignUpPage = () => (
  <PublicLayout
    headerRight={
      <NavLink href="/signin" left="Already have an account?" right="Sign in" />
    }
  >
    <div className="min-h-full flex items-center justify-center py-[4rem] px-[3rem]">
      {/*<SignUpForm />*/}
    </div>
  </PublicLayout>
)
