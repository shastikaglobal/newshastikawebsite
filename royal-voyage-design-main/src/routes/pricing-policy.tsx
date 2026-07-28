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
              <p>At Shastika Global Impex Pvt. Ltd., product prices are quotation-based and may vary depending on:</p>
              <ul className="list-disc pl-5 mt-4 mb-4 space-y-2">
                <li>Product type</li>
                <li>Order quantity</li>
                <li>Packaging requirements</li>
                <li>Destination country</li>
                <li>Shipping method</li>
                <li>Seasonal market availability</li>
              </ul>
            </section>

            <section>
              <p>Final pricing will be provided after reviewing your requirements. Customers can request a customized quotation through our "Request Quote" option or by contacting our sales team.</p>
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
