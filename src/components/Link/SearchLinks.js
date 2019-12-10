import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const [ filter, setFilter ] = React.useState('');
  // Original Links Array
  const [ links, setLinks ] = React.useState([]);
  // Filtered Links Array
  const [ filteredLinks, setFilteredLinks ] = React.useState([]);
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.database.collection('links').get()
      .then( snapshot => {
        const links = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data()}
        });

        setLinks(links);
      })
      .catch( error => console.error('Ger Links from Search Error: ', error) )
  }

  function handleSearchForm(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    // Filter through Array using the query and return filltered array
    const matchedLinks = links.filter(link => {
      return  link.description.toLowerCase().includes(query) || 
              link.url.toLowerCase().includes(query) ||
              link.postedBy.name.toLowerCase().includes(query)
      ;
    });
    // Set matched links aray to state
    setFilteredLinks(matchedLinks);
    console.log('Search submitted for search term: ', filter);

    // Clear Form input
    setFilter('');
  }
  
  return (
    <div>
      <form onSubmit={handleSearchForm}>
        <div>
          Search <input type="text" value={filter} onChange={(event) => {setFilter(event.target.value)}}/>
          <button type="submit">Go</button>
        </div>
      </form>
      <div>
        {filteredLinks.map((filteredLink, index) => (
          <LinkItem key={filteredLink.id} showCount={false} link={filteredLink} count={index}/>
        ))}
      </div>
    </div>
    
  );
}

export default SearchLinks;
