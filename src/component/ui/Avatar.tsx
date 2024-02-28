type Size = 'small' | 'large' | 'xLarge';

export default function Avatar({
  highlight = false,
  size = 'small',
  image,
}: {
  highlight?: boolean;
  size?: Size;
  image: string;
}) {
  return (
    <div
      className={`rounded-full
            ${highlight && `border-2 border-orange-500`}
            ${SizeCss(size)}
            `}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`유저 프로필 이미지`}
        className={`rounded-full w-full h-full object-cover
              ${highlight && 'border-2 border-white'}`}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

function SizeCss(size: Size): string {
  switch (size) {
    case 'xLarge':
      return 'w-40 h-40';
    case 'large':
      return 'w-14 h-14';
    case 'small':
    default:
      return 'w-10 h-10';
  }
}
