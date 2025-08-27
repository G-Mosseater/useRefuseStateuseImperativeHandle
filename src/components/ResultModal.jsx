import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({
  targetTime,
  remainingTime,
  ref,
  onReset,
}) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  //use forwardRef for react < 19
  return createPortal(
    
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <p>You lost</p>}
      {!userLost && <h2>Your score {score}</h2>}
      <p>Target time was {targetTime} seconds</p>
      <p>You stopped the timer with {formattedRemainingTime} seconds left.</p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
      document.getElementById('modal')

  );
}
