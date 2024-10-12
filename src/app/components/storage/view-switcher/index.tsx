import { FaTh, FaList } from 'react-icons/fa';

interface ViewSwitcherProps {
  isListView: boolean;
  toggleView: (isListView: boolean) => void;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ isListView, toggleView }) => {
  return (
    <div className="flex gap-4 items-center">
      <div
        className={`cursor-pointer ${!isListView ? 'selected' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => toggleView(false)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleView(false);
          }
        }}
      >
        <FaTh />
      </div>
      <div
        className={`cursor-pointer ${isListView ? 'selected' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => toggleView(true)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleView(true);
          }
        }}
      >
        <FaList />
      </div>
    </div>
  );
};

export default ViewSwitcher;
