interface Props {
  className?: string;
}

export default function Logo({ className = "text-2xl" }: Props) {
  return (
    <span className={`font-bold tracking-tight font-display ${className}`}>
      <span className="text-dark-heading">a</span>
      <span className="text-brand">B</span>
      <span className="text-brand">r</span>
      <span className="text-brand">a</span>
      <span className="text-brand">n</span>
      <span className="text-brand">d</span>
      <span className="text-dark-heading">r</span>
    </span>
  );
}
