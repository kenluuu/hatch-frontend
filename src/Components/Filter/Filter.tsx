import React, { useState } from 'react';
import { CreditScoreFilter } from '../../Types/types';
import { InputGroup, Input, InputGroupButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { filter } from '../../Types/types';

interface Props {
    applyedFilters: filter,
    handleNameFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleCreditFilterChange: (creditFilter: string) => void

}

const styles = {
    inputGroupStyle: {
        maxWidth: '500px'
    },
    container: {
        marginTop: '100px'
    }

}

const Filter: React.FC<Props> = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen)
    const { applyedFilters, handleNameFilterChange, handleCreditFilterChange } = props;
    const creditFilters: Array<string> = Object.values(CreditScoreFilter);
    return (
        <div className="h-center" style={styles.container}>
            <InputGroup size='sm' style={styles.inputGroupStyle}>
                <Input 
                    placeholder="Filter by name"  
                    value={applyedFilters.name} 
                    onChange={handleNameFilterChange}
                />
                <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle color="primary" caret>Credit Filter: {applyedFilters.credit}</DropdownToggle>
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
        </div>
    )
}


export default Filter;