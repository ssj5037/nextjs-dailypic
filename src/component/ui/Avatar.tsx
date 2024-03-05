type Size = 'small' | 'large' | 'xLarge' | 'xxLarge';

export default function Avatar({
  highlight = false,
  size = 'small',
  image = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2541ojSCeQBTkI8zNTBlDq&ust=1709552796369000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiJjs2C2IQDFQAAAAAdAAAAABAE',
}: {
  highlight?: boolean;
  size?: Size;
  image?: string;
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
    case 'xxLarge':
      return 'w-40 h-40';
    case 'xLarge':
      return 'w-20 h-20';
    case 'large':
      return 'w-14 h-14';
    case 'small':
    default:
      return 'w-10 h-10';
  }
}
