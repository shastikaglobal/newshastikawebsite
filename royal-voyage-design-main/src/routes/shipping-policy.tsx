import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/shipping-policy")({
  component: ShippingPolicy,
});

function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-midnight pt-24 pb-20 text-silver/80">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="rounded-3xl glass p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-white mb-8"><span className="text-gradient-royal">Shipping Policy</span></h1>
          
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. International Shipping</h2>
              <p>Shastika Global Impex Pvt Ltd specializes in the export of agricultural products worldwide. We coordinate with established shipping lines and freight forwarders to ensure the safe and timely delivery of your orders. Shipping routes, transit times, and available vessels may vary depending on the destination port.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Processing Time</h2>
              <p>All export orders require a standard processing time for quality inspection, packaging, customs documentation, and port clearance. The exact processing time will be communicated during the order confirmation stage and typically ranges from 7 to 15 business days before vessel departure.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Incoterms</h2>
              <p>We primarily operate under standard Incoterms 2020, such as FOB (Free On Board) and CIF (Cost, Insurance, and Freight). The specific terms for your shipment will be clearly defined in your commercial invoice and sales contract.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Customs and Duties</h2>
              <p>For CIF and FOB shipments, the buyer is responsible for all import duties, taxes, and customs clearance fees at the destination port. We provide all necessary export documentation, including Commercial Invoices, Packing Lists, Certificates of Origin, and Phytosanitary Certificates, to facilitate smooth import clearance.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Delivery Delays</h2>
              <p>While we strive to meet all estimated departure and arrival dates, Shastika Global Impex is not liable for delays caused by circumstances beyond our control, including adverse weather conditions, port congestion, customs inspections, or vessel delays.</p>
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
