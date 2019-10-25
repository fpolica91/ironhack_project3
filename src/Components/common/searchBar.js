import React from 'react';

const SearchBar = (props) => {
    return ( 
     <form>
      <label>Search</label>
      <input 
      onChange={(e) => props.onSearch(e.currentTarget.value)}
      name="searchTerm"
      value={props.searchTerm}
      type="text"/> 
     </form> 
     );
}
 
export default SearchBar;