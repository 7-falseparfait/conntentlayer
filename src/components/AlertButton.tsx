"use client";

import { useState } from "react";

export default function AlertButton() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    alert(`You clicked me ${count + 1} time(s)!`);
  };

  return (
    <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Interactive Demo</h3>
      <p className="mb-4 text-gray-700">
        This button is a React component inside MDX! Click count:{" "}
        <strong>{count}</strong>
      </p>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Click Me!
      </button>
    </div>
  );
}
