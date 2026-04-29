const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fdf2f4]">
      <div className="max-w-5xl mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Help & Support 💬
        </h1>

        <p className="text-gray-600 mb-10">
          Having trouble? We're here to help you.
        </p>

        {/* FAQ */}
        <div className="grid gap-4">

          <div className="bg-white border border-[#E3BFC3] rounded-xl p-4">
            <h3 className="font-semibold text-gray-800">
              📦 Where is my order?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              You can track your order from the Orders page in your profile.
            </p>
          </div>

          <div className="bg-white border border-[#E3BFC3] rounded-xl p-4">
            <h3 className="font-semibold text-gray-800">
              🔁 How to return a product?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Contact our support team within 7 days of delivery.
            </p>
          </div>

          <div className="bg-white border border-[#E3BFC3] rounded-xl p-4">
            <h3 className="font-semibold text-gray-800">
              💳 Payment failed?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              If amount was deducted, it will auto-refund within 5–7 business days.
            </p>
          </div>

        </div>

        {/* Contact */}
        <div className="mt-10 bg-[#DD7A83]/10 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Contact Support 📞
          </h2>

          <p className="text-sm text-gray-700">
            📧 Email: support@roopswaroop.com
          </p>

          <p className="text-sm text-gray-700">
            📱 Phone: +91 XXXXX XXXXX
          </p>
        </div>

      </div>
    </div>
  );
};

export default Help;
