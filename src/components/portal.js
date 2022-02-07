import { createPortal } from "react-dom";

const container = document.getElementById("portal");

const PortalWrapper = ({ children, onClose, title }) => {
    return (
        <div className="fixed inset-0 w-screen h-screen bg-white">
            <div className="container p-4">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">{title}</h1>
                    <div
                        className="h-12 w-12 rounded-full p-2 flex justify-center items-center cursor-pointer shadow-md"
                        onClick={onClose}
                    >
                        <span className="absolute rounded h-0.5 w-8 bg-gray-900 transform rotate-45"></span>
                        <span className="absolute rounded h-0.5 w-8 bg-gray-900 transform -rotate-45"></span>
                    </div>
                </div>
                <div className="mt-16 h-screen overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

const Portal = ({ children, onClose, title }) => {
    return createPortal(
        <PortalWrapper onClose={onClose} title={title}>
            {children}
        </PortalWrapper>,
        container
    );
};

export default Portal;
