import { FiTrash2 } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteMessageModal = ({ isOpen, onClose, onConfirm }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        className="w-full max-w-sm rounded-2xl bg-paper p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FiTrash2 size={24} />
        </div>

        {/* Content */}
        <h3
          id="delete-modal-title"
          className="mt-5 text-center text-xl font-extrabold text-ink"
        >
          Delete Message?
        </h3>

        <p className="mt-2 text-center text-sm leading-relaxed text-ink-soft">
          Are you sure you want to delete this client message? This action
          cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-7 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessageModal;
