"use client";

import { api } from "@/convex/_generated/api";

import { useConvexQuery } from "@/src/hooks/use-convex-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/lib/ui/button";
import { Card } from "@/lib/ui/card";
import PopularEvent from "./components/PopularEvent";
import LocalEvent from "./components/LocalEvent";
import Categories from "./components/Categories";
import FeaturedEvent from "./components/FeaturedEvent";
import { memo } from "react";
const ExploreScreen = () => {
  const router = useRouter();
  const { data: currentUser } = useConvexQuery<Doc<"users">>(
    api.users.getCurrentUser
  );
  const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery<
    Doc<"events">[]
  >(api.explore.getFeaturedEvents, { limit: 3 });
  const { data: localEvents, isLoading: loadingLocal } = useConvexQuery<
    Doc<"events">[]
  >(api.explore.getEventsByLocation, {
    city: currentUser?.location?.city || "Gurugram",
    state: currentUser?.location?.state || "Hariyana",
    limit: 4,
  });
  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery<
    Doc<"events">[]
  >(api.explore.getPopularEvents, { limit: 6 });

  const { data: categoryCounts } = useConvexQuery<Doc<"events">>(
    api.explore.getCategoryCounts
  );

  const handleEventClick = (slug: string) => {
    router.push(`/events/${slug}`);
  };

  // Loading state
  const isLoading = loadingFeatured || loadingLocal || loadingPopular;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16">
      {/* hero section */}
      <div className=" text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore featured events, find what&apos;s happening locally, or browse
          events across India
        </p>
      </div>

      {/* Featured Carousel */}
      {featuredEvents && Number(featuredEvents?.length) > 0 && (
        <FeaturedEvent events={featuredEvents} onClick={handleEventClick} />
      )}

      {/* Local Events */}
      {localEvents && Number(localEvents?.length) > 0 && (
        <LocalEvent
          events={localEvents}
          onClick={handleEventClick}
          user={currentUser}
        />
      )}

      {/* Browse by Category */}
      <Categories categoryCounts={categoryCounts} />

      {/* Popular Events Across Country */}
      {popularEvents && Number(popularEvents?.length) > 0 && (
        <PopularEvent events={popularEvents} onClick={handleEventClick} />
      )}

      {/* Empty State */}
      {!loadingFeatured &&
        !loadingLocal &&
        !loadingPopular &&
        (!featuredEvents || Number(featuredEvents?.length) === 0) &&
        (!localEvents || Number(localEvents.length) === 0) &&
        (!popularEvents || Number(popularEvents.length) === 0) && (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold">No events yet</h2>
              <p className="text-muted-foreground">
                Be the first to create an event in your area!
              </p>
              <Button asChild className="gap-2">
                <a href="/create-event">Create Event</a>
              </Button>
            </div>
          </Card>
        )}
    </div>
  );
};

export default memo(ExploreScreen);
