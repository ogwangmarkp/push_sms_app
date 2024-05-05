
import React  from 'react';
import {
    Card
} from 'reactstrap';
import {defaultOrgLogo} from 'constants/defaultValues';
import classnames from 'classnames';

const CompanyProfile = (props) => {
    const {loggedInUserSession} = props;
    return (
        <>
        {loggedInUserSession && (
            <>
            <Card className={`${classnames('d-flex flex-row mb-3 mt-3 pr-card-border-top')}`}>
                <div className="p-2 pl-2 d-flex flex-grow-1 min-width-zero">
                    <div className="full-width align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <p className="pl-3 w-15 w-sm-100 list-item-heading mb-1 ">
                            <img alt="Company logo" className="img-thumbnail thumbnail-img-60 align-self-center medium" src={loggedInUserSession && loggedInUserSession.logo_url?loggedInUserSession.logo_url:defaultOrgLogo}/>
                        </p>
                        <p className="mb-1 text-default w-25 w-sm-100 truncate">
                            <strong className='width-50'>Company: </strong>{loggedInUserSession.organisation_name}<br/>
                            <strong className='width-50'>Address: </strong><span className='text-muted'>{`${loggedInUserSession.address}, ${loggedInUserSession.city && loggedInUserSession.city}`}</span><br/>
                            <strong className='width-50'>Telephone: </strong>{loggedInUserSession.phone_number}<br/>
                        </p>
                        <p className="mb-1 text-default  w-25 w-sm-100">
                            <strong className='width-50' >Branch: </strong>{loggedInUserSession.branch_name}<br/>
                            <strong className='width-50'>Address: </strong><span className='text-muted'>{`${loggedInUserSession.branch_name}, ${loggedInUserSession.branch_address && loggedInUserSession.branch_name}, ${loggedInUserSession.branch_address}`}</span><br/>
                        </p>
                    </div>
                </div>
            </Card>
            </>
        )}
        </>
    );
};
export default CompanyProfile;
