import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SydneyEvents</h3>
            <p className="text-muted-foreground text-sm">
              Discover all the amazing events happening in Sydney, Australia.
              From concerts to exhibitions, find the perfect event for your
              interests.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigate</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/venues"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Saved Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/?category=Music"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Arts"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Arts
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Sports"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Food"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Food & Drink
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Family"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Family
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SydneyEvents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
