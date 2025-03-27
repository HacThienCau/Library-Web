import React from "react";

const UserInfo = ({ name, email }) => {
  return (
    <article className="flex gap-3 items-center flex-[1_0_0] max-sm:flex-col max-sm:items-center max-sm:text-center">
      <div>
        <svg
          width="119"
          height="119"
          viewBox="0 0 119 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="profile-avatar"
        >
          <mask
            id="mask0_84_13460"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="119"
            height="119"
          >
            <circle cx="59.5" cy="59.5" r="59.5" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_84_13460)">
            <rect width="119" height="119" fill="url(#pattern0_84_13460)" />
          </g>
          <defs>
            <pattern
              id="pattern0_84_13460"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_84_13460"
                transform="matrix(0.00297585 0 0 0.00307184 -0.091994 -1.44246)"
              />
            </pattern>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col gap-3 max-sm:items-center">
        <h1 className="text-2xl font-bold text-neutral-900">{name}</h1>
        <p className="text-lg text-neutral-900 text-opacity-50">{email}</p>
      </div>
    </article>
  );
};

export default UserInfo;
