import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input, Button, NavLink } from 'ui-library'
import { z } from 'zod'

const schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignUpFormValues = z.infer<typeof schema>

export interface ISignUpFormProps {
  readonly onSubmit: (data: SignUpFormValues) => void
  readonly isLoading: boolean
}

export const SignUpForm = ({ onSubmit, isLoading }: ISignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
  })

  return (
    <form className="w-full max-w-[48rem]" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-limed-spruce text-2xl font-primary leading-5xl text-center md:text-left">
        Get started absolutely free.
      </h2>
      <h3 className="mt-[0.6rem] text-lg font-primary leading-1xl text-center md:text-left text-regent-gray">
        Enter your details below.
      </h3>
      <Input
        {...register('firstName')}
        placeholder="First name"
        errorMessage={errors.firstName?.message}
        className="mb-[4rem] mt-[6.4rem]"
        disabled={isLoading}
      />
      <Input
        {...register('lastName')}
        placeholder="Last name"
        errorMessage={errors.lastName?.message}
        className="mb-[4rem]"
        disabled={isLoading}
      />
      <Input
        {...register('email')}
        type="email"
        placeholder="Email"
        errorMessage={errors.email?.message}
        className="mb-[4rem]"
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
      <Input
        {...register('confirmPassword')}
        type="password"
        placeholder="Repeat Password"
        errorMessage={errors.confirmPassword?.message}
        className="mb-[4rem]"
        disabled={isLoading}
      />
      <NavLink
        href="/signin"
        left="Already have an account?"
        right="Sign in"
        className="text-center mt-[-1.6rem] mb-[-2.4rem]"
      />
      <Button
        type="submit"
        className="mt-[6.4rem] mx-auto md:mx-0"
        isBrand
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign up
      </Button>
    </form>
  )
}
