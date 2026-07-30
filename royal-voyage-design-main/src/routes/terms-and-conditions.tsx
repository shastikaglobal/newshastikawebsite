import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms-and-conditions")({
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-midnight pt-24 pb-20 text-silver/80">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric/80 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="rounded-3xl glass p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-white mb-8"><span className="text-gradient-royal">Terms & Conditions</span></h1>
          
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Introduction</h2>
              <p>Welcome to Shastika Global Impex Pvt Ltd. These terms and conditions outline the rules and regulations for the use of our website and our export services. By accessing this website or engaging our services, we assume you accept these terms in full.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. Company Information</h2>
              <p>Shastika Global Impex Pvt Ltd is a registered company based in Erode, Tamil Nadu, India. We specialize in the export of premium agricultural products, including coconuts, fresh fruits, vegetables, and spices.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. Products and Quality</h2>
              <p>We take pride in exporting high-quality agricultural goods. All products are subject to stringent quality checks before shipment. However, as these are natural, agricultural commodities, slight variations in size, color, or shape may occur. We guarantee that all products meet standard international export grades.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. Pricing and Quotes</h2>
              <p>All prices provided in quotes are valid for the specified duration on the proforma invoice. Due to the volatile nature of agricultural markets and shipping costs, prices are subject to change without prior notice until an order is officially confirmed.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Shipping and Delivery</h2>
              <p>We work with trusted international logistics partners for FCL (Full Container Load) and LCL (Less than Container Load) shipments. Delivery timelines are estimates and depend on shipping lines, customs clearance, and unforeseen transit delays. Shastika Global Impex Pvt Ltd is not liable for delays caused by force majeure events.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. Governing Law</h2>
              <p>These terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of these terms and conditions shall be subject to the exclusive jurisdiction of the courts located in Erode, Tamil Nadu.</p>
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
