import {Link} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import Navigation from "@/Components/Navigation.jsx";

export default function Header() {
    return <header className="flex items-center justify-between shadow">
        <div className="p-4">
            <Link href="/">
                <ApplicationLogo />
            </Link>
        </div>
        <Navigation />
    </header>
}
