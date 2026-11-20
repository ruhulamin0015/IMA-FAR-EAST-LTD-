import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  navigate: () => {},
});

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  const cleaned = rawPath.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const onPopState = () => {
      setPathname(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const cleanTo = normalizePath(to);
    if (normalizePath(window.location.pathname) !== cleanTo) {
      window.history.pushState({}, '', cleanTo);
    }
    setPathname(cleanTo);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  params?: Record<string, string>;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, params, onClick, children, ...rest }, ref) => {
    const { navigate } = useRouter();
    let resolvedHref = to;
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        resolvedHref = resolvedHref.replace(`$${key}`, val);
      }
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (
        !e.defaultPrevented &&
        e.button === 0 &&
        !e.metaKey &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        navigate(resolvedHref);
      }
    };

    return (
      <a ref={ref} href={resolvedHref} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';
