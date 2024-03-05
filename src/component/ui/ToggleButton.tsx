type Props = {
  toggled: boolean;
  onToggled: (toggled: boolean) => void;
  fillIcon: React.ReactNode;
  icon: React.ReactNode;
  title: string;
};
export default function ToggleButton({
  toggled,
  onToggled,
  fillIcon,
  icon,
  title,
}: Props) {
  return (
    <button
      aria-label={title}
      type='button'
      onClick={() => onToggled(!toggled)}
    >
      {toggled ? fillIcon : icon}
    </button>
  );
}
