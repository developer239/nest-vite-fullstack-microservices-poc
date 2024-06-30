import { NavLink } from 'ui-library'
import { PublicLayout } from 'src/modules/core/components/PublicLayout'

export const SignInPage = () => (
  <PublicLayout
    headerRight={
      <NavLink href="/signup" left="Don’t have an account?" right="Sign up" />
    }
  >
    <div className="min-h-full flex items-center justify-center py-[4rem] px-[3rem]">
      {/*<SignInForm />*/}
    </div>
  </PublicLayout>
)
