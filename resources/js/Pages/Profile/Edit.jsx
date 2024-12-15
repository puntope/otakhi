import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Page from "@/Layouts/Page.jsx";

export default function Edit({ mustVerifyEmail, status, nationalities, languages }) {
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

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8  mb-5">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8  mb-5">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </Page>
    );
}
