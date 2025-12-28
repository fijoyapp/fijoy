import { createContext, useContext } from 'react'

type HouseholdContextType = {
  householdId: string
}

const HouseholdContext = createContext<HouseholdContextType | null>(null)

export const HouseholdProvider = ({
  children,
  householdId,
}: {
  children: React.ReactNode
  householdId: string
}) => {
  return (
    <HouseholdContext.Provider value={{ householdId }}>
      {children}
    </HouseholdContext.Provider>
  )
}

export const useHousehold = () => {
  const context = useContext(HouseholdContext)
  if (context === null) {
    throw new Error('useHousehold must be used within a HouseholdProvider')
  }
  return context
}
