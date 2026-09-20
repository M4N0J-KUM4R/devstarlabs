import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of DevStar Labs.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="September 2026"
      sections={[
        {
          heading: "1. What We're Building Together",
          paras: [
            "DevStar Labs is a software studio and a professional network. These terms cover both: the delivery services we provide to clients, and the platform — Cards, the Connectory and the Community Board — that members use to present their work.",
            "By creating an account or engaging the lab for delivery work, you agree to these terms. If you use the platform on behalf of a company, you confirm you have authority to bind that company.",
          ],
        },
        {
          heading: "2. Your Journey With Us",
          paras: [
            "Accounts are personal. Usernames are permanent because they are your Card's address in the network. You must be at least 18 years old to join, and you are responsible for keeping your credentials and account activity safe.",
            "Delivery engagements are scoped in their own statements of work. Where a statement of work conflicts with these terms, the statement of work wins for that engagement.",
          ],
        },
        {
          heading: "3. Our Commitment to Change",
          paras: [
            "We may update these terms as the platform evolves. Material changes are announced on the Community Board and emailed to members at least 14 days before they take effect. Continuing to use DevStar Labs after that means you accept the updated terms.",
          ],
        },
        {
          heading: "4. Your Space on DevStar Labs",
          paras: [
            "We want the network to be professional, honest and useful. To keep it that way you agree not to:",
          ],
          list: [
            "Impersonate people or organizations, or use a Card name that trades on someone else's reputation",
            "Upload malicious code, scrape the platform, or probe it for vulnerabilities without a written bounty agreement",
            "Harass members, spam the Community Board, or use data harvested from the Connectory for bulk outreach",
            "Resell access to the platform without a partnership agreement",
          ],
        },
        {
          heading: "5. Your Creative Content",
          paras: [
            "You own everything you upload. By publishing it on your Card you grant DevStar Labs only the license we need to host, display and promote it within the network — nothing more. We never sell your work or your data, and featuring your work always requires your permission.",
            "If you believe a Card infringes your rights, write to help@devstarlabs.dev. We act on valid reports within 48 hours.",
          ],
        },
        {
          heading: "6. Payment Terms",
          paras: [
            "Subscriptions bill in advance for the period you choose — weekly, monthly or annual — and renew until cancelled. Cancel anytime from settings; access runs to the end of the paid period. Support My Practice payments go directly to members through our payment processor; DevStar Labs takes no commission.",
            "Delivery retainers and sprints bill per their statements of work. Fees are non-refundable except where the law requires otherwise.",
          ],
        },
        {
          heading: "7. Disclaimers and Liability",
          paras: [
            "The platform is provided as-is. Beta features are experiments and may change or retire. To the maximum extent permitted by law, DevStar Labs is not liable for indirect or consequential damages, and our aggregate liability is capped at the greater of the fees you paid us in the last twelve months or $100.",
            "Nothing in these terms limits liability that cannot be limited by law, including for gross negligence or willful misconduct.",
          ],
        },
        {
          heading: "8. Governing Law",
          paras: [
            "These terms are governed by the laws of the jurisdiction where the operating DevStar Labs entity is registered, without prejudice to consumer protections that apply in your country of residence. Disputes go to the courts of that jurisdiction, unless mandatory local law gives you a better forum.",
          ],
        },
        {
          heading: "9. Contact",
          paras: [
            "Questions about these terms: help@devstarlabs.dev. Partnership and delivery questions: sales@devstarlabs.dev. Humans answer both.",
          ],
        },
      ]}
    />
  );
}
