import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Checkbox from "@/Components/Checkbox.jsx";
import Button from "@/Components/Button.jsx";
import FilterHeading from "@/Components/FilterHeading.jsx";

export default function FilterRoom( { isOpen = false, filters, onFilterChange, onSearch, onClear } ) {
    return <aside
        className={"h-screen min-w-[400px] bg-white shadow fixed top-0 right-0 transition-transform " + (isOpen ? '' : "translate-x-full")}>
        <div className="grid w-full h-full">
            <div className="p-10 overflow-y-auto flex flex-col">
                <div>
                    <FilterHeading>Availability</FilterHeading>
                    <InputLabel>
                        Available from
                        <TextInput value={filters['availability_from_date']} type="date" onChange={(e) => {
                            onFilterChange('availability_from_date', e.target.value)
                        }}/>
                    </InputLabel>
                    <InputLabel>
                        Min. Rental duration
                        <div>
                            <TextInput type="number" step="1" min="1"
                                       value={filters['min_contract_months']}
                                       onChange={(e) => {
                                           onFilterChange('min_contract_months', e.target.value)
                                       }}
                            /> /months
                        </div>
                    </InputLabel>
                    <InputLabel>
                        Max. Rental duration
                        <div>
                            <TextInput type="number" step="1" min="1"
                                       value={filters['max_contract_months']}
                                       onChange={(e) => {
                                           onFilterChange('max_contract_months', e.target.value)
                                       }}
                            /> /months
                        </div>
                    </InputLabel>
                </div>


                <FilterHeading>Expenses</FilterHeading>
                <InputLabel>
                    Max. Deposit
                    <div>
                        <TextInput
                            type="number"
                            step="1"
                            min="0"
                            value={filters['deposit']}
                            onChange={(e) => {
                                onFilterChange('deposit', e.target.value)
                            }}
                        /> $
                    </div>
                </InputLabel>
                <Checkbox label="Incl. utilities" name="has_utilities"/>

                <FilterHeading>Ideal tenant</FilterHeading>
                <InputLabel>
                    Max. Allowed people in the room
                    <div>
                        <TextInput type="number" step="1" min="1"
                                   value={filters['allowed_people']}
                                   onChange={(e) => {
                                       onFilterChange('allowed_people', e.target.value)
                                   }}
                        /> ppl
                    </div>
                </InputLabel>
                <InputLabel>
                    Required gender
                    <Checkbox label="Man" name="gender_man"/>
                    <Checkbox label="Woman" name="gender_male"/>
                </InputLabel>
                <Checkbox label="Smoking allowed" name="allows_smoking"/>
                <Checkbox label="Pets allowed" name="allows_pets"/>

                <FilterHeading>Building</FilterHeading>
                <InputLabel>
                    Min. Floor
                    <div>
                        <TextInput type="number" step="1" min="1"
                                   value={filters['min_floor']}
                                   onChange={(e) => {
                                       onFilterChange('min_floor', e.target.value)
                                   }}
                        /> floor
                    </div>
                </InputLabel>
                <InputLabel>
                    Max. Floor
                    <div>
                        <TextInput type="number" step="1" min="1"
                                   value={filters['max_floor']}
                                   onChange={(e) => {
                                       onFilterChange('max_floor', e.target.value)
                                   }}
                        /> floor
                    </div>
                </InputLabel>
                <InputLabel>
                    Building type
                    <Checkbox label="Old" name="building_type_old"
                              checked={filters['building_type_old']}
                              onChange={(e) => {
                                  onFilterChange('building_type_old', e.target.value)
                              }}
                    />
                    <Checkbox label="New" name="bulding_type_new"/>
                    <Checkbox label="Old Renovated" name="bulding_type_renovated"/>
                </InputLabel>
                <InputLabel>
                    Bathrooms
                    <div>
                        <TextInput type="number" step="1" min="0"/> baths
                    </div>
                </InputLabel>
                <InputLabel>
                    Furnished
                    <div>
                        <Checkbox label="Furnished" name="is_furnished"/>
                        <Checkbox label="Not Furnished" name="is_not_furnished"/>
                    </div>
                </InputLabel>

                <FilterHeading>Roommates</FilterHeading>
                <InputLabel>
                    Number of Roommates
                    <div>
                        <TextInput type="number" step="1" min="0"/> ppl
                    </div>
                </InputLabel>
                <InputLabel>
                    Roommates gender
                    <Checkbox label="Men" name="roommates_gender_men"/>
                    <Checkbox label="Women" name="roommates_gender_women"/>
                </InputLabel>
            </div>
            <div className="flex items-center border-t p-5 justify-between">
                <Button onClick={onSearch}>Apply</Button>
                <Button type="simple" onClick={onClear}>Clear filters</Button>
            </div>
        </div>
    </aside>

}
