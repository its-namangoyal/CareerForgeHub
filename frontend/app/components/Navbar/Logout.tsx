import React from "react";

export default function Logout() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:pr-0">
      <div className="hidden lg:block">
        <button
          type="button"
          className="text-lg text-Blueviolet font-medium"
          onClick={(e) => {
            e.preventDefault();
            console.log("clicked logout");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
