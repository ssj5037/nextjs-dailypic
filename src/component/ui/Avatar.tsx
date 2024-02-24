export default function Avatar({
  highlight = false,
  size = 'small',
  image,
}: {
  highlight?: boolean;
  size?: 'small' | 'large';
  image: string;
}) {
  return (
    <div
      className={`rounded-full
            ${highlight && 'border-2 border-orange-500'}
            ${size === 'small' ? 'w-10 h-10' : 'w-14 h-14'}
            `}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={`유저 프로필 이미지`}
        className={`rounded-full w-full h-full object-cover
              ${highlight && 'border border-white'}`}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
