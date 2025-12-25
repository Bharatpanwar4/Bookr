import { Doc } from "@/convex/_generated/dataModel";
import { Badge } from "@/lib/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/ui/carousel";
import { format } from "date-fns";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const FeaturedEvent = ({
  events,
  onClick,
}: {
  events: Doc<"events">[] | undefined;
  onClick: (value: string) => void;
}) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {events?.map((event: any) => (
            <CarouselItem key={event._id}>
              <div
                className="relative h-100 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => onClick(event.slug)}
              >
                {event.coverImage ? (
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: event.themeColor }}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/30" />
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                  <Badge className="w-fit mb-4" variant="secondary">
                    {event?.city}, {event?.state || event?.country}
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                    {event?.title}
                  </h2>
                  <p className="text-lg text-white/90 mb-4 max-w-2xl line-clamp-2">
                    {event?.description}
                  </p>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {format(event?.startDate, "PPP")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event?.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">
                        {event?.registrationCount} registered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default FeaturedEvent;
