import React from 'react';
import LinkItem from './LinkItem';
import { FirebaseContext } from '../../firebase';

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);

  // STATE
  const [ links, setLinks ] = React.useState(null);

  // Check Page
  const isNewPage = props.location.pathname.includes("new");
  console.log(isNewPage, "CHECK");

  // Use instead of component did mount
  React.useEffect( () => {
    getLinks();
  }, []);

  function getLinks() {
    // Get data from firebase onSnapshot sets up a listenet and will update on change
    // orderBy() - order by field selected
    firebase.database.collection('links').orderBy('created', 'desc').onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    // Have to Map through the docs
    const links = snapshot.docs.map( doc => {
      return { id: doc.id, ...doc.data() }
    });

    // Set State with links data
    setLinks(links);
    // console.log({links}, "DATA FROM FIRESTORE");
  }

  function renderLinks() {
    if (isNewPage) {
      console.log('new page');
      return links;
    } else {
      console.log('other page');
      const topLinks = links.slice().sort((l1, l2) => l2.votes.length - l1.votes.length );
      return topLinks;
    }
  }

  function displayLinks(links) {
    return links.map( (link, index) => (
      <LinkItem key={link.id} showCount={true} link={link} count={index + 1}/>
    ))
  }

  return (
    <div>
      <h2>Links List</h2>
      { links ? displayLinks(renderLinks()) : <p>Loading...</p>}
    </div>
  )
}

export default LinkList;
