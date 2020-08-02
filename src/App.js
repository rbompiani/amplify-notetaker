import React, { useState } from 'react';

// AWS imports
import { withAuthenticator, AmplifyGreetings } from '@aws-amplify/ui-react'
import { API, graphqlOperation } from 'aws-amplify'

// graphql imports
import { createNotes } from './graphql/mutations'

function App() {
  const [notes, setNotes] = useState([{
    id: 1,
    note: "Hello World"
  }]);

  const [note, setNote] = useState("");

  const handleChangeNote = e => setNote(e.target.value);

  const handleAddNote = async e => {
    e.preventDefault();
    const input = { note };
    const result = await API.graphql(graphqlOperation(createNotes, { input }));
    setNotes([...notes, result.data.createNotes]);
    setNote("");
  }

  return (
    <div>

      <AmplifyGreetings username="testUsername"></AmplifyGreetings>


      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">

        <h1 className="code f2-1">
          Amplify Notetaker
      </h1>

        {/* Note Form */}

        <form onSubmit={handleAddNote} className="mb3">
          <input type="text" className="pa2 f4" placeholder="write your note" onChange={handleChangeNote} value={note} />
          <button className="pa2 f4" type="submit">
            Add Note
        </button>
        </form>


        {/* Notes List */}
        <div>
          {notes.map(item => (
            <div
              key={item.id}
              className="flex items-center">
              <li className="list pa1 f3">
                {item.note}
              </li>
              <button className="bg-transparent bn f4">
                <span>&times;</span>
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
