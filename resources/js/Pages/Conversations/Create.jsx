import Page from "@/Layouts/Page.jsx";
import {getFurnishedString, getNationality, getUtilities} from "@/utils.js";
import Button from "@/Components/Button.jsx";
import {router, useForm, usePage} from "@inertiajs/react";
import TextArea from "@/Components/TextArea.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({ room = {}, nationalities }) {
    const user = usePage().props.auth.user;

    const defaultMessage = `Hey there ${room.landlord.name}! This is ${user.name} from ${ getNationality( nationalities, user.nationality_id).name }. Your room looks promising!`

    const { data, setData, post, processing, setError, errors } =
        useForm({
            message: defaultMessage,
            room_id: room.id,
            user_id: user.id
        });


    const submit = (e) => {
        e.preventDefault();

        if ( ! data.message ) {
            setError( 'message', 'This field is required.' )
        }

        post(route('conversation.store'));
    };


    return <Page title="New Conversation" headingTitle={`New Conversation with ${room.landlord.name}`}>
        <article className="container mx-auto">
            <header className="flex items-start justify-between pb-5 border-b">
                <div>
                    <strong>Room in ${room.address}</strong>
                    <p>Monthly Rent ( {getUtilities(room)} ): <strong
                        className="text-black font-bold text-lg">{room.price}$</strong></p>
                    <p>Deposit: <strong className="text-black font-bold text-lg">{room.deposit}$</strong></p>
                </div>
                <Button onClick={() => {
                    router.get(`/room/${room.id}`)
                }}>View room</Button>
            </header>
            <form onSubmit={submit}>
                <div className="mt-10">
                    <h2 className="text-xl text-black mb-2">Message {room.landlord.name} about your interest.</h2>
                    <div>
                        <TextArea name="message" rows="20" className="p-5 w-full border-none" value={data.message}
                                  onChange={(e) => setData('message', e.target.value)}/>

                        <InputError className="mt-2" message={errors.message}/>
                    </div>
                    <PrimaryButton disabled={processing}>Send</PrimaryButton>
                </div>
            </form>
            <InputError className="mt-2" message={errors[0]}/>
        </article>
    </Page>
}
