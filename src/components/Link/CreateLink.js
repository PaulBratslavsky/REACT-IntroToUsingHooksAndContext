import React from "react";
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';

// Import Context
import { FirebaseContext } from '../../firebase';

const INITIAL_STATE = { 
  description: '',
  url: ''
};

function CreateLink(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  // Authenticate User Function
  function handleCreateLink() {
    if (!user) {
      props.history.push('/login');
    } else {
      const { url, description } = values;
      
      const currentDay = Date.now();
      
      // Link Format
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        votes: [],
        comments: [],
        created: currentDay
      }

      // CreateLink
      firebase.database.collection('links').add(newLink);
      props.history.push('/');
    }

    console.log("Link Created");
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input 
        onChange={handleChange}
        value={values.description}
        type="text" 
        name="description"
        placeholder="Description for your link"
        autoComplete="off"
        className={errors.description && 'error-input'}
      />
      {errors.description && <p className="error-text" >{errors.description}</p>}
      <input
        onChange={handleChange}
        value={values.url} 
        type="url" 
        name="url"
        placeholder="The URL for the link"
        autoComplete="off"
        className={errors.description && 'error-url'}
      />
      {errors.url && <p className="error-text" >{errors.url}</p>}
      <button className="button" type="submit">Add Link</button>
    </form>
  );
}

export default CreateLink;
