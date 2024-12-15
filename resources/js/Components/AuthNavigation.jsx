import {Link, router, usePage} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import Dropdown from "@/Components/Dropdown.jsx";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";
import {useState} from "react";
import Button from "@/Components/Button.jsx";

export default function AuthNavigation() {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return <nav className="p-4 flex items-center gap-4">
        { ! user.rooms.length && <Button onClick={() => {  router.get( '/rooms/new' ) }}>Publish a room</Button> }
        <Dropdown>
            <Dropdown.Trigger>
                                        <span className="inline-flex">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md  px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                Hi, {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
                <Dropdown.Link
                    href={route('profile.edit')}
                >
                    Profile
                </Dropdown.Link>
                <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                >
                    Log Out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>

        <div
            className={
                (showingNavigationDropdown ? 'block' : 'hidden') +
                ' sm:hidden'
            }
        >
            <div className="space-y-1 pb-3 pt-2">
            </div>

            <div className="border-t border-gray-200 pb-1 pt-4">
                <div className="px-4">
                    <div className="text-base font-medium text-gray-800">
                        Hi, {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                        {user.email}
                    </div>
                </div>

                <div className="mt-3 space-y-1">
                    <ResponsiveNavLink href={route('profile.edit')}>
                        Profile
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        method="post"
                        href={route('logout')}
                        as="button"
                    >
                        Log Out
                    </ResponsiveNavLink>
                </div>
            </div>
        </div>
    </nav>
}
