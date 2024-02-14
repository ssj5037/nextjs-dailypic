export default function MyPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <h2>{slug}</h2>;
}
