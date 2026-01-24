import Hero from "@/components/home/ui/home/Hero";
import Highlights from "@/components/home/ui/home/Highlights";
import ClubWorks from "@/components/home/ui/home/ClubWorks";
import ClubStats from "@/components/home/ui/home/ClubStats";
import UpcomingEvents from "@/components/home/ui/home/UpcomingEvents";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full flex flex-col text-white">
      <div className="flex flex-col w-full">
        <Hero />
        <Highlights />
        <ClubWorks />
        <ClubStats />
        <UpcomingEvents />
      </div>
    </main>
  );
}
