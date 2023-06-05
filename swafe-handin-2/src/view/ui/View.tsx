import { AppGridMain, AppPageGrid } from "../../app_grid";
import { AppLayout } from "../../app_layout";

interface ViewProps {
  children: React.ReactNode;
  title: string;
}

export function View({ children, title }: ViewProps) {
  return (
    <AppLayout>
      <AppGridMain>
        <AppPageGrid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ fontSize: "30px" }}>{title}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </AppPageGrid>
      </AppGridMain>
    </AppLayout>
  );
}
