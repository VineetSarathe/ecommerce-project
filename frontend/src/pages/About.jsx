import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fdf2f4]">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          About <span className="text-[#DD7A83]">Roopswaroop</span> ✨
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Roopswaroop is more than just a fashion store. We celebrate elegance,
          confidence, and individuality through carefully curated women's clothing.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left */}
        <div className="bg-white/70 backdrop-blur-md border border-[#E3BFC3]
                        rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            🌸 Our Story
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            Founded with a passion for style and simplicity, Roopswaroop was
            created to bring affordable yet premium fashion to every woman.
            We believe fashion should empower, not intimidate.
          </p>
        </div>

        {/* Right */}
        <div className="bg-white/70 backdrop-blur-md border border-[#E3BFC3]
                        rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            💖 Our Mission
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            To deliver stylish, comfortable, and high-quality clothing that
            enhances everyday confidence. We focus on timeless designs and
            customer happiness.
          </p>
        </div>

        {/* Values */}
        <div className="md:col-span-2 bg-white/70 backdrop-blur-md 
                        border border-[#E3BFC3]
                        rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🌟 What We Stand For
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">

            <div className="p-4 bg-[#fdf2f4] rounded-xl">
              <p className="font-medium text-[#DD7A83]">Quality</p>
              <p className="text-gray-600 mt-1">
                Carefully selected fabrics & stitching.
              </p>
            </div>

            <div className="p-4 bg-[#fdf2f4] rounded-xl">
              <p className="font-medium text-[#DD7A83]">Affordability</p>
              <p className="text-gray-600 mt-1">
                Premium looks without premium prices.
              </p>
            </div>

            <div className="p-4 bg-[#fdf2f4] rounded-xl">
              <p className="font-medium text-[#DD7A83]">Customer First</p>
              <p className="text-gray-600 mt-1">
                Your satisfaction is our priority.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
