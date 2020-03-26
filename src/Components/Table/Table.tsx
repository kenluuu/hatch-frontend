import React, { ReactNode, useState, Fragment } from 'react';
import { Table, ToastHeader, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { applicant } from '../../Types/types';

interface Props{
    applicants: Array<applicant>
}

enum CreditStatus {
    Good = "Good",
    Bad = "Bad",
    Neutral = "Neutral",
}

const renderCreditStatus = (credit: number | undefined): ReactNode => {
    if (credit === undefined) return <Fragment />;
    if (credit >= 0 && credit <= 5) {
    return <ToastHeader icon="danger" className="applicant-table-toast">{CreditStatus.Bad}</ToastHeader>
    } else if (credit > 5 && credit <= 7) {
    return <ToastHeader icon="warning" className="applicant-table-toast">{CreditStatus.Neutral}</ToastHeader>
    } else {
    return <ToastHeader icon="success" className="applicant-table-toast">{CreditStatus.Good}</ToastHeader>
    }
}

const ApplicantTable: React.FC<Props> = (props) => {
    const [modal, setModal] = useState<boolean>(false);
    const [selectedApplicant, setSelectedApplicant] = useState<applicant | undefined>(undefined);
    
    const toggle = () => setModal(!modal)
    const handleRowClick = (applicant: applicant) => {
        setSelectedApplicant(applicant);
        toggle();
    }
    return (
        <Table responsive bordered striped className="applicant-table">
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Applicant Info</ModalHeader>
                <ModalBody>
                    <p>Fullname: {`${selectedApplicant?.first_name} ${selectedApplicant?.last_name}`}</p>
                    <p>Credit Indicator Store: {`${selectedApplicant?.credit_indicator}`}</p>
                    <p className="v-center">Credit Status:{renderCreditStatus(selectedApplicant?.credit_indicator)}</p>
                </ModalBody>
                <ModalFooter><Button color="secondary" onClick={toggle}>Close</Button></ModalFooter>
            </Modal>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Credit Indicator</th>
                </tr>
            </thead>
            <tbody>
                { props.applicants.map(applicant => {
                    return (
                        <tr key={applicant.id} onClick={() => handleRowClick(applicant)} className="applicant-table-row">
                            <td>{renderCreditStatus(applicant.credit_indicator)}</td>
                            <td>{applicant.first_name}</td>
                            <td>{applicant.last_name}</td>
                            <td>{applicant.credit_indicator}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    
    )
}

export default ApplicantTable;