import Link from "next/link";

export default function SectionInterests({ dataProfile }) {
  return (
    <div className="px-4">
      <div className="bg-primary rounded-2xl flex flex-col justify-end p-6 w-full max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="text-md font-semibold text-white">Interests</h1>
          <Link href="/interests">
            <img src="/edit-2.png" className="w-5 h-5" alt="Edit" />
          </Link>
        </div>
        <div className="mt-4 flex justify-start items-center space-x-2">
          {dataProfile.interests.length > 0 ? (
            dataProfile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-secondary text-white text-center text-sm rounded-full px-4 py-2 font-semibold "
              >
                {interest}
              </span>
            ))
          ) : (
            <div className="mt-4">
              <p className="text-accent text-sm">
                Add in your interest to find a better match
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
