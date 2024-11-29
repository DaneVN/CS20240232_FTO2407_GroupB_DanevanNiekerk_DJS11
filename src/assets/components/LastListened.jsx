import React from "react";
import placeholder from "../images/placeholder-show-banner.jpg";

//eslint-disable-next-line
function LastListened({ description }) {
  const [isExpanded, setIsExpanded] = React.useState(false); // Toggle expanded state
  const [isOverflowing, setIsOverflowing] = React.useState(false); // Check if text overflows
  const descriptionRef = React.useRef(null); // Reference to the description element

  // Check for overflow after the component renders
  React.useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [description]);

  return (
    // Width caps out between w-28 and w-32???
    <div className="bg-lime-500 rounded-lg p-4 flex flex-col gap-4 items-center shrink-0 w-[75%] sm:w-[25%]">
      <div className="relative">
        <img
          className="rounded-lg w-4/6 m-auto"
          src={placeholder}
          alt="show banner/cover"
        />
      </div>
      <div className="flex flex-col items-center gap-3 text-lime-950 font-semibold">
        <h3 className="font-extrabold">Title</h3>
        <div className="flex justify-between gap-2 flex-wrap sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-1 items-center italic m-auto">
            <p id="timestamp">00:00</p>
            <p>S1 Ep4</p>
          </div>
          <p
            ref={descriptionRef}
            className={`w-[70%] m-auto text-sm transition-all ${
              isExpanded ? "line-clamp-none" : "line-clamp-3"
            }`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          {/* Toggle Button */}
          {isOverflowing && (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="w-content m-auto text-green-950 font-extrabold italic mt-2"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LastListened;
