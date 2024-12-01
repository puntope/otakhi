import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/TextArea';
import Select from '@/Components/Select';
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition} from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import {useState} from "react";


export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    nationalities,
    languages,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [query, setQuery] = useState('')

    const filteredLanguages =
        query === ''
            ? languages
            : languages.filter((language) => {
                return language.name.toLowerCase().includes(query.toLowerCase())
            })


    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            intro: user.intro,
            gender: user.gender,
            nationality_id: user.nationality_id,
            languages: user.languages,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    console.log( user, languages, filteredLanguages, data.languages );

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email}/>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div>

                    <InputLabel htmlFor="gender" value="Gender"/>

                    <Select
                        name="gender"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('gender', e.target.value)}
                        value={data.gender || ''}
                        options={[
                            {value: '', label: 'Prefer not to say'},
                            {value: 'male', label: 'Male'},
                            {value: 'female', label: 'Female'}
                        ]}
                    />


                    <InputError className="mt-2" message={errors.gender}/>
                </div>

                <div>

                    <InputLabel htmlFor="nationality_id" value="Nationality"/>

                    <Select
                        name="nationality_id"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('nationality_id', e.target.value)}
                        value={data.nationality_id || 1}
                        options={nationalities.map(nationality => {
                            return {value: nationality.id, label: nationality.name}
                        })}
                    />


                    <InputError className="mt-2" message={errors.nationality_id}/>
                </div>

                <div>

                    <InputLabel htmlFor="languages" value="Languages"/>


                    <Combobox
                        immediate
                        multiple
                        value={data.languages}
                        onChange={(value) =>  setData('languages', value) } onClose={() => setQuery('')}>
                        <ComboboxInput
                            placeholder="Type for finding a language"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            aria-label="Search Languages" onChange={(event) => setQuery(event.target.value)} />
                        <ComboboxOptions
                            className="bg-white p-4 empty:invisible mt-1 block w-9/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            anchor="bottom start"
                        >
                            {filteredLanguages.map((language) => {
                                let className = "data-[focus]:bg-blue-100 p-2";
                                if ( data.languages.map( lang => lang.id ).includes( language.id ) ) {
                                    className += ' bg-blue-200';
                                }
                                return (
                                    <ComboboxOption key={language.id} value={language} className={className}>
                                        {language.name}
                                    </ComboboxOption>
                                )
                            } )}
                        </ComboboxOptions>
                    </Combobox>

                    {data.languages.length > 0 && (
                        <div className="my-1">
                            {data.languages.map((language) => (
                                <span
                                    key={language.id}
                                    className="mr-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{language.name}</span>
                    ))}
                </div>
                )}

                    {
                        errors?.languages?.map( langError => <InputError className="mt-2" message={ langError }/> )
                    }

            </div>

            <div>

                <InputLabel htmlFor="intro" value="Tell other guests and landlords something about you"/>
                    <Textarea
                        id="intro"
                        className="mt-1 block w-full"
                        value={data.intro || ''}
                        onChange={(e) => setData('intro', e.target.value)}
                    />


                    <InputError className="mt-2" message={errors.intro}/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
