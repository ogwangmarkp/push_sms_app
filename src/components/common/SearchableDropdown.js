import React, {useState} from 'react';
import {
  ListGroup,
  ListGroupItem,
  Input
} from "reactstrap";

const SearchableDropdown = (props) => {
  const {searchResults,search, updateSearch,selectlistItem,noInformation,placeHolderText} = props;
  const [isOpen, setIsOpen] = useState(false);

  const updatelist = (searchValue) => {
    updateSearch(searchValue)
    if (searchValue.length > 0) {
      setIsOpen(true);
    }else{
      setIsOpen(false);
    }
  };

  const handelItemSelection = (id) => {
    selectlistItem(id);
    setIsOpen(false);
  };
  
  
  return (
    <div className="mt-2 mb-2 custom-searchable-list mw-600" onMouseLeave={() => setIsOpen(false)}>
        <Input
        className='searchInput'
          onInput={(e) => updatelist(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeHolderText}
          value={search}
        />
        {isOpen && (
           <ListGroup flush className="result-list mw-600"  onMouseEnter={() => setIsOpen(true)}>
           {searchResults.length > 0 && searchResults.map((item) => (
             <ListGroupItem
               onClick={() => handelItemSelection(item.value)}
               key={`${item.value}-customer`}
               >
               {item.label}
             </ListGroupItem>
           ))}
           {searchResults.length < 1 && (<ListGroupItem
               >
              {noInformation}
             </ListGroupItem>)}
         </ListGroup>
        )}
    </div>
  );
};

export default SearchableDropdown;
