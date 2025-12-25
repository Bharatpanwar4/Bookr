import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/lib/ui/button";
import EventCard from "@/src/common/EventCard";
import { createLocationSlug } from "@/src/utils/location-slug";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const LocalEvent = ({
  events,
  onClick,
  user,
}: {
  events: Doc<"events">[];
  onClick: (value: string) => void;
  user: Doc<"users"> | any;
}) => {
  const router = useRouter();
  const handleViewLocalEvents = () => {
    const city = user?.location?.city || "Gurugram";
    const state = user?.location?.state || "Haryana";
    const slug = createLocationSlug(city, state);
    router.push(`/explore/${slug}`);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">Events Near You</h2>
          <p className="text-muted-foreground">
            Happening in {user?.location?.city || "your area"}
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleViewLocalEvents}
        >
          View All <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events?.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            variant="compact"
            onClick={() => onClick(event.slug)}
          />
        ))}
      </div>
    </div>
  );
};

export default LocalEvent;
