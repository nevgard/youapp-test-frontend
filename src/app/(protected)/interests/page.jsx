"use client";
import Header from "@/components/header";
import { useGetProfile, useUpdateProfile } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InterestsPage() {
  const [interests, setInterests] = useState([ ]);
  const [inputValue, setInputValue] = useState("");

  const mutationUpdateProfile = useUpdateProfile();
  const { data: dataProfile } = useGetProfile();
    useEffect(() => {
      if (dataProfile) {
        setInterests(dataProfile.interests);
      }
    }, [dataProfile]);
  console.log(interests);
  console.log(dataProfile)

  const handleSave = async () => {
    if (interests.length === 0) {
      toast.error("Please add at least one interest.");
      return;
    }
    try {
      await mutationUpdateProfile.mutateAsync({ 
        name: dataProfile.name,
        gender: dataProfile.gender,
        birthday: dataProfile.birthday,
        height: dataProfile.height,
        weight: dataProfile.weight,
        interests: interests
       });
      toast.success("Interest updated successfully!");
    } catch (error) {
      toast.error("Failed to update interest. Please try again.");
      console.error(error);
    }
  };

  const addInterest = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (!interests.includes(inputValue.trim())) {
        setInterests([...interests, inputValue.trim()]);
      } else {
        toast.message("Interest already exists!"); 
      }
      setInputValue("");
    }
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };
  return (
    <>
      <Header url={"/profile"} BackButton={true} SaveButton={true} handleSave={handleSave} />
      <div className="mt-12 p-6">
        <h1 className="text-gold font-bold text-md">
          Tell everyone about yourself
        </h1>
        <h1 className="font-bold text-white text-xl mt-2">What interest you ?</h1>
        <div className="bg-[#D9D9D90F] p-4 rounded-lg max-w-md mx-auto mt-8">
          <div className="flex flex-wrap items-center gap-2">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center px-2 py-1 bg-[#FFFFFF1A]  rounded-md shadow"
              >
                <span className="text-white text-xs font-semibold">
                  {interest}
                </span>
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-2 text-gray-300 hover:text-white focus:outline-none"
                >
                  ×
                </button>
              </div>
            ))}

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={addInterest}
              className="flex-grow min-w-[120px] text-sm text-white bg-transparent focus:outline-none "
            />
          </div>
        </div>
      </div>
    </>
  );
}
