import { IconProps } from './types';

export const PlusIcon = ({
  width = '15',
  height = '16',
  viewBox = '0 0 15 16',
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
        d="M0.227539 8.00684C0.227539 8.59619 0.717285 9.07764 1.29834 9.07764H6.1792V13.9585C6.1792 14.5479 6.66064 15.0293 7.25 15.0293C7.83936 15.0293 8.3208 14.5479 8.3208 13.9585V9.07764H13.2017C13.791 9.07764 14.2725 8.59619 14.2725 8.00684C14.2725 7.41748 13.791 6.93604 13.2017 6.93604H8.3208V2.05518C8.3208 1.47412 7.83936 0.984375 7.25 0.984375C6.66064 0.984375 6.1792 1.47412 6.1792 2.05518V6.93604H1.29834C0.717285 6.93604 0.227539 7.41748 0.227539 8.00684Z"
        fill={fill}
      />
    </svg>
  );
};
