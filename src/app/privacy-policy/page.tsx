import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DevStar Labs collects, uses and protects your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      sections={[
        {
          heading: "1. Information We Collect",
          paras: [
            "We collect what you put on your Card — name, practice, portfolio, links — plus account details like your email and billing information through our payment processor. We also collect usage data (page views, Card scans, connection activity) to power your statistics.",
            "We do not buy advertising audiences, and we do not collect data from third-party trackers embedded in your work.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          paras: [
            "Your data runs your experience: rendering your Card, matching connections in the Connectory, showing you your own engagement statistics, processing payments, and keeping the platform safe.",
            "We never use your activity to rank you in a feed — there is no feed to rank you in.",
          ],
        },
        {
          heading: "3. How We Share Your Information",
          paras: [
            "Your Card is public by design — that is its purpose. Everything else stays private. We share data only with the processors that operate the platform (hosting, payments, email delivery), under contracts that forbid them from using it for anything else.",
            "We may disclose information if the law compels us, and we will tell you unless we are legally forbidden to.",
          ],
        },
        {
          heading: "4. Data Retention",
          paras: [
            "We keep your data while your account is active. Inactive accounts are archived after 12 months and deleted after 24. Billing records are kept as long as tax law requires. You can request deletion at any time.",
          ],
        },
        {
          heading: "5. Your Rights",
          paras: [
            "Depending on where you live, you can access, export, correct or delete your data, object to certain processing, and complain to your local authority. Write to help@devstarlabs.dev — we answer within 30 days, usually much faster.",
          ],
        },
        {
          heading: "6. Security",
          paras: [
            "All traffic is encrypted in transit, access to production data is limited to the engineers who need it, and payment details never touch our servers — they go straight to our payment processor.",
          ],
        },
        {
          heading: "7. International Transfers",
          paras: [
            "DevStar Labs operates globally. Where data crosses borders we rely on recognized transfer mechanisms, and we apply the same protections everywhere.",
          ],
        },
        {
          heading: "8. Contact",
          paras: [
            "Privacy questions, data exports and deletion requests: help@devstarlabs.dev.",
          ],
        },
      ]}
    />
  );
}
