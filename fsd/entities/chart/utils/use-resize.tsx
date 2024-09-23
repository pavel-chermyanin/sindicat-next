import { useEffect } from 'react';

export const useResize = (onResize: () => void) => {
  useEffect(() => {
    // Function to handle resize
    const handleResize = () => {
      onResize(); // Call the provided onResize function
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onResize]); // Effect depends on the onResize function
};
