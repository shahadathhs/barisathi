"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(true);

  const handleRejectAll = () => {
    console.log("User rejected all cookies");
    setVisible(false);
  };

  const handleAcceptAll = () => {
    console.log("User accepted all cookies");
    setVisible(false);
  };

  const handleAcceptNecessary = () => {
    console.log("User accepted necessary cookies only");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-md z-[10000] w-11/12 max-w-2xl">
      <p className="text-gray-700 mb-4 text-center">
        We use cookies to enhance your experience. By clicking &quot;Accept
        All&quot;, you agree to our <Link href="/cookies" className="underline text-blue-500">Cookie Policy</Link>.
        You can also choose to reject non-essential cookies.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="destructive" onClick={handleRejectAll}>
          Reject All
        </Button>
        <Button variant="outline" onClick={handleAcceptNecessary}>
          Accept Necessary
        </Button>
        <Button onClick={handleAcceptAll}>Accept All</Button>
      </div>
    </div>
  );
}
