import React from "react";

const UploadButton = () => {
  return (
    <button className="flex gap-2 items-center p-1.5 rounded-md cursor-pointer bg-slate-300 h-[29px] w-fit max-sm:w-full">
      <span>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="upload-icon"
        >
          <mask
            id="mask0_404_1917"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="1"
            y="6"
            width="14"
            height="10"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.3335 6.36279H14.6666V15.5255H1.3335V6.36279Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_404_1917)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7102 15.5255H4.29016C2.66016 15.5255 1.3335 14.1995 1.3335 12.5688V9.31879C1.3335 7.68879 2.66016 6.36279 4.29016 6.36279H4.91216C5.18816 6.36279 5.41216 6.58679 5.41216 6.86279C5.41216 7.13879 5.18816 7.36279 4.91216 7.36279H4.29016C3.21083 7.36279 2.3335 8.24013 2.3335 9.31879V12.5688C2.3335 13.6481 3.21083 14.5255 4.29016 14.5255H11.7102C12.7888 14.5255 13.6668 13.6481 13.6668 12.5688V9.31279C13.6668 8.23746 12.7922 7.36279 11.7175 7.36279H11.0888C10.8128 7.36279 10.5888 7.13879 10.5888 6.86279C10.5888 6.58679 10.8128 6.36279 11.0888 6.36279H11.7175C13.3435 6.36279 14.6668 7.68613 14.6668 9.31279V12.5688C14.6668 14.1995 13.3402 15.5255 11.7102 15.5255Z"
              fill="#05296A"
            />
          </g>
          <mask
            id="mask1_404_1917"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="7"
            y="1"
            width="2"
            height="10"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.5 1.8335H8.5V10.8608H7.5V1.8335Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask1_404_1917)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 10.8608C7.724 10.8608 7.5 10.6368 7.5 10.3608V2.3335C7.5 2.0575 7.724 1.8335 8 1.8335C8.276 1.8335 8.5 2.0575 8.5 2.3335V10.3608C8.5 10.6368 8.276 10.8608 8 10.8608Z"
              fill="#05296A"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.05648 4.78601C5.92914 4.78601 5.80114 4.73734 5.70381 4.64001C5.50848 4.44534 5.50714 4.12934 5.70248 3.93334L7.64581 1.98134C7.83314 1.79268 8.16648 1.79268 8.35381 1.98134L10.2978 3.93334C10.4925 4.12934 10.4918 4.44534 10.2965 4.64001C10.1005 4.83468 9.78448 4.83468 9.58981 4.63868L7.99981 3.04268L6.41048 4.63868C6.31314 4.73734 6.18448 4.78601 6.05648 4.78601Z"
            fill="#05296A"
          />
        </svg>
      </span>
      <span className="overflow-hidden text-sm whitespace-nowrap text-blue-950 text-ellipsis">
        Tải ảnh lên
      </span>
    </button>
  );
};

export default UploadButton;
