type Props = {
  toggled: boolean;
  onToggled: (toggled: boolean) => void;
  fillIcon: React.ReactNode;
  icon: React.ReactNode;
};
export default function ToggleButton({
  toggled,
  onToggled,
  fillIcon,
  icon,
}: Props) {
  return (
    <button type='button' onClick={() => onToggled(!toggled)}>
      {toggled ? fillIcon : icon}
    </button>
  );
}
