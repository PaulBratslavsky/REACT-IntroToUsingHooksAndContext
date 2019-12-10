import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { getDomain } from '../../utils';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { FirebaseContext } from "../../firebase";

function LinkItem({link, count, showCount, history}) {
  
  const { firebase, user } = React.useContext(FirebaseContext);

  

  // Update Upvote via firebase
  function handleUpVote() {
    if (!user) {
      history.push('/login');
    } else {
      // Get reference for item to change
      const voteRef = firebase.database.collection('links').doc(link.id);
      console.log('Reference to item to change', voteRef)

      // Before update must get the item
      voteRef.get()
        .then( doc => {
          // First Check if doc exists
          if (doc.exists) {
            // Get Previous Votes
            const previousVotes = doc.data().votes;
            console.log(previousVotes, 'Prev Votes');

            // Create new vote object
            const newVote = { votedBy: { id: user.uid, user: user.displayName } };

            // Add new vote
            const updatedVotesArray = [ ...previousVotes, newVote ];

            // Update firebase with new vote.  Must specify via object whta property to update
            voteRef.update({ votes: updatedVotesArray })
          } 
        })
        .catch( error => console.error('Error updating votes: ',error) );
    }
  }

  // Check if link was created by current user before deleting
  const postedByAuthedUser = user && user.uid === link.postedBy.id

  function handleDeleteLink() {
    // Get reference for item to Delete
    const linkRef = firebase.database.collection('links').doc(link.id);
    linkRef.delete()
      .then(() => {
        console.log(`Document with the id:${link.id} was deleted.`);
      })
      .catch( error => console.error('Error deleting document: ',error) );
    console.log('delete link clicked');
  }
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        { showCount && <span className="gray">{count}</span> }
        <div className="vote-button" onClick={handleUpVote}>Up Vote</div>
      </div>
      <div className="ml1">
        <div>
          {link.description} <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 1h-copy gray">
          {link.votes.length} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)}
          {" | "} 
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0 
              ? `${link.comments.length} comment(s)`
              :  'discuss'}
          </Link>
          { postedByAuthedUser && (
            <React.Fragment>
              {" | "}
              <span className="delete-button" onClick={handleDeleteLink}>Delete</span>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
