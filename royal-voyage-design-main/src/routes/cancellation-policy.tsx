import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cancellation-policy")({
  component: CancellationPolicy,
});

function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-midnight pt-24 pb-20 text-silver/80">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="rounded-3xl glass p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-white mb-8"><span className="text-gradient-royal">Cancellation Policy</span></h1>
          
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Order Confirmation</h2>
              <p>An export order is considered confirmed once the Proforma Invoice (PI) is signed, and the advance payment or Letter of Credit (LC) has been received by Shastika Global Impex Pvt Ltd. Upon confirmation, procurement and packaging processes begin immediately.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Cancellation by the Buyer</h2>
              <p>Due to the fast-moving and perishable nature of agricultural commodities, orders cannot be cancelled once the goods have been dispatched to the port or loaded into the shipping container.</p>
              <p className="mt-2">If a cancellation request is made prior to the commencement of processing and packaging, we will accommodate the request, but any banking charges or advance logistics booking fees incurred will be deducted from the advance payment.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Cancellation by the Company</h2>
              <p>Shastika Global Impex Pvt Ltd reserves the right to cancel an order under the following circumstances:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Failure of the buyer to remit the agreed payment on time.</li>
                  <li>Sudden government export bans or regulatory restrictions.</li>
                  <li>Force majeure events (natural disasters, strikes, or port closures) that make fulfillment impossible.</li>
                </ul>
              </p>
              <p className="mt-2">In the event of cancellation by us due to circumstances outside the buyer's control, a full refund of any advances paid will be issued.</p>
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
