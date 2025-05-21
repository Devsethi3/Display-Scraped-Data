"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CalendarDays, Search, Menu, X, Map, Heart, Info } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      href: "/",
      label: "Events",
      icon: <CalendarDays className="h-4 w-4 mr-2" />,
    },
    {
      href: "/venues",
      label: "Venues",
      icon: <Map className="h-4 w-4 mr-2" />,
    },
    {
      href: "/saved",
      label: "Saved",
      icon: <Heart className="h-4 w-4 mr-2" />,
    },
    { href: "/about", label: "About", icon: <Info className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b h-16"
          : "bg-transparent h-20"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SydneyEvents</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {searchOpen ? (
            <div className="relative flex items-center w-64 mr-2">
              <Input
                type="text"
                placeholder="Search events..."
                className="pr-8"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
              <X
                className="absolute right-2 h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <div className="relative mb-6">
                    <Input type="text" placeholder="Search events..." />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "px-3 py-4 rounded-md text-base font-medium flex items-center transition-colors",
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="mt-auto pb-6">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
