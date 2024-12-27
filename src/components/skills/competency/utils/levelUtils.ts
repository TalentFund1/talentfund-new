export const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return priorities[level.toLowerCase()] || 1;
};

export const normalizeLevel = (levelKey: string, roleId: string, track: string): string => {
  const key = levelKey.toLowerCase();
  
  // If the level already matches the track format, return it
  if (track === "Managerial" && key.startsWith('m')) {
    return key;
  }
  if (track === "Professional" && key.startsWith('p')) {
    return key;
  }

  // Convert between tracks if needed
  const levelMap: { [key: string]: { [key: string]: string } } = {
    "Managerial": {
      "p1": "m3",
      "p2": "m3",
      "p3": "m4",
      "p4": "m4",
      "p5": "m5",
      "p6": "m6"
    },
    "Professional": {
      "m3": "p4",
      "m4": "p5",
      "m5": "p5",
      "m6": "p6"
    }
  };

  console.log('Normalizing level:', {
    originalLevel: levelKey,
    track,
    roleId,
    mappedLevel: levelMap[track]?.[key] || key
  });

  return levelMap[track]?.[key] || key;
};