"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

// Define types
interface Team {
  id: string;
  name: string;
  userEmail: string;
  userImage: string;
  userName: string;
}

interface SelectedTeamContextType {
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
}

// Create context
export const SelectedTeamContext = createContext<SelectedTeamContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useSelectedTeam = () => {
  return useContext(SelectedTeamContext)
}

// Provider component
export const SelectedTeamProvider = ({ children }: { children: ReactNode }) => {

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
