import { Doc } from "@/convex/_generated/dataModel";
import EventCard from "@/src/common/EventCard";

const PopularEvent = ({
  events,
  onClick,
}: {
  events: Doc<"events">[];
  onClick: (value: string) => void;
}) => {
  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-1">Popular Across India</h2>
        <p className="text-muted-foreground">Trending events nationwide</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events?.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            variant="list"
            onClick={() => onClick(event?.slug)}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularEvent;
