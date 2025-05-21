"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTicketModal } from "@/hooks/use-ticket-modal";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/utils";

// Update the form schema to make types explicit
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  marketingOptIn: z.boolean().default(false),
});

// Define the form value type explicitly from the schema
type FormValues = z.infer<typeof formSchema>;

export function TicketModal() {
  const { event, isOpen, closeModal } = useTicketModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // React Hook Form with explicit typing
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      marketingOptIn: false,
    },
  });

  if (!event) return null;

  // Explicitly type the onSubmit handler with FormValues
  const onSubmit = async (data: FormValues) => {
    // Validate email again
    if (!isValidEmail(data.email)) {
      form.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Email data for future API
    const emailData = {
      email: data.email,
      eventId: event.id,
      optIn: data.marketingOptIn,
    };

    console.log("Submitted email data:", emailData);

    // Success message
    toast({
      title: "Success!",
      description: "You will be redirected to the ticket page.",
    });

    // Redirect
    setTimeout(() => {
      window.open(event.ticketUrl, "_blank");
      closeModal();
      setLoading(false);
      form.reset();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Get Tickets</DialogTitle>
          <DialogDescription>
            Complete this form to be redirected to the ticket purchase page.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit as any)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
                disabled={loading}
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 py-2">
              <Checkbox
                id="marketingOptIn"
                {...form.register("marketingOptIn")}
                disabled={loading}
              />
              <Label htmlFor="marketingOptIn" className="text-sm font-normal">
                Send me updates about events like this in Sydney
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Continue to Tickets"}
              {!loading && <ExternalLink className="ml-2 h-4 w-4" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
