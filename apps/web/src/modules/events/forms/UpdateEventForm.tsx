/* eslint-disable react/forbid-dom-props */
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { Card, Input, SaveEventButton } from 'ui-library'
import { z } from 'zod'

export interface IEventDTO {
  id: string
  title: string
  description: string
  startsAt: string
  capacity: number
}

export interface IUpdateEventFormProps {
  readonly data: IEventDTO
  readonly className?: string
  readonly onUpdateEvent: (data: UpsertEventDto) => Promise<void>
  readonly isLoading: boolean
}

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  startsAtDay: z.string(),
  startsAtTime: z.string(),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
})

export type UpsertEventDto = z.infer<typeof schema>

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
  } = useForm<UpsertEventDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data.title,
      description: data.description,
      startsAtDay: dayjs(data.startsAt).format('YYYY-MM-DD'),
      startsAtTime: dayjs(data.startsAt).format('HH:mm'),
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
