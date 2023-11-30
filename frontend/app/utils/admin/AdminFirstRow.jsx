export default function AdminFirstRow({ img, title, numbers }) {
    return (
        <>
            <img src={img} alt="People" className="w-14" />
            <div className="flex flex-col">
                <span className="text-md leading-5 text-[#697077]">{title}</span>
                <span className="text-2xl font-bold">{numbers}</span>
            </div>
        </>
    );
}
