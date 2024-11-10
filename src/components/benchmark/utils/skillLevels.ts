export const getLevelDot = (level: string) => {
  switch (level) {
    case "advanced":
      return "bg-primary-accent";
    case "intermediate":
      return "bg-primary-icon";
    case "beginner":
      return "bg-[#008000]";
    default:
      return "bg-gray-300";
  }
};