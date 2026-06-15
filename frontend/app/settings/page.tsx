import { DashboardLayout } from "@/components/dashboard/layout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">
        Manage account settings.
      </p>
    </DashboardLayout>
  );
}