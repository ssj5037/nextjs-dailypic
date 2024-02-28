type Color = 'primary' | 'danger';

export default function DPButton({
  onClick,
  className,
  color = 'primary',
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  color?: Color;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center gap-2 p-2 font-semibold text-white transition-all rounded ${ColorCss(color)} ${className}`}
    >
      {children}
    </button>
  );
}

function ColorCss(color: Color): string {
  switch (color) {
    case 'danger':
      return 'bg-red-400 hover:bg-red-300';
    case 'primary':
    default:
      return 'bg-orange-500 hover:bg-orange-300';
  }
}
