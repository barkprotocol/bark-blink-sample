import * as React from "react";
import { cn } from "@/lib/utils";

// Card component with customizable className
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-md transition-shadow duration-300 hover:shadow-lg",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// CardHeader component for card header section
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6 border-b border-border",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// CardTitle component for card title section
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-tight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// CardDescription component for card description section
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// CardContent component for the main content of the card
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6",
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

// CardFooter component for card footer section
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6 border-t border-border flex items-center justify-end",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Export all card components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
