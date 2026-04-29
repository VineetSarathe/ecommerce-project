import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="
        bg-gradient-to-r from-[#E3BFC3] to-[#DD7A83]
        px-4 py-6
        mt-10
      "
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">

        <p className="text-xs sm:text-sm text-white/90 font-medium">
          © 2026 Girls Clothing Store. All rights reserved.
        </p>

        <div className="flex gap-4 text-xs sm:text-sm text-white/90">
          <Link to="/policies" className="hover:text-white hover:underline">
            Policies
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;