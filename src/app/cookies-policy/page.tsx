import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "How and why DevStar Labs uses cookies.",
  alternates: { canonical: "/cookies-policy" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies Policy"
      updated="September 2026"
      sections={[
        {
          heading: "What are cookies exactly?",
          paras: [
            "Cookies are small text files a website stores on your device. They keep you logged in, remember preferences, and tell the site how it is being used. Similar technologies (local storage, pixels) are covered here too.",
          ],
        },
        {
          heading: "Why do we use cookies?",
          paras: [
            "Strictly practical reasons: keeping you signed in, remembering your theme and language, understanding which pages are useful, and processing payments securely. We do not use cookies to build advertising profiles.",
          ],
        },
        {
          heading: "What types of cookies do we use?",
          paras: [],
          list: [
            "Authentication Cookies — keep you logged in. Without them the site cannot remember who you are.",
            "Preference Cookies — remember choices like reduced-motion state and language.",
            "Analytics Cookies — aggregate, anonymized usage statistics that tell us what to improve.",
            "Payment Cookies — set by our payment processor during checkout to prevent fraud.",
          ],
        },
        {
          heading: "Managing cookies",
          paras: [
            "You can clear or block cookies in your browser settings. Blocking authentication cookies will log you out; blocking analytics cookies just means we fly a little blinder.",
            "Your consent banner choices can be changed at any time from the footer.",
          ],
        },
        {
          heading: "Third-party cookies",
          paras: [
            "Embedded content — partner videos, event pages — may set their own cookies. We keep third-party embeds to a minimum and label them where they appear.",
          ],
        },
        {
          heading: "Contact",
          paras: [
            "Questions about cookies or analytics: help@devstarlabs.dev.",
          ],
        },
      ]}
    />
  );
}
