import { UserpagePostType } from '@/models/post';

type Props = {
  type: UserpagePostType;
  setType: React.Dispatch<React.SetStateAction<UserpagePostType>>;
};

const BUTTON_CSS =
  'px-10 py-3 w-full border-t-2 text-center md:w-40 hover:bg-neutral-50';
const ACTIVE_CSS = ' border-orange-500 text-orange-500 font-bold';

const UserpagePostTypeList: UserpagePostType[] = [
  'posts',
  'likes',
  'bookmarks',
];

export default function UserpageMenu({ type, setType }: Props) {
  return (
    <div className='border-t flex justify-center'>
      {UserpagePostTypeList.map((typeItem) => (
        <button
          key={typeItem}
          type='button'
          onClick={() => setType(typeItem)}
          className={
            type === typeItem
              ? BUTTON_CSS + ACTIVE_CSS
              : `${BUTTON_CSS} border-white`
          }
        >
          {typeItem}
        </button>
      ))}
    </div>
  );
}
