import { Header } from '../molecules/Header';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6 main-content"> {/* Added main-content class */}
        {children}
      </main>
    </div>
  );
};