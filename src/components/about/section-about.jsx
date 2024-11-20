import { useCreateProfile, useUpdateProfile } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProfileCard from "../profile/profile-card";
import EditAboutForm from "./edit-about";

export default function SectionAbout({ dataProfile, isProfileLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthday: null,
    height: 0,
    weight: 0,
    horoscope: "",
    zodiac: "",
  });

  const createProfileMutation = useCreateProfile();
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (dataProfile) {
      setFormData({
        name: dataProfile.name || "",
        gender: dataProfile.gender || "",
        birthday: dataProfile.birthday || null,
        height: dataProfile.height || 0,
        weight: dataProfile.weight || 0,
        horoscope: dataProfile.horoscope || "",
        zodiac: dataProfile.zodiac || "",
      });
    }
  }, [dataProfile]);

  const validateFormData = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.gender.trim()) return "Gender is required";
    if (!formData.birthday) return "Birthday is required";
    if (formData.height <= 0) return "Height must be a positive number";
    if (formData.weight <= 0) return "Weight must be a positive number";
    return null;
  };

  const handleSave = async () => {
    const validationError = validateFormData();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const mutation = dataProfile?.name
      ? updateProfileMutation
      : createProfileMutation;
    const successMessage = dataProfile?.name
      ? "Profile updated successfully!"
      : "Profile created successfully!";
    const payload = {
      name: formData.name.trim(),
      gender: formData.gender.trim(),
      birthday: formData.birthday,
      height: Number(formData.height),
      weight: Number(formData.weight),
      interests: [],
    };

    try {
      await mutation.mutateAsync(payload);
      toast.success(successMessage, { duration: 500 });
      setIsEditing(false);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to save profile. Please try again.";
      toast.error(message);
    }
  };

  if (isProfileLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4">
      <div className="bg-primary rounded-2xl px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-md font-semibold text-white">About</p>
            <div
              className="cursor-pointer"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            >
              {isEditing ? (
                <p className="text-gold text-sm font-semibold">
                  Save & Update
                </p>
              ) : (
                <img src="/edit-2.png" className="w-5 h-5" alt="Edit" />
              )}
            </div>
          </div>
          {isEditing ? (
            <EditAboutForm setFormData={setFormData} formData={formData} />
          ) : (
            <ProfileCard dataProfile={dataProfile} />
          )}
        </div>
      </div>
    </div>
  );
}
