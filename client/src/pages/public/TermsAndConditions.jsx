import React from 'react';
import { FileText } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function TermsAndConditions() {
  const { business } = useBusiness();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="flex items-center gap-3 border-b border-bakery-border pb-4">
        <FileText className="w-8 h-8 text-bakery-terracotta" />
        <div>
          <h1 className="font-serif text-3xl font-bold text-bakery-espresso">Terms & Conditions</h1>
          <p className="text-xs text-bakery-softBrown">Sweet Studio — Aaryan Bakery (Owner: K. Narendra)</p>
        </div>
      </div>

      <div className="prose prose-stone text-sm text-bakery-softBrown leading-relaxed space-y-4">
        <p>
          Welcome to <strong>Aaryan Bakery</strong>. By browsing our website and submitting order enquiries, you agree to comply with the following terms.
        </p>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">1. Order Enquiry Platform</h3>
        <p>
          This website functions primarily as an order enquiry and custom cake estimation platform. Submitting a form or request does not constitute an immediate confirmed order until confirmed directly by bakery staff or owner <strong>K. Narendra</strong>.
        </p>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">2. Product Availability & Prices</h3>
        <p>
          All product prices listed (such as cakes, pizzas, and puffs) are displayed in Indian Rupees (₹). Product availability and current market pricing for items such as Arun Ice Creams are subject to confirmation upon enquiry.
        </p>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">3. Custom Cake Requests</h3>
        <p>
          Custom theme cake designs and photo print requirements must be finalized at least 24 to 48 hours prior to the required event date for proper preparation.
        </p>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">4. Contact Information</h3>
        <p>
          For urgent changes or cancellations, please call <strong>{business.phone}</strong> immediately.
        </p>
      </div>
    </div>
  );
}
