/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { usePagination, DOTS } from './usePagination';

const DataTablePagination = (props) => {
  const {
    totalCount,
    currentPage,
    onChangePage,
    pageSize,
    siblingCount = 1
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  const pageCount = currentPage === 1 ? 0 : pageSize * (currentPage - 1);
  const pageSizeTopUp = totalCount - pageSize * (currentPage - 1) >= pageSize ? pageSize : totalCount - pageSize * (currentPage - 1)

  if (currentPage === 0 || paginationRange.length < 2) {
    return <div>
      {totalCount > 0 && (
        <Colxx xxs="12" className="mt-3 mb-3">
          <Nav className="pagination justify-content-center">
            <NavItem className={`page-item ${currentPage === 1 && 'disabled'}`}>
              <NavLink
                className="page-link first c-pointer"
                onClick={() => onChangePage(1)}
              >
                <i className="simple-icon-control-start" />
              </NavLink>
            </NavItem>
            <NavItem className={`page-item ${currentPage === 1 && 'disabled'}`}>
              <NavLink
                className="page-link prev c-pointer"
                onClick={() => onChangePage(currentPage - 1)}
              >
                <i className="simple-icon-arrow-left" />
              </NavLink>
            </NavItem>
            {[...Array(Math.ceil(totalCount / pageSize))].map((page, i) => (
              <NavItem
                key={page}
                className={`page-item ${currentPage === (i + 1) && 'active'}`}
              >
                <NavLink
                  className="page-link c-pointer"
                  onClick={() => onChangePage(i + 1)}
                >
                  {i + 1}
                </NavLink>
              </NavItem>
            ))}
            <NavItem className={`page-item ${currentPage === [...Array(Math.ceil(totalCount / pageSize))].length && 'disabled'}`}>
              <NavLink
                className="page-link next c-pointer"
                onClick={() => onChangePage(currentPage + 1)}
              >
                <i className="simple-icon-arrow-right" />
              </NavLink>
            </NavItem>
            <NavItem className={`page-item ${currentPage === [...Array(Math.ceil(totalCount / pageSize))].length && 'disabled'}`}>
              <NavLink
                className="page-link last c-pointer"
                onClick={() => onChangePage([...Array(Math.ceil(totalCount / pageSize))].length)}
              >
                <i className="simple-icon-control-end" />
              </NavLink>
            </NavItem>
            <NavItem className="page-item">
              <NavLink
              >
                {`Showing ${pageCount + 1} to ${pageCount + pageSizeTopUp} of ${totalCount} entries`}
              </NavLink>
            </NavItem>
          </Nav>
        </Colxx>
      )}
    </div>
  }
  return (<div>
    {totalCount > 0 && (
      <Colxx xxs="12" className="mt-3 mb-3">
        <Nav className="pagination justify-content-center">
          <NavItem className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <NavLink
              className="page-link first c-pointer"
              onClick={() => onChangePage(1)}
            >
              <i className="simple-icon-control-start" />
            </NavLink>
          </NavItem>
          <NavItem className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <NavLink
              className="page-link prev c-pointer"
              onClick={() => onChangePage(currentPage - 1)}
            >
              <i className="simple-icon-arrow-left" />
            </NavLink>
          </NavItem>
          {paginationRange.map((page) => (<>
            {page === DOTS ? <NavItem
              key={page}
              className="page-item"
            >
              <NavLink
                className="page-link c-pointer"
              >
                &#8230;
              </NavLink>
            </NavItem> :
              <NavItem
                key={page}
                className={`page-item ${currentPage === (page) && 'active'}`}
              >
                <NavLink
                  className="page-link c-pointer"
                  onClick={() => onChangePage(page)}
                >
                  {page}
                </NavLink>
              </NavItem>
            }
          </>
          ))}
          <NavItem className={`page-item ${currentPage === paginationRange.length && 'disabled'}`}>
            <NavLink
              className="page-link next c-pointer"
              onClick={() => onChangePage(currentPage + 1)}
            >
              <i className="simple-icon-arrow-right" />
            </NavLink>
          </NavItem>
          <NavItem className={`page-item ${currentPage === paginationRange.length && 'disabled'}`}>
            <NavLink
              className="page-link last c-pointer"
              onClick={() => onChangePage(paginationRange.length)}
            >
              <i className="simple-icon-control-end" />
            </NavLink>
          </NavItem>
          <NavItem className="page-item">
            <NavLink
            >
              {`Showing ${pageCount + 1} to ${pageCount + pageSizeTopUp} of ${totalCount} entries`}
            </NavLink>
          </NavItem>
        </Nav>
      </Colxx>
    )}
  </div>)
};

export default DataTablePagination;
