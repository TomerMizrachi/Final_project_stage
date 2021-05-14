
import React from 'react';
import BigSearchBar from './SearchBar.styles';
import { LinkButton,FilterButton } from '@components/uielements/Button/Button';



function SearchBar() {
return(
    <BigSearchBar>
    <div className="search-box">
    <div className="search">
        <input type="text" className="search-field" placeholder="Search here..." />
        <LinkButton className="login-btn accent round">Search audition</LinkButton>
        <LinkButton className="filter-btn default white round graystroke ">Comedy</LinkButton>
        <LinkButton className="filter-btn default white round graystroke ">Drama</LinkButton>
        <LinkButton className="filter-btn default white round graystroke ">Theatre</LinkButton>
        <LinkButton className="filter-btn default white round graystroke ">TV</LinkButton>



    </div>
    </div>
    </BigSearchBar>
)

}

export default SearchBar;