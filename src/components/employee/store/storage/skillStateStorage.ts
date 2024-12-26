export const createSkillStateStorage = () => ({
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) {
      console.log('No stored state found:', { name });
      return null;
    }
    try {
      const parsed = JSON.parse(str);
      const skillStatesCount = Object.keys(parsed?.state?.skillStates || {}).length;
      console.log('Successfully loaded stored state:', { 
        name,
        skillStatesCount,
        timestamp: new Date().toISOString()
      });
      return parsed;
    } catch (error) {
      console.error('Error parsing stored state:', error);
      return null;
    }
  },

  setItem: (name: string, value: any) => {
    try {
      const serialized = JSON.stringify(value);
      const skillStatesCount = Object.keys(value?.state?.skillStates || {}).length;
      console.log('Persisting state:', { 
        name,
        skillStatesCount,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(name, serialized);
    } catch (error) {
      console.error('Error storing state:', error);
    }
  },

  removeItem: (name: string) => {
    console.log('Removing stored state:', { 
      name,
      timestamp: new Date().toISOString()
    });
    localStorage.removeItem(name);
  }
});