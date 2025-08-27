import { useState, useRef } from "react";
import ResultModal from "./ResultModal";
export default function TimerChallenge({ title, targetTime }) {
  // use ref so the value of the timer wont get lost when trying to start another one
  // use ref to manage a value that isnt a state
  const timer = useRef();
  const dialog = useRef();
  //   const [timerStarted, setTimerStarted] = useState(false);
  //   const [timerExpired, setTimerExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  //   function handleStart() {
  //     setTimerStarted(true);

  //     timer.current = setTimeout(() => {
  //       setTimerExpired(true);
  //       // detach the timer challenge component from the dialog elemmment in the result modal component
  //       // called open() object from useImperativeHandle
  //       dialog.current.open()
  //     }, targetTime * 1000);
  //   }
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  //   function handleStop() {
  //     clearTimeout(timer.current);
  //   }
  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You Lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "stop" : "start"}
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

// import React from 'react';

// import Workout from './Workout';

// const workouts = [
//   {
//     title: 'Pushups',
//     description: 'Do 30 pushups',
//     time: 1000 * 60 * 3,
//   },
//   {
//     title: 'Squats',
//     description: 'Do 30 squats',
//     time: 1000 * 60 * 2,
//   },
//   {
//     title: 'Pullups',
//     description: 'Do 10 pullups',
//     time: 1000 * 60 * 3,
//   },
// ];

// function App() {
//   const [completedWorkouts, setCompletedWorkouts] = React.useState([]);

//   function handleWorkoutComplete(workoutTitle) {
//     setCompletedWorkouts((prevCompletedWorkouts) => [
//       ...prevCompletedWorkouts,
//       workoutTitle,
//     ]);
//   }

//   return (
//     <main>
//       <section>
//         <h2>Choose a workout</h2>
//         <ul>
//           {workouts.map((workout) => (
//             <li key={workout.title}>
//               <Workout
//                 {...workout}
//                 onComplete={() => handleWorkoutComplete(workout.title)}
//               />
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h2>Completed workouts</h2>
//         <ul>
//           {completedWorkouts.map((workoutTitle, index) => (
//             <li key={index}>{workoutTitle}</li>
//           ))}
//         </ul>
//       </section>
//     </main>
//   );
// }

// export default App;

// import React from 'react'

// export default function Workout({ title, description, time, onComplete }) {

//     const timer = React.useRef()

//   function handleStartWorkout() {
//     timer.current = setTimeout(handleStopWorkout,time) //This makes the workout end automatically if the user doesn’t click Stop manually.
//   }

//   function handleStopWorkout() {
//       if (timer.current) {
//     clearTimeout(timer.current)
//     onComplete();
//           timer.current = null
//       }
//   }

//   return (
//     <article className="workout">
//       <h3>{title}</h3>
//       <p>{description}</p>
//       <p>{time}</p>
//       <p>
//         <button onClick={handleStartWorkout}>Start</button>
//         <button onClick={handleStopWorkout}>Stop</button>
//       </p>
//     </article>
//   );
// }

//Each Workout has its own timer stored in useRef, so workouts are independent.

// Start button → sets a timer (setTimeout) for the workout’s time. When it finishes, it calls handleStopWorkout.

// Stop button → clears the timer and calls onComplete() if the timer was running.

// This ensures workouts can finish automatically or be stopped manually, and completed workouts are tracked correctly.

// more examples

// import Input from './Input';
// import React from 'react'

// export const userData = {
//   name: '',
//   email: '',
// };

// export function App() {

// const nameRef = React.useRef();
// const emailRef = React.useRef();

//   function handleSaveData() {
//     userData.name = nameRef.current.value
//     userData.email = emailRef.current.value

//     console.log(userData);
//   }

//   return (
//     <div id="app">
//       <Input type="text" label="Your Name" ref={nameRef} />
//       <Input type="email" label="Your E-Mail" ref={emailRef} />
//       <p id="actions">
//         <button onClick={handleSaveData}>Save Data</button>
//       </p>
//     </div>
//   );
// }

// import React from 'react'

//These refs get attached to the two <Input /> fields (name + email).

// When the Save Data button is clicked, handleSaveData reads the current input values (ref.current.value) and saves them into the userData object.
// const Input = React.forwardRef(function Input({label, ...props},ref) {
//   // Todo: Accept forwarded ref and "connect" it to the <input> element
//   return (
//     <p className="control">
//       <label>{label}</label>
//       {/* Todo: "Forward" remaining props to <input> element */}
//       <input ref={ref} {...props} />
//     </p>
//   );
// })

// export default Input;
// With ref, you don’t need state (useState) or two-way binding (onChange) for every input.

// It’s a quick way to “grab” values from inputs when you only need them at a specific moment (e.g. when clicking Save Data).

// clearing input fields

// import React from 'react'

// const Form = React.forwardRef( function Form(props, ref) {
//     const formRef = React.useRef()
//    React.useImperativeHandle(ref, () => {
//        return {
//            clear() {
//                formRef.current.reset()
//            }
//        }
//    })
//   return (
//     <form ref={formRef}>
//       <p>
//         <label>Name</label>
//         <input type="text" />
//       </p>

//       <p>
//         <label>Email</label>
//         <input type="email" />
//       </p>
//       <p id="actions">
//         <button>Save</button>
//       </p>
//     </form>
//   );
// }
// )
// export default Form

// import Form from './Form';
// import React from 'react'

// export function App() {

//      const form = React.useRef()

//         function handleRestart(){
//         form.current.clear()
//     }

//   return (
//     <div id="app">
//       <button onClick={handleRestart}>Restart</button>
//       <Form ref={form} />
//     </div>
//   );
// }

// display a toast after time with createPortal

// import Toast from './Toast';
// import React from 'react'


// function App() {
    
//     const [visible, setIsVisible] = React.useState(false)
//   function handleEnrol() {
//     setIsVisible(true)

//     setTimeout(() => {
//      setIsVisible(false)
//     }, 3000);
//   }

//   return (
//     <div id="app">
//       {/* Todo: Render <Toast /> component (conditionally) here */}
//           {visible && <Toast message="Enrolled successfully!"/>}

//       <article>
//         <h2>React Course</h2>
//         <p>
//           A course that teaches you React from the ground up and in great depth!
//         </p>
//         <button onClick={handleEnrol}>Enrol</button>
//       </article>
//     </div>
//   );
// }

// export default App;


// import ReactDOM from 'react-dom'

// export default function Toast({ message }) {
//   return ReactDOM.createPortal(
//       <body>
//     <aside className="toast" data-testid="toast">
//       <p>{message}</p>
//     </aside>
//     </body>,
//     document.querySelector('body')
//   );
// }
