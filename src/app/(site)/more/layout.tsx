import Sidebar from '@/src/app/components/core/sidebar';

const MoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 bg-cf-dark">{children}</div>
    </div>
  );
};
export default MoreLayout;
