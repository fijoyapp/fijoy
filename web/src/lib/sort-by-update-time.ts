export function newestActivityFirst<
  T extends { latestTransaction?: { datetime: string } | null },
>(items: ReadonlyArray<T>): T[] {
  return [...items].sort((a, b) => {
    const aDatetime = a.latestTransaction?.datetime
    const bDatetime = b.latestTransaction?.datetime
    if (!aDatetime) return bDatetime ? 1 : 0
    if (!bDatetime) return -1
    return bDatetime.localeCompare(aDatetime)
  })
}
