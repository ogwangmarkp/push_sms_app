/* eslint-disable radix */
/* eslint-disable no-else-return */
/* eslint-disable prefer-const */

export const getLoanAmount = (applicationLoanData) => {
    if (applicationLoanData.status === 'pending' || applicationLoanData.status === 'rejected') {
        return applicationLoanData.loan_amount;
    }
    else if (applicationLoanData.status === 'approved') {
        return applicationLoanData.loan_application_approval.loan_amount;
    } else {
        return applicationLoanData.loan_application_disbursement ? applicationLoanData.loan_application_disbursement.loan_amount : 0;
    }
}

export const getRescheduledLoanTotalInterest = (applicationLoanData) => {
    if (applicationLoanData.status === 'pending') {
        return 0;
    }
    else if (applicationLoanData.status === 'approved') {
        return 0;
    } else if (parseFloat(applicationLoanData.rescheduled_loan_data.interest_expected) > 0) {
        return applicationLoanData.rescheduled_loan_data.interest_expected;
    }
    else {
        return applicationLoanData.loan_application_disbursement.total_interest_expected;
    }
}



