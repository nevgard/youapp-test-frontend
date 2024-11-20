"use client";

import dayjs from "dayjs";

export default function ProfileCard({ dataProfile }) {
  if (!dataProfile?.name) {
    return (
      <p className="mt-6 text-accent text-sm w-[90%]">
        Add in your your to help others know you better
      </p>
    );
  }

  const age = dayjs().year() - dayjs(dataProfile?.birthday).year() || 0;

  return (
    <div className="">
      {dataProfile?.birthday && (
        <div className="mt-4 flex space-x-1">
          <h3 className="text-neutral-500 text-sm font-semibold">Birthday:</h3>
          <p className="text-white text-sm font-semibold">
            {dayjs(dataProfile?.birthday).format("DD/MM/YYYY")} (Age {age})
          </p>
        </div>
      )}

      {dataProfile?.horoscope && (
        <div className="mt-4 flex space-x-1">
          <h3 className="text-neutral-500 text-sm font-semibold">Horoscope:</h3>
          <p className="text-white text-sm font-semibold">
            {dataProfile?.horoscope}
          </p>
        </div>
      )}

      {dataProfile?.zodiac && (
        <div className="mt-4 flex space-x-1">
          <h3 className="text-neutral-500 text-sm font-semibold">Zodiac:</h3>
          <p className="text-white text-sm font-semibold">
            {dataProfile?.zodiac}
          </p>
        </div>
      )}
      {dataProfile?.height && (
        <div className="mt-4 flex space-x-1">
          <h3 className="text-neutral-500 text-sm font-semibold">Zodiac:</h3>
          <p className="text-white text-sm font-semibold">
            {dataProfile?.height} cm
          </p>
        </div>
      )}
      {dataProfile?.weight && (
        <div className="mt-4 flex space-x-1">
          <h3 className="text-neutral-500 text-sm font-semibold">Zodiac:</h3>
          <p className="text-white text-sm font-semibold">
            {dataProfile?.weight} kg
          </p>
        </div>
      )}
    </div>
  );
}
