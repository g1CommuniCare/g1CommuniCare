import React from "react"
import { useState } from "react"

export default function AlertIconsDanger() {
    const [dismiss, setDismiss] = useState(false)
  return (
    <>
      {/*<!-- Component: Danger Alert With Icon --> */}
      <div
        className="flex w-full items-start gap-4 rounded border border-pink-100 bg-pink-50 px-4 py-2 mb-5 text-sm text-pink-500"
        role="alert"
      >
        {/*  <!-- Icon --> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          role="graphics-symbol"
          aria-labelledby="title-04 desc-04"
        >
          <title id="title-04">Icon title</title>
          <desc id="desc-04">A more detailed description of the icon</desc>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {/*  <!-- Text --> */}
        <p>Invalid Login Credentials. Try Again!</p>
        
      </div>
      {/*<!-- End Danger Alert With Icon --> */}
    </>
  )
}
