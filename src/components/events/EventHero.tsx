import Image from "next/image";
import { Button } from "@/components/ui/button";

interface EventHeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
  // imageSrc?: string;
}

export function EventHero({
  title,
  subtitle,
  ctaText,
  ctaAction,
  // imageSrc = "https://images.pexels.com/photos/1635086/pexels-photo-1635086.jpeg",
}: EventHeroProps) {
  return (
    <div className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Background image with overlay */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Sydney skyline"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
      </div> */}

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-8 text-lg text-black/80 md:text-xl">{subtitle}</p>
          )}
          {ctaText && ctaAction && (
            <Button onClick={ctaAction} size="lg" className="px-8">
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
