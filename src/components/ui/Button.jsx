import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function Button({ className, ...props }) {
  return (
    <button
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
          'bg-blue-600 text-white hover:bg-blue-600/90 h-10 px-4 py-2',
          className
        )
      )}
      {...props}
    />
  );
}