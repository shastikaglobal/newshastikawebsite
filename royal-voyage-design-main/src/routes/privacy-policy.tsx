import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-midnight pt-24 pb-20 text-silver/80">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="rounded-3xl glass p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-white mb-8"><span className="text-gradient-royal">Privacy Policy</span></h1>
          
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Information We Collect</h2>
              <p>At Shastika Global Impex Pvt Ltd, we prioritize your privacy. We collect information that you voluntarily provide to us when you express an interest in obtaining information about our agricultural products or services. This includes your name, company name, email address, phone number, and shipping requirements.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <p>The information we collect is used solely for business purposes, specifically to:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Provide accurate quotes for agricultural exports.</li>
                  <li>Process and fulfill international shipping orders.</li>
                  <li>Communicate with you regarding your shipment status.</li>
                  <li>Respond to customer service inquiries.</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Data Sharing and Disclosure</h2>
              <p>We do not sell, rent, or trade your personal information to third parties. We may share necessary information with trusted third-party service providers (such as shipping lines, freight forwarders, and customs brokers) strictly for the purpose of fulfilling your export orders.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Data Security</h2>
              <p>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, you may contact our headquarters in Erode, Tamil Nadu, India, via the contact information provided on our homepage.</p>
            </section>

            <section className="pt-6 border-t border-white/10">
              <p className="text-xs text-silver/50">Last Updated: July 2026</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
