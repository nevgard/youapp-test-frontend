"use client";

import SectionAbout from "@/components/about/section-about";
import Header from "@/components/header";
import SectionInterests from "@/components/interests/section-interests";
import SummarySection from "@/components/summary/section-summary";
import { useGetProfile } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const {
    data: dataProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfile();

  if (isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (isProfileError) {
    Cookies.remove("TokenX");
  }
  
  return (
    <div className="min-h-screen bg-dark space-y-4">
      <Header url={"/profile"} username={dataProfile?.username} BackButton={true} />
      <SummarySection dataProfile={dataProfile} />
      <SectionAbout
        dataProfile={dataProfile}
        isProfileLoading={isProfileLoading}
        isProfileError={isProfileError}
      />
      <SectionInterests dataProfile={dataProfile} />
    </div>
  );
}
