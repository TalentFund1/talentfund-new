import { useState, useEffect } from 'react';

export const useCurrentRole = () => {
  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
    const roleId = matches?.[1] || "123";
    console.log('Initial role ID:', roleId);
    return roleId;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
      if (matches?.[1]) {
        console.log('URL changed, updating role ID to:', matches[1]);
        setCurrentRoleId(matches[1]);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    
    const pushState = history.pushState;
    history.pushState = function() {
      pushState.apply(history, arguments as any);
      handleLocationChange();
    };

    const replaceState = history.replaceState;
    history.replaceState = function() {
      replaceState.apply(history, arguments as any);
      handleLocationChange();
    };
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, []);

  return currentRoleId;
};