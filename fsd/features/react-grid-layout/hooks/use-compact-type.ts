import { useState } from "react";

export const useCompactType = (initialCompactType: "horizontal" | "vertical" | null) => {
  const [compactType, setCompactType] = useState<"horizontal" | "vertical" | null>(initialCompactType);

  const onCompactTypeChange = () => {
    setCompactType(prevCompactType =>
      prevCompactType === "horizontal"
        ? "vertical"
        : prevCompactType === "vertical"
          ? null
          : "horizontal"
    );
  };

  return { compactType, onCompactTypeChange };
};