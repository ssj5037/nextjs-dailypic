import dynamic from 'next/dynamic';

const SyncLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.SyncLoader),
  { ssr: false }
);

export default function SyncSpinner() {
  return <SyncLoader color='red' size={8} speedMultiplier={0.7} />;
}
