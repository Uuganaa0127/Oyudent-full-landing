import { createContext, useContext, useState, ReactNode } from "react";

type PopupContextType = {
  visible: boolean;
  content: ReactNode;
  show: (content: ReactNode) => void;
  showMessage: (message: string, type?: "success" | "error") => void;
  hide: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const show = (c: ReactNode) => {
    setContent(c);
    setVisible(true);
  };

  const showMessage = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setContent(
      <div
        className={` px-6 py-3 rounded-lg shadow-lg font-medium transition duration-300 ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {message}
      </div>
    );
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  const hide = () => {
    setVisible(false);
    setContent(null);
  };

  return (
    <PopupContext.Provider value={{ visible, content, show, showMessage, hide }}>
      {children}

      {/* Modal Popup */}
      {visible && (
        <div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={hide}
        >
          <div
            className="bg-white text-black rounded-xl shadow-xl max-w-md w-full p-6 transition-all duration-300"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            {content}
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
