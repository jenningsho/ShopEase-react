import React , { useState} from "react";


const SearchBar = ( {onSearch} ) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputOnChange = (event) => {

        const query = event.target.value || "";
        setSearchQuery(query);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log("soumission de la barre de recherche", searchQuery);
        if(onSearch)
        {
            // appel de la fonction de recherche
            onSearch(searchQuery);
        }
    }



    return( 
        <form   className="d-flex mx-3" 
                role="search" 
                onSubmit={handleSearchSubmit}>
            <input  className="form-control" 
                    type="search" 
                    placeholder="Tapez un nom de produit, catégorie, ..." 
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleInputOnChange}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    )
}

export default SearchBar;