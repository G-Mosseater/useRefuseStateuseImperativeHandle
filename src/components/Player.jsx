import { useState, useRef } from "react";
//when you only want to read a value from an input field, useRef
export default function Player() {
  const playerName = useRef();

  const [enterPlayerName, setEnterPlayerName] = useState(null);
  // const [submited, setSubmited] = useState(false);

  // function handleChange(e) {
  //   setSubmited(false);

  //   setEnterPlayerName(e.target.value);
  // }
  function handleClick() {
    // setSubmited(true);
    setEnterPlayerName(playerName.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome {enterPlayerName ?? "man"} </h2>
      <p>
        <input
          ref={playerName}
          type="text"
          // onChange={handleChange}
          // value={enterPlayerName}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

// function App() {
// making a input open file selector with useRef

//    const file = React.useRef()

//    function handle() {

//    file.current.click()

//    }

//   return (
//     <div id="app">
//       <p>Please select an image</p>
//       <p>
//         <input ref={file}data-testid="file-picker" type="file" accept="image/*" />
//         <button onClick={handle}>Pick Image</button>
//       </p>
//     </div>
//   );
// }
