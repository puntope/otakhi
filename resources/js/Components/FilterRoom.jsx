import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import Button from "@/Components/Button.jsx";

export default function FilterRoom( { filters, onFilterChange, onSearch } ) {
    return <aside className="bg-white shadow">
        <div>
            <InputLabel>
                Available from
                <TextInput value={ filters['availability_from_date'] } type="date" onChange={ ( e ) => { onFilterChange( 'availability_from_date', e.target.value ) }} />
            </InputLabel>
            <InputLabel>
                Max. Deposit
                <TextInput
                    type="number"
                    step="1"
                    min="0"
                    value={ filters['deposit'] }
                    onChange={ ( e ) => { onFilterChange( 'deposit', e.target.value ) }}
                /> $
            </InputLabel>
            <InputLabel>
                Min. Rental duration
                <TextInput type="number" step="1" min="1"
                           value={ filters['min_contract_months'] }
                           onChange={ ( e ) => { onFilterChange( 'min_contract_months', e.target.value ) }}
                /> /months
            </InputLabel>
            <InputLabel>
                Max. Rental duration
                <TextInput type="number" step="1" min="1"
                           value={ filters['max_contract_months'] }
                           onChange={ ( e ) => { onFilterChange( 'max_contract_months', e.target.value ) }}
                /> /months
            </InputLabel>
            <InputLabel>
                Max. Allowed people in the room
                <TextInput type="number" step="1" min="1"
                           value={ filters['allowed_people'] }
                           onChange={ ( e ) => { onFilterChange( 'allowed_people', e.target.value ) }}
                /> ppl
            </InputLabel>
            <InputLabel>
                Min. Floor
                <TextInput type="number" step="1" min="1"
                           value={ filters['min_floor'] }
                           onChange={ ( e ) => { onFilterChange( 'min_floor', e.target.value ) }}
                /> floor
            </InputLabel>
            <InputLabel>
                Max. Floor
                <TextInput type="number" step="1" min="1"
                           value={ filters['max_floor'] }
                           onChange={ ( e ) => { onFilterChange( 'max_floor', e.target.value ) }}
                /> floor
            </InputLabel>
            <InputLabel>
                Building type
                <Checkbox label="Old" name="building_type_old"
                          checked={ filters['building_type_old'] }
                          onChange={ ( e ) => { onFilterChange( 'building_type_old', e.target.value ) }}
                />
                <Checkbox label="New" name="bulding_type_new"/>
                <Checkbox label="Old Renovated" name="bulding_type_renovated"/>
            </InputLabel>
            <InputLabel>
                Bathrooms
                <TextInput type="number" step="1" min="0"/> baths
            </InputLabel>
            <Checkbox label="Incl. utilities" name="has_utilities"/>
            <Checkbox label="Furnished" name="is_furnished"/>
            <Checkbox label="Smoking allowed" name="allows_smoking"/>
            <Checkbox label="Pets allowed" name="allows_pets"/>
            <InputLabel>
                Roomates
                <TextInput type="number" step="1" min="0"/> ppl
            </InputLabel>
            <InputLabel>
                Roomates gender
                <Checkbox label="Men" name="roomates_gender_men"/>
                <Checkbox label="Women" name="roomates_gender_women"/>
            </InputLabel>
            <InputLabel>
                Required gender
                <Checkbox label="Man" name="gender_man"/>
                <Checkbox label="Woman" name="gender_male"/>
            </InputLabel>
            <div>
                <Button onClick={ onSearch }>Apply</Button>
            </div>
        </div>
    </aside>

}
