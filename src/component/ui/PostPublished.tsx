import { format } from 'timeago.js';
import { register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

type Props = {
  date: string | Date;
};

export default function PostPublished({ date }: Props) {
  register('ko', koLocale);
  return <span className='text-xs text-gray-500'>{format(date, 'ko')}</span>;
}
