export const ISOStringToReadable = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const ISOStringToDate = (date: string) => {
  return date.split('T')[0]
}

export const ISOStringToTime = (date: string) => {
  return date.split('T')[1].split('.')[0]
}
