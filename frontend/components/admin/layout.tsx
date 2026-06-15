import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">{children}</main>

        <Footer />
      </div>
    </div>
  );
}