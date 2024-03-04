"use client"
import React, { createContext, useContext, ReactNode } from "react";

interface SelectedTeamContextType {
  selectedTeam: string | null;
  setSelectedTeam: (team: string | null) => void;
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
  const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);

  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
