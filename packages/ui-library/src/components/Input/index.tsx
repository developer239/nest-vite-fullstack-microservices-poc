import { JSX } from 'react'
import clsx from 'clsx'
import { useState } from 'react'
import ShowIcon from '../Icons/ShowIcon'

export type IProps = {
  id?: string
  isSecured?: boolean
  hasError?: boolean
} & JSX.IntrinsicElements['input']

export const Input = ({
  id,
  type,
  hasError,
  className,
  onChange,
  ...inputProps
}: IProps) => {
  const [isSecured, setIsSecured] = useState(true)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          type={type === 'password' ? (isSecured ? 'password' : 'text') : type}
          className={clsx(
            'relative block w-full pt-[0.4rem] pb-[0.8rem] pr-[0.4rem] text-limed-spruce text-lg leading-1xl font-primary border-b-[0.1rem] border-b-iron',
            'placeholder-iron placeholder-base font-primary text-base leading-1xl',
            {
              'tracking-widest': isSecured && type === 'password' && hasValue,
              'border-b-wild-strawberry': hasError,
            }
          )}
          onChange={(event) => {
            if (type === 'password') {
              const { value } = event.target as HTMLInputElement
              setHasValue(Boolean(value))
            }

            if (onChange) {
              onChange(event)
            }
          }}
          {...inputProps}
        />
        {type === 'password' && (
          <button
            onClick={() => setIsSecured((prev) => !prev)}
            className="absolute top-[50%] translate-y-[-50%] right-0"
            type="button"
          >
            <ShowIcon
              className={clsx('w-[3.5rem] h-[2.4rem] ', {
                'fill-limed-spruce': !isSecured,
                'fill-iron': isSecured,
              })}
            />
          </button>
        )}
      </div>
    </div>
  )
}
