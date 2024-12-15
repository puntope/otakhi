import Page from "@/Layouts/Page.jsx";
import {useForm, usePage} from "@inertiajs/react";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition} from "@headlessui/react";
import {useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Radio from "@/Components/Radio.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";
import {getNeighbourhood} from "@/utils.js";

export default function Create({ room = {}, neighbourhoods, building_statuses, genders }) {
    const user = usePage().props.auth.user;

    const [query, setQuery] = useState('')

    const { data, setData, post, setError, errors, processing, recentlySuccessful } =
        useForm({
            user_id: user.id,
            size: room.size || '',
            is_furnished: room.is_furnished || false,
            neighbourhood_id: room.neighbourhood_id || null,
            address: room.address || '',
            building_status: room.building_status || 'old',
            floor: room.floor || '',
            num_bathrooms: room.num_bathrooms || '',
            num_roommates: room.num_roommates || '',
            roommates_gender: room.roommates_gender || '',
            price: room.price || '',
            deposit: room.deposit || 0,
            has_utilities: room.has_utilities || false,
            availability_from_date: room.availability_from_date || '',
            min_contract_months: room.min_contract_months || '',
            required_gender: room.required_gender || '',
            allowed_people: room.allowed_people || '',
            allows_smoking: room.allows_smoking || false,
            allows_pets: room.allows_pets || false
        });

    console.log(data);

    const filteredNeighbourhoods =
        query === ''
            ? neighbourhoods
            : neighbourhoods.filter((neighbourhood) => {
                return neighbourhood.name.toLowerCase().includes(query.toLowerCase())
            })


    const submit = (e) => {
        e.preventDefault();

        if ( ! data.neighbourhood_id ) {
            setError( 'neighbourhood_id', 'This field is required.' )
        }

        post(route('room.store'));
    };

    return (
        <Page title="Publish a Room" headingTitle="Publish a Room">
            <form onSubmit={submit}>
                <div className="container mx-auto">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Room details & location
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Tell us more about the room.
                                </p>
                            </header>
                            <div className="mt-4">
                                <InputLabel htmlFor="size" value="What's the size of the room?"/>
                                <input
                                    required
                                    placeholder="10"
                                    onChange={(e) => setData('size', e.target.value)}
                                    type="number" min="1" value={data.size} name="size" step="1"/> m2

                                <InputError className="mt-2" message={errors.size}/>

                            </div>

                            <div className="mt-4">
                                <Checkbox label="Is it Furnished?" name="is_furnished" checked={data.is_furnished}
                                          onChange={(e) => {
                                              setData('is_furnished', e.target.checked)
                                          }}/>

                                <InputError className="mt-2" message={errors.is_furnished}/>
                            </div>

                            <div className="mt-4">

                                <InputLabel htmlFor="neighbourhood" value="Neighbourhood"/>
                                <Combobox
                                    immediate
                                    value={ data.neighbourhood_id  }
                                    onChange={(value) => setData('neighbourhood_id', value ) } onClose={() => setQuery('')}>
                                    <ComboboxInput
                                        placeholder="Type for finding a neighbourhood"
                                        value={ query || getNeighbourhood( neighbourhoods, data.neighbourhood_id)?.name || '' }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        aria-label="Search neighbourhoods"
                                        onChange={(event) => setQuery(event.target.value)}/>
                                    <ComboboxOptions
                                        className="bg-white p-4 empty:invisible mt-1 block w-9/12 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                                        anchor="bottom start"
                                    >
                                        {filteredNeighbourhoods.sort(
                                            (a, b) => {
                                                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                                                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                                                if (nameA < nameB) {
                                                    return -1;
                                                }
                                                if (nameA > nameB) {
                                                    return 1;
                                                }

                                                // names must be equal
                                                return 0;
                                            }
                                        ).map((neighbourhood) => {
                                            let className = "data-[focus]:bg-blue-100 p-2";
                                            if (data.neighbourhood_id === neighbourhood.id) {
                                                className += ' bg-blue-200';
                                            }
                                            return (
                                                <ComboboxOption key={neighbourhood.id} value={neighbourhood.id}
                                                                className={className}>
                                                    {neighbourhood.name}
                                                </ComboboxOption>
                                            )
                                        })}
                                    </ComboboxOptions>
                                </Combobox>
                                <InputError className="mt-2" message={errors.neighbourhood}/>
                                <InputError className="mt-2" message={errors.neighbourhood_id}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="address" value="Address"/>
                                <TextInput
                                    placeholder="Example Street, 123"
                                    id="address"
                                    className="mt-1 block w-full"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.address}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="building_status" value="Building Status"/>

                                {
                                    building_statuses.map(building_status => <Radio
                                        key={building_status.id}
                                        onChange={(e) => setData('building_status', e.target.value)}
                                        name="building_status" label={building_status.name} value={building_status.id}
                                        checked={data.building_status === building_status.id}/>)
                                }
                                <InputError className="mt-2" message={errors.building_status}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="floor" value="Which floor?"/>
                                <input
                                    required
                                    placeholder="20"
                                    onChange={(e) => setData('floor', e.target.value)}
                                    type="number" min="1" value={data.floor} name="floor" step="1"/>

                                <InputError className="mt-2" message={errors.floor}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="num_bathrooms" value="How many bathrooms?"/>
                                <input
                                    required
                                    placeholder="2"
                                    onChange={(e) => setData('num_bathrooms', e.target.value)}
                                    type="number" min="1" value={data.num_bathrooms} name="num_bathrooms" step="1"/>

                                <InputError className="mt-2" message={errors.num_bathrooms}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="num_roommates"
                                            value="How many people is living in the apartment?"/>
                                <input
                                    required
                                    placeholder="2"
                                    onChange={(e) => setData('num_roommates', e.target.value)}
                                    type="number" min="1" value={data.num_roommates} name="num_roomates" step="1"/>

                                <InputError className="mt-2" message={errors.num_roommates}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="roommates_gender" value="Gender of the roommates"/>
                                <Radio
                                    key="any"
                                    onChange={(e) => setData('roommates_gender', e.target.value)}
                                    name="roommates_gender" label="Both" value=""
                                    checked={!data.roommates_gender}/>
                                {
                                    genders.map(gender => <Radio
                                        key={gender.id}
                                        onChange={(e) => setData('roommates_gender', e.target.value)}
                                        name="roommates_gender" label={gender.name} value={gender.id}
                                        checked={data.roommates_gender === gender.id}/>)
                                }
                                <InputError className="mt-2" message={errors.roommates_gender}/>

                            </div>
                        </section>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Availability, contract and price
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Let's talk about the numbers.
                                </p>
                            </header>
                            <div className="mt-4">
                                <InputLabel htmlFor="price" value="What's the monthly rent price?"/>
                                <input
                                    required
                                    placeholder="100"
                                    onChange={(e) => setData('price', e.target.value)}
                                    type="number" min="0" value={data.price} name="price" step="1"/> $
                                <InputError className="mt-2" message={errors.price}/>

                            </div>
                            <div className="mt-4">
                                <Checkbox label="Has the utilities included?" name="has_utilities"
                                          checked={data.has_utilities}
                                          onChange={(e) => {
                                              setData('has_utilities', e.target.checked)
                                          }}/>

                                <InputError className="mt-2" message={errors.has_utilities}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="deposit" value="Is there any deposit required?"/>
                                <input
                                    required
                                    onChange={(e) => setData('deposit', e.target.value)}
                                    type="number" min="0" value={data.deposit} name="deposit" step="1"/> $

                                <InputError className="mt-2" message={errors.deposit}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel>
                                    When it will be available?
                                    <TextInput required value={data.availability_from_date} type="date" onChange={(e) => {
                                        setData('availability_from_date', e.target.value)
                                    }}/>

                                    <InputError className="mt-2" message={errors.availability_from_date}/>

                                </InputLabel>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="min_contract_months"
                                            value="How many months the tenant can live in the room?"/>
                                <input
                                    placeholder="12"
                                    required
                                    onChange={(e) => setData('min_contract_months', e.target.value)}
                                    type="number" min="1" value={data.min_contract_months} name="min_contract_months"
                                    step="1"/>

                                <InputError className="mt-2" message={errors.min_contract_months}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="allowed_people"
                                            value="How many people can live in the room?"/>
                                <input
                                    required
                                    placeholder="2"
                                    onChange={(e) => setData('allowed_people', e.target.value)}
                                    type="number" min="1" value={data.allowed_people} name="allowed_people"
                                    step="1"/>

                                <InputError className="mt-2" message={errors.allowed_people}/>

                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="required_gender" value="Which gender the tenant should be?"/>
                                <Radio
                                    key="any"
                                    onChange={(e) => setData('required_gender', e.target.value)}
                                    name="required_gender" label="Not important" value=""
                                    checked={!data.required_gender}/>
                                {
                                    genders.map(gender => <Radio
                                        key={gender.id}
                                        onChange={(e) => setData('required_gender', e.target.value)}
                                        name="required_gender" label={gender.name} value={gender.id}
                                        checked={data.required_gender === gender.id}/>)
                                }

                                <InputError className="mt-2" message={errors.required_gender}/>

                            </div>
                            <div className="mt-4">
                                <Checkbox label="Is smoking allowed?" name="allows_smoking"
                                          checked={data.allows_smoking}
                                          onChange={(e) => {
                                              setData('allows_smoking', e.target.checked)
                                          }}/>

                                <InputError className="mt-2" message={errors.allows_smoking}/>

                            </div>
                            <div className="mt-4">
                                <Checkbox label="Are pets allowed?" name="allows_pets" checked={data.allows_pets}
                                          onChange={(e) => {
                                              setData('allows_pets', e.target.checked)
                                          }}/>

                                <InputError className="mt-2" message={errors.allows_pets}/>

                            </div>
                        </section>
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
                </div>
            </form>
        </Page>
    );
}
