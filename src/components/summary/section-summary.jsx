import { ageCalculate } from "@/lib/ageCalculate";

export default function SummarySection({ dataProfile }) {
  const imageProfile = localStorage.getItem("profileImage");
  console.log(imageProfile);

  return (
    <div className="px-4">
      <div
        className="bg-[#162329] rounded-2xl flex flex-col justify-end shadow-lg p-6 w-full h-72 max-w-md"
        style={{
          ...(imageProfile
            ? {
                backgroundImage: `url(${imageProfile})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {
                backgroundColor: "#162329",
              }),
        }}
      >
        {dataProfile?.username && (
          <h1 className="text-xl font-bold text-white">
            @{dataProfile?.username}, {ageCalculate(dataProfile?.birthday)}
          </h1>
        )}
        {dataProfile?.gender && (
          <p className="text-white font-semibold mt-3">
            {dataProfile?.gender || "Male"}
          </p>
        )}
        {dataProfile?.horoscope && dataProfile?.zodiac && (
          <div className="flex  space-x-2 mt-3">
            <span className="px-6 py-2 rounded-full bg-[#181c1a] text-white font-bold">
              {dataProfile?.horoscope}
            </span>
            <span className="px-6 py-2 rounded-full bg-[#181c1a] text-white font-bold">
              {dataProfile?.zodiac}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
