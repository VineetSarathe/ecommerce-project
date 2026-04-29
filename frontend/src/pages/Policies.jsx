const Policies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3BFC3] via-[#f5d6da] to-[#DD7A83] py-12 px-4">
      <div className="max-w-5xl mx-auto ">
        <div className="bg-white/85 backdrop-blur-md shadow-xl rounded-3xl p-6 sm:p-10 border border-white/40">

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#5b1919] mb-2">
            Store Policies
          </h1>

          <p className="text-center text-sm text-gray-500 mb-10">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed ">

            <PolicyBlock title="🔒 Privacy Policy">
              <p>
                We are committed to safeguarding your personal information. When you
                use our website, we may collect necessary details such as your name,
                email address, phone number, and shipping/billing address strictly for
                order processing, delivery, customer support, and service improvement.
              </p>
              <p>
                We <strong>do not store or retain sensitive payment credentials</strong>
                such as card numbers, CVV, or banking passwords. All transactions are
                securely processed through trusted third-party payment gateways.
              </p>
              <p>
                Your personal data is never sold, rented, or traded. Information may
                only be shared with logistics partners, payment processors, or legal
                authorities where required to fulfill services or comply with law.
              </p>
              <p>
                We implement reasonable technical and organizational security measures,
                but no digital platform can guarantee absolute security.
              </p>
            </PolicyBlock>

            <PolicyBlock title="📜 Terms & Conditions">
              <p>
                By accessing or using this website, you agree to be bound by these terms.
                If you do not agree, please discontinue use of the platform.
              </p>
              <p>
                Product descriptions, pricing, images, promotions, and availability are
                subject to change without prior notice. We reserve the right to correct
                any inadvertent errors or inaccuracies.
              </p>
              <p>
                We may refuse or cancel orders at our discretion, particularly in cases
                involving pricing errors, stock unavailability, payment issues, or
                suspected fraudulent activity.
              </p>
              <p>
                Unauthorized use of this website, including misuse of content, may result
                in legal action.
              </p>
            </PolicyBlock>

            <PolicyBlock title="💳 Payments">
              <p>
                All payments must be completed via approved payment methods available on
                our platform. Orders are processed only after successful payment
                confirmation.
              </p>
              <p>
                In the event of payment failure, declined transactions, gateway errors,
                or suspected fraud, the order may be automatically cancelled.
              </p>
              <p>
                We are not responsible for issues arising from:
              </p>
              <ul className="list-disc pl-5">
                <li>Banking server downtime</li>
                <li>Payment gateway failures</li>
                <li>Transaction delays</li>
                <li>Incorrect payment details entered by customer</li>
              </ul>
              <p>
                Customers are advised to retain transaction receipts for reference.
              </p>
            </PolicyBlock>

            <PolicyBlock title="💸 Refund & Return Policy">
              <p>
                We aim to ensure customer satisfaction. Returns are accepted within
                <strong> 7 days</strong> of delivery, provided the item remains unused,
                unwashed, undamaged, and in original packaging with tags intact.
              </p>
              <p>Returns will not be accepted for:</p>
              <ul className="list-disc pl-5">
                <li>Used or worn items</li>
                <li>Products without tags or packaging</li>
                <li>Items damaged after delivery</li>
                <li>Non-returnable / hygiene-sensitive items (if applicable)</li>
              </ul>
              <p>
                Refunds, once approved after inspection, will be processed within
                <strong> 5–7 business days</strong> via the original payment method.
              </p>
              <p>
                Shipping charges (if any) may be non-refundable unless the return is due
                to our error.
              </p>
            </PolicyBlock>

            <PolicyBlock title="🚚 Shipping Policy">
              <p>
                Orders are typically processed within <strong>1–3 business days</strong>
                after payment confirmation.
              </p>
              <p>Estimated delivery timelines:</p>
              <ul className="list-disc pl-5">
                <li>Metro Cities: 3–5 business days</li>
                <li>Other Locations: 5–8 business days</li>
              </ul>
              <p>
                Delivery timelines are estimates and may vary due to external factors
                such as courier delays, weather disruptions, strikes, or holidays.
              </p>
              <p>
                Once shipped, tracking details will be provided where available.
              </p>
            </PolicyBlock>

            <PolicyBlock title="❌ Cancellation Policy">
              <p>
                Orders may be cancelled before shipment. Once dispatched, cancellation
                requests may not be accepted.
              </p>
              <p>
                Approved cancellations will be refunded as per the Refund Policy.
              </p>
              <p>
                We reserve the right to cancel orders due to stock issues, payment
                concerns, or suspected misuse.
              </p>
            </PolicyBlock>

            <PolicyBlock title="⚖️ Limitation of Liability">
              <p>
                We shall not be liable for indirect, incidental, or consequential damages
                arising from the use of our website, services, payment systems, or
                shipping delays beyond our reasonable control.
              </p>
            </PolicyBlock>

            <PolicyBlock title="📞 Contact Us">
              <p>
                For any questions or concerns regarding these policies:
              </p>
              <p>
                📧 Email: <strong>support@[yourstore].com</strong> <br />
                📞 Phone: <strong>[Your Contact Number]</strong>
              </p>
            </PolicyBlock>

          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyBlock = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
      <h2 className="text-lg sm:text-xl font-semibold text-[#5b1919] mb-2">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default Policies;