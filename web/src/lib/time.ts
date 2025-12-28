const EARLIEST_DATE = new Date(0)

export const getPrettyTime = (givenDate: Date): string => {
  if (givenDate <= EARLIEST_DATE) {
    return 'Never'
  }

  // Calculate the time difference in milliseconds
  const currentTime = new Date()

  const timeDifference = currentTime.getTime() - givenDate.getTime()

  // Calculate the elapsed time in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000)

  if (seconds < 60) {
    if (seconds === 1) {
      return `${seconds} second ago`
    }
    return `${seconds} seconds ago`
  }

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    if (minutes === 1) {
      return `${minutes} minute ago`
    }
    return `${minutes} minutes ago`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    if (hours === 1) {
      return `${hours} hour ago`
    }
    return `${hours} hours ago`
  }

  const days = Math.floor(hours / 24)

  if (days === 1) return `${days} day ago`
  return `${days} days ago`
}

export const getFormattedDate = (date: Date): string => {
  // Extract the year, month, and day
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0')

  // Format the date as yyyy-mm-dd
  return `${year}-${month}-${day}`
}
