import React from 'react';
import LinkItem from './LinkItem';
import { FirebaseContext } from '../../firebase';

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);

  // STATE
  const [ links, setLinks ] = React.useState(null);

  // Use instead of component did mount
  React.useEffect( () => {
    getLinks();
  }, []);

  function getLinks() {
    // Get data from firebase onSnapshot sets up a listenet and will update on change
    firebase.database.collection('links').onSnapshot(handleSnapshot);
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

  function displayLinks(links) {
    return links.map( (link, index) => (
      <LinkItem key={link.id} showCount={true} link={link} count={index + 1}/>
    ))
  }

  return (
    <div>
      <h2>Links List</h2>
      { links ? displayLinks(links) : <p>Loading...</p>}
    </div>
  )
}

export default LinkList;
