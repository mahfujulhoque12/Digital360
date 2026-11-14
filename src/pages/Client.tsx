import { useMemo, useState } from "react";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiCalendar,
  FiMessageSquare,
  FiUser,
  FiInbox,
} from "react-icons/fi";

import type {
  ClientMessage,
  ClientMessageResponse,
} from "../components/common/MessageViewModal";

import MessageViewModal from "../components/common/MessageViewModal";
import DeleteMessageModal from "../components/common/DeleteMessageModal";
import useGetQuery from "../hooks/useGetQuery";
import { formatDate } from "../utils/formatDate";
import axiosInstance from "../lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Client = () => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useGetQuery<ClientMessageResponse>({
    endpoint: "/contact",
    queryKey: ["contact"],
  });

  console.log(data, "data");
  const contacts = data?.data ?? [];
  const totalContacts = data?.totalContacts ?? 0;

  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ClientMessage | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredMessages = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return contacts;

    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query),
    );
  }, [contacts, search]);
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { data } = await axiosInstance.delete(`/contact/${deleteId}`);

      if (data.success) {
        await queryClient.invalidateQueries({
          queryKey: ["contact"],
        });

        if (selectedMessage?._id === deleteId) {
          setSelectedMessage(null);
        }

        setDeleteId(null);

        toast.success("Contact deleted successfully!");
      }
    } catch (error) {
      console.error("Delete contact error:", error);
      toast.error("Failed to delete contact!");
    }
  };

  if (isLoading) {
    return (
      <section className="wrapper py-20 text-center">
        <p className="text-sm font-semibold text-brand">
          Loading client messages...
        </p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="wrapper py-20 text-center">
        <p className="font-semibold text-red-500">
          Failed to load client messages.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-brand-soft/50 py-8 sm:py-10">
      <div className="wrapper">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-brand">
              <FiMessageSquare size={18} />
              <span className="text-sm font-semibold">Client Management</span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Client Messages
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Manage and review all messages received from your clients.
            </p>
          </div>

          {/* Total Contacts */}
          <div className="flex items-center gap-3 rounded-xl border border-brand/10 bg-paper px-5 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <FiInbox size={21} />
            </div>

            <div>
              <p className="text-2xl font-extrabold text-ink">
                {totalContacts}
              </p>
              <p className="text-xs font-medium text-ink-soft">
                Total Messages
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-brand/10 bg-paper p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or message..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-brand focus:bg-paper focus:ring-2 focus:ring-brand/10"
            />
          </div>

          <p className="text-sm text-ink-soft">
            Showing{" "}
            <span className="font-bold text-brand">
              {filteredMessages.length}
            </span>{" "}
            of {totalContacts} messages
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-brand/10 bg-paper shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-brand-soft/70">
                  <th className="px-5 py-5 text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Client
                  </th>

                  <th className="px-5 py-5 text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Service
                  </th>

                  <th className="px-5 py-5 text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Message
                  </th>

                  <th className="px-5 py-5 text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Date
                  </th>

                  <th className="px-5 py-5 text-center text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredMessages.map((item) => (
                  <tr
                    key={item._id}
                    className="align-top transition-colors hover:bg-brand-soft/30"
                  >
                    {/* Client */}
                    <td className="px-5 py-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                          <FiUser size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="break-words text-sm font-bold text-ink">
                            {item.name}
                          </p>

                          <p className="mt-1 break-all text-xs text-ink-soft">
                            {item.email}
                          </p>

                          <p className="mt-1 text-xs text-ink-soft">
                            {item.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-5 py-6">
                      <span className="inline-flex rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand">
                        {item.service}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="px-5 py-6">
                      <div className="max-w-[440px]">
                        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-ink-soft">
                          {item.message.length > 220
                            ? `${item.message.slice(0, 220)}...`
                            : item.message}
                        </p>

                        {item.message.length > 220 && (
                          <button
                            onClick={() => setSelectedMessage(item)}
                            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-brand-dark"
                          >
                            Read full message
                            <FiEye size={15} />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-6">
                      <div className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-ink-soft">
                        <FiCalendar className="shrink-0 text-brand" />
                        {formatDate(item.createdAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedMessage(item)}
                          title="View message"
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-brand-soft text-brand transition hover:bg-brand hover:text-white"
                        >
                          <FiEye size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteId(item._id)}
                          title="Delete message"
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <FiInbox size={28} />
                </div>

                <h3 className="text-lg font-bold text-ink">
                  No messages found
                </h3>

                <p className="mt-2 text-sm text-ink-soft">
                  {search
                    ? "Try searching with a different keyword."
                    : "No client messages available yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Modal */}
      <MessageViewModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

      {/* Delete Modal */}
      <DeleteMessageModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </section>
  );
};

export default Client;
