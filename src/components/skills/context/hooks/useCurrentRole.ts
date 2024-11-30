import { useState, useEffect } from 'react';
import { roleSkills } from '../../data/roleSkills';
import { useToast } from '@/components/ui/use-toast';

export const useCurrentRole = () => {
  const { toast } = useToast();
  const [currentRoleId, setCurrentRoleId] = useState<string>(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
    const roleId = matches?.[1];
    
    if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
      console.error('Invalid or missing role ID in URL:', roleId);
      toast({
        title: "Error",
        description: "Invalid role ID in URL. Please select a valid role.",
        variant: "destructive",
      });
      throw new Error('Invalid role ID in URL');
    }
    
    console.log('Initial role ID:', roleId);
    return roleId;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const matches = path.match(/\/(?:skills|employee)\/(\d+)/);
      if (matches?.[1] && roleSkills[matches[1] as keyof typeof roleSkills]) {
        console.log('URL changed, updating role ID to:', matches[1]);
        setCurrentRoleId(matches[1]);
      } else {
        console.error('Invalid role ID in URL after navigation');
        toast({
          title: "Error",
          description: "Invalid role ID in URL. Please select a valid role.",
          variant: "destructive",
        });
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