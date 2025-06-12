import { Button } from "./button";
import { ButtonProps } from "../hero-section/animated-hero-button";

interface WetroButtonProps extends ButtonProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}

export function WetroButton({ 
  children = "Generate",
  isLoading = false,
  className,
  ...props 
}: WetroButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={`
        relative h-12 px-6 mt-3 text-base font-medium rounded-lg
        transition-all duration-200 ease-out
        bg-gradient-to-r from-blue-600 to-blue-500
        dark:from-blue-500 dark:to-blue-400
        hover:from-blue-500 hover:to-blue-400
        dark:hover:from-blue-400 dark:hover:to-blue-300
        text-white dark:text-white
        shadow-lg shadow-blue-500/20 dark:shadow-blue-400/20
        hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/30
        disabled:opacity-70 disabled:cursor-not-allowed
        disabled:hover:shadow-lg disabled:hover:from-blue-600 disabled:hover:to-blue-500
        dark:disabled:hover:from-blue-500 dark:disabled:hover:to-blue-400
        overflow-hidden
        ${className || ''}
      `}
      {...props}
    >
      <span className="relative z-10">
        {isLoading ? "Loading..." : children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 dark:from-blue-300 dark:to-blue-200 opacity-0 hover:opacity-20 transition-opacity duration-200" />
    </Button>
  );
}
