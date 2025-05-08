"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCookie, setCookie } from "@/utils/cookie";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  // On mount, check if cookieConsent is set.
  useEffect(() => {
    const consent = getCookie("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (value: string) => {
    // Store user preference for one year (365 days)
    setCookie("cookieConsent", value, 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-black p-4 shadow-lg rounded-md z-[10000] w-11/12 max-w-2xl">
      <p className=" mb-4 text-center">
        We use cookies to enhance your experience. By clicking &quot;Accept
        All&quot;, you agree to our{" "}
        <Link href="/cookies" className="underline text-blue-500">
          Cookie Policy
        </Link>
        . You can also choose to reject non-essential cookies.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          variant="destructive"
          onClick={() => handleConsent("rejectAll")}
        >
          Reject All
        </Button>
        <Button
          variant="outline"
          onClick={() => handleConsent("acceptNecessary")}
        >
          Accept Necessary
        </Button>
        <Button onClick={() => handleConsent("acceptAll")}>Accept All</Button>
      </div>
    </div>
  );
}
