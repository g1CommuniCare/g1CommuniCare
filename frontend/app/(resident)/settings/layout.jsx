import ProfileNavigation from "@/app/components/SettingsNavigation";

export default function layout({ children }) {
    return (
        <div
            className="w-full py-16 px-10 bg-cover h-screen"
            style={{ backgroundImage: 'url("/images/profileBackgroundImage.png")' }}
        >
            <div className="w-[1080px] mx-auto">
                <ProfileNavigation />
                {children}
            </div>
        </div>
    );
}
