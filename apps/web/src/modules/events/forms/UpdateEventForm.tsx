/* eslint-disable react/forbid-dom-props */
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Card, Input, SaveEventButton } from 'ui-library'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  startsAtDay: z.string(),
  startsAtTime: z.string(),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
})

export type UpdateEventFormData = z.infer<typeof schema>

export interface IUpdateEventFormProps {
  readonly data: UpdateEventFormData
  readonly className?: string
  readonly onUpdateEvent: (data: UpdateEventFormData) => Promise<void>
  readonly isLoading: boolean
}

export const UpdateEventForm = ({
  className,
  data,
  onUpdateEvent,
  isLoading,
}: IUpdateEventFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEventFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data.title,
      description: data.description,
      startsAtDay: data.startsAtDay,
      startsAtTime: data.startsAtTime,
      capacity: data.capacity,
    },
  })

  return (
    <Card
      className={`max-w-[48rem] h-fit px-[3.2rem] py-[4rem] text-center ${className}`}
    >
      <form id="update-event-form" onSubmit={handleSubmit(onUpdateEvent)}>
        <Input
          {...register('title')}
          className="mb-[4rem] mt-[4rem]"
          type="text"
          placeholder="Title"
          errorMessage={errors.title?.message}
        />
        <Input
          {...register('description')}
          className="mb-[4rem]"
          type="text"
          placeholder="Description"
          errorMessage={errors.description?.message}
        />
        <Input
          {...register('startsAtDay')}
          className="mb-[4rem]"
          type="date"
          placeholder="Date"
          errorMessage={errors.startsAtDay?.message}
        />
        <Input
          {...register('startsAtTime')}
          className="mb-[4rem]"
          type="time"
          placeholder="Time"
          errorMessage={errors.startsAtTime?.message}
        />
        <Input
          {...register('capacity')}
          type="number"
          placeholder="Capacity"
          errorMessage={errors.capacity?.message}
          step={1}
          min={1}
        />
        <SaveEventButton
          form="update-event-form"
          isLoading={isLoading}
          disabled={isLoading}
        />
      </form>
    </Card>
  )
}
