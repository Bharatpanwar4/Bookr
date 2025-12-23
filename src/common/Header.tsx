"use client";
import Image from "next/image";
import { logoIcon } from "../utils/image";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/lib/ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { useStoreUser } from "../hooks/useStoreUserEffect";
import { BarLoader } from "react-spinners";
import { useState } from "react";
import { Building, Plus, Ticket } from "lucide-react";
import Logo from "./Logo";
const Header = () => {
  const { isLoading } = useStoreUser();
  const [showUpgradeModel, setShowUpgradeModel] = useState(false);
  return (
    <>
      <nav className="fixed top-0 right-0 left-0    backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo */}
          <Link href={"/"} className="flex items-center">
            {/* <Image
              src={logoIcon}
              className="w-fit h-11"
              width={500}
              height={500}
              priority
              alt="logo"
            /> */}

            <Logo />
          </Link>

          {/* serch */}

          {/* right side action */}
          <div className="flex items-center">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setShowUpgradeModel(true)}
            >
              Pricing
            </Button>

            <Button variant="ghost" size="sm" asChild className={"mr-2"}>
              <Link href="/explore">Explore</Link>
            </Button>

            <Authenticated>
              {/* Create Event Button */}
              <Button size="sm" asChild className="flex gap-2 mr-4">
                <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Link>
              </Button>
              {/* User Button */}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />
                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </div>

        {/* loader */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7" />
          </div>
        )}
      </nav>

      {/* models */}
    </>
  );
};

export default Header;
