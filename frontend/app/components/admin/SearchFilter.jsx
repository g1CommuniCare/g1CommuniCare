export default function SearchFilter({ data }) {
    
    return (
        <form>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Search />
                </div>
                <input
                    type="text"
                    id="default-search"
                    placeholder="Search"
                    className="w-full p-4 ps-10 border-gray-300 border-b-[2px] outline-none"
                />
            </div>
        </form>
    );
}
