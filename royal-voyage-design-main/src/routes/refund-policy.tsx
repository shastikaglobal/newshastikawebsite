import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <div className="min-h-screen bg-midnight pt-24 pb-20 text-silver/80">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="rounded-3xl glass p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-white mb-8"><span className="text-gradient-royal">Refund Policy</span></h1>
          
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Nature of Goods</h2>
              <p>Shastika Global Impex Pvt Ltd deals primarily in the export of agricultural products and perishable goods. Due to the perishable nature of these items, our refund policy is strictly governed by the quality claims made at the destination port under standard international trade practices.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Quality Claims</h2>
              <p>Any claims regarding the quality, quantity, or condition of the goods must be raised within 48 hours of cargo discharge at the destination port. Claims must be supported by an independent surveyor's report (from recognized agencies like SGS) and photographic evidence.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Eligibility for Refund</h2>
              <p>Refunds or credit notes will only be issued if it is proven beyond doubt that the goods were damaged or substandard at the time of loading, and not due to transit delays, improper handling by the shipping line, or failure of cold chain logistics outside of our control.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Refund Processing</h2>
              <p>Approved refunds will be processed through the original method of payment via TT (Telegraphic Transfer) or LC (Letter of Credit) amendments within a strict 7-day refund timeline after the claim is settled.</p>
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
