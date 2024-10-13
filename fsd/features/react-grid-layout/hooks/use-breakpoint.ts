import { useState } from "react";

export const useBreakpoint = (initialBreakpoint: string) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>(initialBreakpoint);

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  return { currentBreakpoint, onBreakpointChange };
};