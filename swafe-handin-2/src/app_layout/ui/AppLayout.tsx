import * as React from "react";
import { AppGrid } from "../../app_grid";
import { AppNavigation } from "../../app_navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppGrid>
      <AppNavigation />
      {children}
    </AppGrid>
  );
}
