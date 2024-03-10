"use client"
import React, { createContext, useContext, ReactNode } from "react";

interface SelectedTeam {
  id: string;
  name: string;
}

interface SelectedTeamContextType {
  selectedTeam: SelectedTeam | null;
  setSelectedTeam: (team: SelectedTeam | null) => void;
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
  const [selectedTeam, setSelectedTeam] = React.useState<SelectedTeam | null>(
    null
  );

  return (
    <SelectedTeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
