import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 576 },
    items: 8,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 6,
  },
};

export default function ScrollableBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      containerClass='w-full'
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
}
