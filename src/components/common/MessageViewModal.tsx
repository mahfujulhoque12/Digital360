import {
  FiX,
  FiUser,
  FiMail,
  FiCalendar,
  FiMessageSquare,
} from "react-icons/fi";
import { formatDate } from "../../utils/formatDate";

export interface ClientMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ClientMessageResponse {
  success: boolean;
  message: string;
  totalContacts: number;
  data: ClientMessage[];
}

type Props = {
  message: ClientMessage | null;
  onClose: () => void;
};

const MessageViewModal = ({ message, onClose }: Props) => {
  if (!message) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-modal-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
          <div>
            <h2
              id="message-modal-title"
              className="text-xl font-extrabold text-ink"
            >
              Client Message
            </h2>

            <p className="mt-1 text-xs text-ink-soft">
              Complete message details
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-ink transition hover:bg-red-50 hover:text-red-500"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <FiUser /> Client Name
              </p>
              <p className="break-words text-sm font-semibold text-ink">
                {message.name}
              </p>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <FiMail /> Email Address
              </p>
              <p className="break-all text-sm font-semibold text-ink">
                {message.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Subject
              </p>
              <p className="break-words text-sm font-semibold text-ink">
                {message.message}
              </p>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <FiCalendar /> Date
              </p>
              <p className="text-sm font-semibold text-ink">
                {formatDate(message.createdAt)}
              </p>
            </div>
          </div>

          {/* Full Message */}
          <div className="mt-7">
            <div className="mb-3 flex items-center gap-2">
              <FiMessageSquare className="text-brand" />
              <h3 className="text-sm font-bold text-ink">Full Message</h3>
            </div>

            <div className="min-h-[180px] rounded-xl border border-brand/10 bg-brand-soft/50 p-5 sm:p-6">
              <p className="text-sm leading-8 whitespace-pre-wrap wrap-break-word text-ink-soft">
                {message.message}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-100 p-5">
          <button
            onClick={onClose}
            className="rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageViewModal;
