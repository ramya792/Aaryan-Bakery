import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function PrivacyPolicy() {
  const { business } = useBusiness();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="flex items-center gap-3 border-b border-bakery-border pb-4">
        <ShieldCheck className="w-8 h-8 text-bakery-terracotta" />
        <div>
          <h1 className="font-serif text-3xl font-bold text-bakery-espresso">Privacy Policy</h1>
          <p className="text-xs text-bakery-softBrown">Sweet Studio — Aaryan Bakery (Owner: K. Narendra)</p>
        </div>
      </div>

      <div className="prose prose-stone text-sm text-bakery-softBrown leading-relaxed space-y-4">
        <p>
          At <strong>Aaryan Bakery</strong>, accessible from Mudinepalle, Eluru District, Andhra Pradesh, we prioritize the privacy of our website visitors and customers.
        </p>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">1. Information We Collect</h3>
        <p>
          When you submit an order enquiry or custom cake request, we collect your name, phone number, optional email address, and order delivery requirements solely to contact you and process your request.
        </p>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">2. How We Use Your Information</h3>
        <p>
          Your information is used strictly to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Confirm product availability and pricing for your order enquiry</li>
          <li>Arrange store pickup or local delivery in the Mudinepalle area</li>
          <li>Communicate order updates via phone call or WhatsApp</li>
        </ul>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">3. Data Protection & Sharing</h3>
        <p>
          We do not sell, rent, or share your personal contact details with third-party marketers or external advertisers.
        </p>

        <h3 className="font-serif text-lg font-bold text-bakery-espresso">4. Contact Us</h3>
        <p>
          If you have questions regarding this privacy policy, please contact owner <strong>K. Narendra</strong> directly at <strong>{business.phone}</strong> or visit us at Guraja Center, Mudinepalle.
        </p>
      </div>
    </div>
  );
}
