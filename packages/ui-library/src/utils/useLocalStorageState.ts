import { useState } from 'react'

export function useStateWithLocalStorage<TData>(
  key: string,
  initialState: TData | (() => TData)
): [TData, (newValue: TData | ((prevValue: TData) => TData)) => void] {
  const [state, setState] = useState<TData>(() => {
    const savedState = localStorage.getItem(key)
    if (savedState !== null) {
      return JSON.parse(savedState)
    }
    return typeof initialState === 'function'
      ? (initialState as () => TData)()
      : initialState
  })

  const setStateWithLocalStorage = (
    newValue: TData | ((prevValue: TData) => TData)
  ) => {
    const newState =
      typeof newValue === 'function'
        ? (newValue as (prevValue: TData) => TData)(state)
        : newValue
    setState(newState)
    localStorage.setItem(key, JSON.stringify(newState))
  }

  return [state, setStateWithLocalStorage]
}
