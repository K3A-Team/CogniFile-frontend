import Sidebar from '@/src/app/components/core/sidebar';

const StorageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 bg-cf-dark">{children}</div>
    </div>
  );
};
export default StorageLayout;
