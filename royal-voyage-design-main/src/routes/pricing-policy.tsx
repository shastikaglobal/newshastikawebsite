import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/pricing-policy")({
  component: PricingPolicy,
});

function PricingPolicy() {
  return (
    <div className="min-h-screen bg-midnight pt-24 pb-20 text-silver/80">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="rounded-3xl glass p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-white mb-8"><span className="text-gradient-royal">Pricing Policy</span></h1>
          
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <p>At Shastika Global Impex Pvt. Ltd., we offer competitive pricing for our premium agricultural products. While final prices may vary based on market conditions, typical price ranges include:</p>
              <ul className="list-disc pl-5 mt-4 mb-4 space-y-2">
                <li><strong>Coconuts (Semi-Husked/Fully Husked/Tender):</strong> ₹25 - ₹45 per piece or $300 - $500 per Metric Ton</li>
                <li><strong>Bananas (Regular/Baby/Nendran/Red):</strong> ₹20 - ₹60 per kg</li>
                <li><strong>Watermelon (Black/Regular):</strong> ₹15 - ₹30 per kg</li>
                <li><strong>Tomato:</strong> ₹25 - ₹50 per kg</li>
                <li><strong>Pumpkin (White/Yellow):</strong> ₹15 - ₹25 per kg</li>
                <li><strong>Cucumber:</strong> ₹20 - ₹35 per kg</li>
              </ul>
              <p className="mt-4">Prices may fluctuate depending on order quantity, packaging requirements, shipping method, and seasonal market availability.</p>
            </section>

            <section>
              <p>Final customized pricing will be provided after reviewing your exact requirements. Customers can request a formal quotation through our "Request Quote" option or by contacting our sales team directly.</p>
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
