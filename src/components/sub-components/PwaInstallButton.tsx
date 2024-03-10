"use client";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { Button, ButtonProps, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PwaInstallButton({
  children,
  className,
  ...rest
}: ButtonProps & { children?: React.ReactNode; text?: string }) {
  interface BeforeInstallPromptEvent {
    platforms: string[];
    userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
    prompt(): void;
  }

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      setDeferredPrompt(event);
      event.preventDefault();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setIsLoading(true);
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        toast.success("Installation successful.");
        setDeferredPrompt(null);
      } else {
        toast.error("Installation cancelled.");
      }
    } catch (error) {
      toast.error("Error during installation: " + getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (!deferredPrompt) return null;

  return (
    <Button
      size="sm"
      variant="bordered"
      radius="full"
      className={cn("border-dark-200 bg-white text-sm", className)}
      onClick={handleInstall}
      loading={isLoading}
      {...rest}
    >
      {children || "Install "}
    </Button>
  );
}
