import SubNavbar from "@/app/components/admin/SubNavbar";

export default function layout({ children }) {
    return (
        <>
            <div className="relative container mx-auto py-8 w-full px-6">
                <SubNavbar />
                {children}
            </div>
        </>
    );
}
