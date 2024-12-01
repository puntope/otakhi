import {Link} from "@inertiajs/react";
import NavLink from "@/Components/NavLink.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Navigation() {
    return <nav className="p-4">
        <NavLink
            href={route('login')}
            active={route().current('login')}
        >
            Login
        </NavLink>
    </nav>
}
