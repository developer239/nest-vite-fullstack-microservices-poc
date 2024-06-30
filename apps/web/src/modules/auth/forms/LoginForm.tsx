import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input, Button, NavLink } from 'ui-library'
import { z } from 'zod'

const schema = z.object({
  email: z.string().min(1).email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export type LoginFormValues = z.infer<typeof schema>

export interface ILoginFormProps {
  readonly onSubmit: (data: LoginFormValues) => void
  readonly isLoading: boolean
}

export const LoginForm = ({ onSubmit, isLoading }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  })

  return (
    <form className="w-full max-w-[48rem]" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-limed-spruce text-2xl font-primary leading-5xl text-center md:text-left">
        Sign in to Eventio.
      </h2>
      <h3 className="mt-[0.6rem] text-lg font-primary leading-1xl text-center md:text-left text-regent-gray">
        Enter your details below.
      </h3>
      <Input
        {...register('email')}
        type="email"
        placeholder="Email"
        errorMessage={errors.email?.message}
        className="mb-[4rem] mt-[6.4rem]"
        disabled={isLoading}
      />
      <Input
        {...register('password')}
        type="password"
        placeholder="Password"
        errorMessage={errors.password?.message}
        className="mb-[4rem]"
        disabled={isLoading}
      />
      <NavLink
        href="/signup"
        left="Don’t have an account?"
        right="Sign up"
        className="text-center mt-[-1.6rem] mb-[-2.4rem]"
      />
      <Button
        type="submit"
        className="mt-[6.4rem] mx-auto md:mx-0"
        isBrand
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign in
      </Button>
    </form>
  )
}
