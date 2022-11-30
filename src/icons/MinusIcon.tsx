import { IconProps } from './types';

export const MinusIcon = ({
  width = '15',
  height = '4',
  viewBox = '0 0 15 4',
  fill = 'black',
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.79004 3.08594H13.7017C14.2661 3.08594 14.7559 2.60449 14.7559 2.01514C14.7559 1.43408 14.2661 0.944336 13.7017 0.944336H1.79004C1.24219 0.944336 0.73584 1.43408 0.73584 2.01514C0.73584 2.60449 1.24219 3.08594 1.79004 3.08594Z"
        fill={fill}
      />
    </svg>
  );
};
