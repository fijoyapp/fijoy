import { routeHouseholdIdQuery$data } from '@/routes/_user/household/$householdId/__generated__/routeHouseholdIdQuery.graphql'
import { createContext, useContext } from 'react'

type Household = routeHouseholdIdQuery$data['households'][number]

type HouseholdContextType = {
  household: Household
}

const HouseholdContext = createContext<HouseholdContextType | null>(null)

export const HouseholdProvider = ({
  children,
  household,
}: {
  children: React.ReactNode
  household: Household
}) => {
  return (
    <HouseholdContext.Provider value={{ household }}>
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
