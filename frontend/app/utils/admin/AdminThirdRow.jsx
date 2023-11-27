export default function AdminThirdRow({ title, author, upvotes, downvotes }) {
    return (
        <>
            <div className="flex flex-col justify-center h-full w-3/5">
                <span className="font-semibold text-xl">{title}</span>
                <span className="italic text-sm font-medium">{author}</span>
            </div>

            <div className="h-full w-2/5 flex gap-5 items-center">
                <div className="flex justify-center items-center">
                    <img src="admin/up-green.png" alt="Up" className="w-12" />
                    <span className="font-semibold text-xl">{upvotes}</span>
                </div>

                <div className="flex justify-center items-center">
                    <img src="admin/down-red.png" alt="Down" className="w-12" />
                    <span className="font-semibold text-xl">{downvotes}</span>
                </div>
            </div>
        </>
    );
}
