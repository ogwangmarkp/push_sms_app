import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const Footer = () => {
  return (
    <footer className="page-footer primary">
        <div className="container-fluid text-center">
          <Row>
            <Colxx xxs="12" sm="12">
              <p className="mb-0 text-muted">Copyright: EasyNotify@2024</p>
            </Colxx>
          </Row>
        </div>
    </footer>
  );
};
export default Footer;
