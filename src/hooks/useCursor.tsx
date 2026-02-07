import React, { createContext, useContext, useMemo, useState } from "react";

interface CursorContextValue {
  isHovering: boolean;
  setHovering: (value: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isHovering, setHovering] = useState(false);

  const value = useMemo(
    () => ({ isHovering, setHovering }),
    [isHovering]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);

  if (!context) {
    return {
      isHovering: false,
      setHovering: () => {},
    };
  }

  return context;
};
