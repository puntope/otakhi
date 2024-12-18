import Page from "@/Layouts/Page.jsx";
import {formatDate, getFurnishedString, getUtilities} from "@/utils.js";
import Button from "@/Components/Button.jsx";
import {router, useForm, usePage} from "@inertiajs/react";
import TextArea from "@/Components/TextArea.jsx";
import InputError from "@/Components/InputError.jsx";
import {useEffect, useRef} from "react";

export default function Conversation( {conversation }) {
    console.log( conversation );
    const room = conversation.room;
    const landlord = conversation.landlord;
    const user = usePage().props.auth.user;
    const { data, setData, patch, processing, setError, errors } =
        useForm({
            message: '',
            conversation_id: conversation.id
        });

    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    const submit = (e) => {
        e.preventDefault();

        if ( ! data.message ) {
            setError( 'message', 'This field is required.' )
        }

        patch(route('conversation.update'));
    };


    return <Page title="Conversation" headingTitle={`Conversation with ${landlord.name}`}>
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
                <div className="mt-10"><h2 className="text-xl text-black mb-2">Messages</h2>
                    <div ref={messagesContainerRef} className="space-y-4 max-h-80 mb-5 bg-gray-100 rounded p-4 overflow-y-auto">
                            {conversation.messages.map((message, idx) => {
                                let className = message.user_id === user.id ? 'justify-end' : 'justify-start';
                                return <div className={`flex ` + className}>
                                    <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                                        <p className="text-sm">{message.message}</p>
                                        <div
                                            className="text-right text-xs mt-3 text-gray-200">{formatDate(message.created_at)}</div>
                                    </div>
                                </div>
                            })}
                    </div>
                    <div>
                    <strong>New message</strong>
                        <TextArea name="message"  className="p-5 w-full border-none" value={data.message}
                                  onChange={(e) => setData('message', e.target.value)}/>

                        <InputError className="mt-2" message={errors.message}/>
                    </div>
                    <Button disabled={processing}>Send</Button>
                </div>
            </form>
            <InputError className="mt-2" message={errors[0]}/>
        </article>
    </Page>
}
