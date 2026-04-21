"use client";

import React, { useEffect, useState } from "react";

const PrivacyBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [gpcEnabled, setGpcEnabled] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem("privacy-banner-dismissed") === "true";
    const gpc = typeof navigator !== "undefined" && "globalPrivacyControl" in navigator
      ? Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl)
      : false;

    setGpcEnabled(gpc);
    setVisible(!dismissed);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem("privacy-banner-dismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Privacy notice"
      className="fixed bottom-3 left-1/2 z-[120] w-[calc(100%-1.25rem)] max-w-4xl -translate-x-1/2 border border-[oklch(0.85_0.3_150/0.35)] bg-[oklch(0_0_0/0.96)] px-4 py-3 text-xs sm:text-sm shadow-[0_0_0_1px_oklch(0.85_0.3_150/0.15)]"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[oklch(0.95_0_0)] leading-relaxed">
          {gpcEnabled
            ? "[Privacy_Status: GPC signal detected | Do Not Sell/Share preference honored]"
            : "[Privacy_Status: CCPA/CPRA controls available | You can manage data-sharing preferences anytime]"}
        </p>
        <div className="flex items-center gap-2">
          <a
            href="#privacy-policy"
            className="border border-[oklch(0.85_0.3_150/0.3)] px-2.5 py-1 text-[oklch(0.9_0.03_150)] hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="#do-not-sell"
            className="border border-[oklch(0.85_0.3_150/0.3)] px-2.5 py-1 text-[oklch(0.9_0.03_150)] hover:text-white"
          >
            Do Not Sell/Share
          </a>
          <button
            onClick={dismiss}
            className="border border-[oklch(0.85_0.3_150/0.45)] px-2.5 py-1 text-[oklch(0.85_0.3_150)] hover:text-white"
            aria-label="Dismiss privacy notice"
          >
            [X]
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PrivacyBanner;
