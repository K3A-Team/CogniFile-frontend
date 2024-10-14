import Breadcrumb, { BreadcrumbItem } from '../../core/breadcrumb';
import MenuCard from '../../core/menucard';

interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
  toggleMenu: () => void;
  isMenuVisible: boolean;
  handleCreatingFolder: () => void;
  handleUploadFile: () => void;
  handleUploadFolder?: () => void;
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  items,
  toggleMenu,
  isMenuVisible,
  handleCreatingFolder,
  handleUploadFile,
}) => {
  return (
    <div className="relative">
      <Breadcrumb items={items} onToggleMenu={toggleMenu} isMenuVisible={isMenuVisible} />
      {isMenuVisible && (
        <MenuCard
          items={[
            {
              iconSrc: '/iconCards/addfolder.png',
              label: 'New Folder',
              handler: handleCreatingFolder,
            },
            {
              iconSrc: '/iconCards/importfile.png',
              label: 'Import File',
              handler: handleUploadFile,
            },
            {
              iconSrc: '/iconCards/importfolder.png',
              label: 'Import Folder',
              handler: handleUploadFile,
            },
            { iconSrc: '/iconCards/color.png', label: 'Apply Theme' },
          ]}
        />
      )}
    </div>
  );
};

export default BreadcrumbComponent;
