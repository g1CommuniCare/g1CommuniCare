export default function AdminFirstRow({ img, title, numbers }) {
    return (
        <div className="flex gap-6 items-center justify-left bg-white h-full w-1/4 pl-5 border border-DDE1E6">
            <img src={img} alt="People" className="w-14" />
            <div className="flex flex-col">
                <span className="text-md leading-5 text-[#697077]">{title}</span>
                <span className="text-2xl font-bold">{numbers}</span>
            </div>
        </div>
    );
}
