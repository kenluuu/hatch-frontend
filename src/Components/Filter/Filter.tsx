import React, { useState } from 'react';
import { CreditScoreFilter } from '../../Types/types';
import { InputGroup, Input, InputGroupButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';
import { filter } from '../../Types/types';

interface Props {
    applyedFilters: filter,
    handleNameFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleCreditFilterChange: (creditFilter: string) => void
    clearAllFilters: () => void
}

const styles = {
    inputGroupStyle: {
        maxWidth: '450px'
    },
    container: {
        marginTop: '100px'
    }

}

const Filter: React.FC<Props> = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen)
    const { applyedFilters, handleNameFilterChange, handleCreditFilterChange } = props;
    const creditFilters: Array<string> = Object.values(CreditScoreFilter);
    return (
        <div className="h-center v-center" style={styles.container}>
            <InputGroup size='sm' style={styles.inputGroupStyle}>
                <Input 
                    placeholder="Filter by name"  
                    value={applyedFilters.name} 
                    onChange={handleNameFilterChange}
                />
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle color="primary" caret> {applyedFilters.credit}</DropdownToggle>
                    <DropdownMenu>
                        { 
                            creditFilters.map(creditFilter => {
                                return (
                                    <DropdownItem key={creditFilter} onClick={() => handleCreditFilterChange(creditFilter)}>{creditFilter}</DropdownItem>
                                )
                            })
                        }
                    </DropdownMenu>
                </InputGroupButtonDropdown>
            </InputGroup>
            <Button className="clear-filter-btn" color="danger" onClick={props.clearAllFilters}>Clear</Button>
        </div>
    )
}


export default Filter;