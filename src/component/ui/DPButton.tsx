export default function DPButton({
  onClick,
  className,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center gap-2 p-2 font-semibold text-white transition-all bg-orange-400 rounded hover:bg-orange-300 ${className}`}
    >
      {children}
    </button>
  );
}
