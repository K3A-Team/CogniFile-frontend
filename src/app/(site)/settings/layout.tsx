import SidebarSettings from '../../components/core/sidebarSettings';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen gap-0">
      <SidebarSettings />
      <div className="w-[85vw] bg-cf-dark max-h-screen py-12">{children}</div>
    </div>
  );
};
export default SettingsLayout;
