// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const formatLocation = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getUserTypeDisplayName = (userType: string): string => {
  const displayNames: { [key: string]: string } = {
    "farm-manager": "Farm Manager",
    "kisani-didi": "Kisani Didi",
    operator: "Farm Operator",
  };
  return displayNames[userType] || userType;
};

export const generateAssignedToLabel = (userType: string, count: number): string => {
  const displayName = getUserTypeDisplayName(userType);
  return `${displayName} (${count})`;
};
