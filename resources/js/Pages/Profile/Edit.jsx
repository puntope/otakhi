import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Page from "@/Layouts/Page.jsx";
import {Link, router, usePage} from "@inertiajs/react";
import {getImagePath} from "@/utils.js";
import Button from "@/Components/Button.jsx";

export default function Edit({ mustVerifyEmail, status, nationalities, languages, rooms, conversations }) {
    const user = usePage().props.auth.user;
    return (
        <Page title="Profile" headingTitle="Profile">
            <div className="py-2">
                <div className="container mx-auto">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 mb-5">
                        <UpdateProfileInformationForm
                            nationalities={nationalities}
                            languages={languages}
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>


                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 mb-5">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 mb-5">
                                Rooms
                            </h2>
                        </header>
                        <div className="flex flex-col gap-4">
                            {rooms.map(room => <Link href={route('room.edit', room)}>
                                    <div className="flex w-full items-center gap-3 pb-3 border-b">
                                        <div className="w-6 h-0 pt-6 relative overflow-hidden inline-block">
                                            <img
                                                className="absolute h-full w-full inset-0 object-cover"
                                                src={getImagePath(room)}
                                                alt={room.address}/>
                                        </div>
                                        <p className="bold text-black hover:opacity-50">Room
                                            in {room.neighbourhood.name}, {room.district.name}</p>
                                    </div>
                                </Link>
                            )}

                            {rooms.length <= 0 && <div className="text-center">
                                <p>No rooms found.</p>
                                <div className="mt-6 flex items-center justify-center">
                                    <Button onClick={() => {
                                        router.get('/rooms/new')
                                    }}>Create your first room for free!</Button>
                                </div>
                            </div>}
                        </div>
                    </div>


                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 mb-5">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 mb-5">
                                Conversations
                            </h2>
                        </header>
                        <div className="flex flex-col gap-4">
                            {conversations.map( conversation => {
                                const userName = conversation.user.id === user.id ? conversation.landlord.name : conversation.user.name;
                                return <Link href={route('conversation.show', conversation)}>
                                        <div className="flex w-full items-center gap-3 pb-3 border-b">
                                            <p className="bold text-black hover:opacity-50">Conversation
                                                with <strong>{userName}</strong> about a room
                                                in <strong>{conversation.room.address}</strong></p>
                                        </div>
                                    </Link>
                                }
                            )}

                            {conversations.length <= 0 && <div className="text-center">
                                <p>No conversations found.</p>
                            </div>}
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8  mb-5">
                        <UpdatePasswordForm className="max-w-xl"/>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8  mb-5">
                        <DeleteUserForm className="max-w-xl"/>
                    </div>
                </div>
            </div>
        </Page>
    );
}
