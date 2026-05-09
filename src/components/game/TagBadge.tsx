interface TagBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export function TagBadge({ children, variant = "default" }: TagBadgeProps) {
  const baseClasses = "px-3 py-1 font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
  const variantClasses = variant === "default"
    ? "bg-black border border-purple-900/80 text-white"
    : "bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT"

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {children}
    </span>
  )
}