export default function ModalOverlay({ children }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-gray-200 bg-opacity-40">
            {children}
        </div>
    );
}