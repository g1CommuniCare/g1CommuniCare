import Navbar from "./Navbar";

export default function Layout() {
    return (
        <div className="flex flex-row justify-start h-screen">
            <Navbar />
            <div>DASHBOARD</div>
        </div>
    );
}
