export default function layout({ children }) {
    return (
        <div className="w-full">
            <header
                className="h-72 bg-cover text-black"
                style={{ backgroundImage: 'url("/images/document-request-header.png")' }}
            >
                <div className="flex flex-col justify-evenly w-full my-auto px-5 h-full">
                    <h1 className="font-bold text-6xl w-full">Document Request</h1>
                </div>
            </header>
            {children}
        </div>
    );
}
