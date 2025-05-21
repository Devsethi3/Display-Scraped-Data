"use client";

import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventCategory, SortOption } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface EventFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: EventCategory;
  setCategory: (category: EventCategory) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
}

export function EventFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sortBy,
  setSortBy,
}: EventFiltersProps) {
  const handleClearFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setSortBy("upcoming");
  };

  const categories: EventCategory[] = [
    "All",
    "Music",
    "Arts",
    "Sports",
    "Food",
    "Nightlife",
    "Family",
    "Comedy",
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "upcoming", label: "Upcoming" },
    { value: "newest", label: "Recently Added" },
    { value: "popular", label: "Popular" },
  ];

  return (
    <div className="bg-background sticky top-[72px] z-30 border-b py-4">
      <div className="container">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex container items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as EventCategory)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchTerm || category !== "All" || sortBy !== "upcoming") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-muted-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="ml-auto flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] sm:h-[50vh] container">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down events to find exactly what you're looking for.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={category}
                      onValueChange={(value) =>
                        setCategory(value as EventCategory)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort by</label>
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as SortOption)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                  >
                    Reset Filters
                  </Button>
                  <SheetTrigger asChild>
                    <Button>Apply Filters</Button>
                  </SheetTrigger>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}