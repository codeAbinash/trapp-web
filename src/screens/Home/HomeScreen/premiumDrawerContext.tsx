import { FunctionComponent, ReactNode, createContext, useContext, useState } from 'react'

interface PremiumDrawerContextProps {
  isOpened: boolean
  setIsOpened: (value: boolean) => void
}

// Create a context
const PremiumDrawerContext = createContext<PremiumDrawerContextProps | undefined>(undefined)

// Create a provider component
export const PremiumDrawerProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false)
  return <PremiumDrawerContext.Provider value={{ isOpened, setIsOpened }}>{children}</PremiumDrawerContext.Provider>
}

// Create a custom hook to use the context
export const usePremiumDrawer = (): PremiumDrawerContextProps => {
  const context = useContext(PremiumDrawerContext)
  if (!context) {
    throw new Error('usePremiumDrawer must be used within a PremiumDrawerProvider')
  }
  return context
}
