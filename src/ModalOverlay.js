import React from "react";

const ModalOverlay = ( { onClose, children } ) =>
{
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
            {children}
        </div>
    );
};

export default ModalOverlay;
