import HeroSection from "@/components/hero/HeroSection";
import WhatAreWe from "@/components/sections/WhatAreWe";
import WhyWeExist from "@/components/sections/WhyWeExist";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatStudentsDo from "@/components/sections/WhatStudentsDo";
import WhatStudentsGet from "@/components/sections/WhatStudentsGet";
import MemberJourney from "@/components/sections/MemberJourney";
import ProjectSystem from "@/components/sections/ProjectSystem";
import ClientSystem from "@/components/sections/ClientSystem";
import CommunityFlywheel from "@/components/sections/CommunityFlywheel";

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <WhatAreWe />
      <WhyWeExist />
      <HowItWorks />
      <WhatStudentsDo />
      <WhatStudentsGet />
      <MemberJourney />
      <ProjectSystem />
      <ClientSystem />
      <CommunityFlywheel />
    </div>
  );
}
