type Color = 'primary' | 'danger';

export default function DPButton({
  type = 'button',
  onClick,
  className,
  color = 'primary',
  children,
  disabled = false,
}: {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  color?: Color;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center gap-2 p-2 font-semibold text-white transition-all rounded disabled:opacity-50 ${ColorCss(color)} ${className}`}
    >
      {children}
    </button>
  );
}

function ColorCss(color: Color): string {
  switch (color) {
    case 'danger':
      return 'bg-red-400 hover:bg-red-300 disabled:hover:bg-red-400';
    case 'primary':
    default:
      return 'bg-orange-500 hover:bg-orange-300 disabled:hover:bg-orange-500';
  }
}
