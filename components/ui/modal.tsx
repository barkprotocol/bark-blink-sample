import React, { ReactNode } from 'react';
import { Dialog } from '@headlessui/react'; // Headless UI Dialog component for accessible modals
import { XIcon } from 'lucide-react'; // Import a close icon or use any other icon of your choice

// Modal props interface
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

// Modal component
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <Dialog.Panel className="relative w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            {children}
          </div>

          {/* Modal Footer (Optional) */}
          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
      {/* Modal Overlay */}
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
    </Dialog>
  );
};
