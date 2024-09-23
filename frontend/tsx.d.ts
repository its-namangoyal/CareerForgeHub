import 'react';

declare module 'react' {
  // Define the types for your custom components here
  interface IntrinsicElements {
    // Example: 'div' is a JSX intrinsic element
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    // Add other custom components as needed
  }
}
