import { router } from "@inertiajs/react";
import NavLink from "@/Components/NavLink.jsx";
import Button from "@/Components/Button.jsx";

export default function Navigation() {
    return <nav className="p-4 flex items-center gap-4">
        <Button onClick={() => {
            router.get( '/register' );
        }}>Create an account</Button>
        <NavLink
            href={route('login')}
            active={route().current('login')}
        >
            Login
        </NavLink>
    </nav>
}
