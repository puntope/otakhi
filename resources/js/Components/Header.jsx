import {Link, usePage} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import Navigation from "@/Components/Navigation.jsx";
import AuthNavigation from "@/Components/AuthNavigation.jsx";

export default function Header() {
    const user = usePage().props.auth.user;

    return <header className="flex items-center justify-between shadow">
        <div className="p-4">
            <Link href="/">
                <ApplicationLogo />
            </Link>
        </div>
        { user ? <AuthNavigation /> : <Navigation /> }
    </header>
}
