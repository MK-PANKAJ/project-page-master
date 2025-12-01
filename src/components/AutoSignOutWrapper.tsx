import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAutoSignOut } from '@/hooks/useAutoSignOut';

export const AutoSignOutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Always call the hook - it manages its own state
  useAutoSignOut();

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
};
