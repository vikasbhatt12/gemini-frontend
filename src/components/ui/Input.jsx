// src/components/ui/Input.jsx
import React from 'react'; // Import React
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Wrap the component in forwardRef
export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref} // Attach the ref here
      className={twMerge(
        clsx(
          'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:ring-offset-gray-950 dark:placeholder:text-gray-400',
          className
        )
      )}
      {...props}
    />
  );
});