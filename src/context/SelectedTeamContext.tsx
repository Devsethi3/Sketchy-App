"use client"
import React, { createContext, useContext, ReactNode } from "react";

interface SelectedTeamContextType {
  selectedTeam: { id: string; name: string } | null;
  setSelectedTeam: (team: { id: string; name: string } | null) => void;
}
const SelectedTeamContext = createContext<SelectedTeamContextType>({
  selectedTeam: null,
  setSelectedTeam: () => { },
});

export const useSelectedTeam = (): SelectedTeamContextType => {
  return useContext(SelectedTeamContext);
};

interface SelectedTeamContextProviderProps {
  children: ReactNode;
}

export const SelectedTeamContextProvider = ({
  children,
}: SelectedTeamContextProviderProps) => {
  const [selectedTeam, setSelectedTeam] = React.useState<{ id: string; name: string } | null>(null);

  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
