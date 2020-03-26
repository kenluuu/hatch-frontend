import React, { ReactNode } from 'react';
import { Table, ToastHeader } from 'reactstrap';
import { applicant } from '../../Types/types';

interface Props{
    applicants: Array<applicant>
}


const styles = {
    tableStyle: {
        marginTop: '100px'
    },
    ToastHeaderStyle: {
        backgroundColor: 'transparent',
        border: 'none'
    }
}

enum CreditStatus {
    Good = "Good",
    Bad = "Bad",
    Neutral = "Neutral",
}

const renderCreditStatus = (credit: number): ReactNode => {
   
    if (credit >= 0 && credit <= 5) {
    return <ToastHeader icon="danger" style={styles.ToastHeaderStyle}>{CreditStatus.Bad}</ToastHeader>
    } else if (credit > 5 && credit <= 7) {
    return <ToastHeader icon="warning" style={styles.ToastHeaderStyle}>{CreditStatus.Neutral}</ToastHeader>
    } else {
    return <ToastHeader icon="success" style={styles.ToastHeaderStyle}>{CreditStatus.Good}</ToastHeader>
    }
}

const ApplicantTable: React.FC<Props> = (props) => {
    return (
        <Table responsive bordered striped style={styles.tableStyle}>
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
                        <tr key={applicant.id}>
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