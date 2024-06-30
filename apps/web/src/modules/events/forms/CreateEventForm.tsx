import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { Input, Button, Card } from 'ui-library'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  startsAtDay: z.string().min(1, 'Date is required'),
  startsAtTime: z.string().min(1, 'Time is required'),
  capacity: z.coerce.number().int().min(1, 'Capacity must be at least 1'),
})

export type CreateEventFormData = z.infer<typeof schema>

export interface ICreateEventFormProps {
  readonly className?: string
  readonly onSubmit: (data: CreateEventFormData) => void
  readonly isLoading: boolean
}

export const CreateEventForm = ({
  className,
  onSubmit,
  isLoading,
}: ICreateEventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(schema),
  })

  return (
    <Card
      className={clsx(
        'max-w-[48rem] px-[3.2rem] py-[4rem] text-center',
        className
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-limed-spruce text-2xl font-primary leading-5xl">
          Create New Event
        </h2>
        <h3 className="text-regent-gray text-lg font-primary leading-1xl">
          Enter Details Below
        </h3>
        <Input
          {...register('title')}
          type="text"
          placeholder="Title"
          errorMessage={errors.title?.message}
          className="mb-[4rem] mt-[4rem]"
        />
        <Input
          {...register('description')}
          type="text"
          placeholder="Description"
          errorMessage={errors.description?.message}
          className="mb-[4rem]"
        />
        <Input
          {...register('startsAtDay')}
          type="date"
          placeholder="Date"
          errorMessage={errors.startsAtDay?.message}
          className="mb-[4rem]"
        />
        <Input
          {...register('startsAtTime')}
          type="time"
          placeholder="Time"
          errorMessage={errors.startsAtTime?.message}
          className="mb-[4rem]"
        />
        <Input
          {...register('capacity')}
          type="number"
          placeholder="Capacity"
          errorMessage={errors.capacity?.message}
          className="mb-[4rem]"
          step={1}
          min={1}
        />
        <Button
          type="submit"
          className="mt-[4rem] mx-auto"
          isBrand
          isLoading={isLoading}
          disabled={isLoading}
        >
          Create New Event
        </Button>
      </form>
    </Card>
  )
}
