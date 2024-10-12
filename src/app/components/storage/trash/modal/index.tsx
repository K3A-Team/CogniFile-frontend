const TrashModal = ({
  show,
  onClose,
  onConfirm,
}: {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-cf-dark-two p-6 rounded-md shadow-md text-center text-white w-80">
        <h2 className="text-xl mb-4 font-bold text-cf-yellow">Confirm Action</h2>
        <p className="text-sm text-cf-gray">Do you really want to empty the trash?</p>
        <div className="flex justify-center mt-6 gap-4">
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white bg-cf-dark-two hover:bg-cf-dark rounded-md transition duration-300"
            onClick={onConfirm}
          >
            Yes, Empty Trash
          </button>
          <button
            className="px-4 py-2 bg-cf-dark-two hover:bg-cf-dark text-white rounded-md transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashModal;
