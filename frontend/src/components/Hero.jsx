import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Hero = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (!document.getElementById("rs-font-link")) {
            const preconnect1 = document.createElement("link");
            preconnect1.rel = "preconnect";
            preconnect1.href = "https://fonts.googleapis.com";
            document.head.appendChild(preconnect1);

            const preconnect2 = document.createElement("link");
            preconnect2.rel = "preconnect";
            preconnect2.href = "https://fonts.gstatic.com";
            preconnect2.crossOrigin = "anonymous";
            document.head.appendChild(preconnect2);

            const link = document.createElement("link");
            link.id = "rs-font-link";
            link.rel = "stylesheet";
            link.href =
                "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@200;300;400;500&display=swap";
            document.head.appendChild(link);
        }

        const els = ref.current?.querySelectorAll("[data-reveal]");
        els?.forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.13}s`;
            el.classList.add("rs-hidden");
            requestAnimationFrame(() =>
                requestAnimationFrame(() => el.classList.remove("rs-hidden"))
            );
        });
    }, []);

    return (
        <>
            <style>{`
        .rs-cormorant { font-family: 'Cormorant Garamond', 'Georgia', serif; }
        .rs-jost       { font-family: 'Jost', 'Helvetica Neue', sans-serif; }

        [data-reveal] {
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .rs-hidden { opacity: 0 !important; transform: translateY(22px) !important; }

        /* ── Refined silk texture — slightly stronger weave ── */
        .rs-silk {
          background-image:
            repeating-linear-gradient(
              108deg,
              transparent, transparent 3px,
              rgba(201,98,107,0.022) 3px, rgba(201,98,107,0.022) 5px
            ),
            repeating-linear-gradient(
              18deg,
              transparent, transparent 3px,
              rgba(227,191,195,0.012) 3px, rgba(227,191,195,0.012) 5px
            );
        }

        /* ── Right panel — richer gradient with warm depth ── */
        .rs-panel {
          background: linear-gradient(
            148deg,
            #e8c4c9 0%,
            #d9abb1 40%,
            #c8949b 75%,
            #bd8a91 100%
          );
          clip-path: polygon(13% 0%, 100% 0%, 100% 100%, 0% 100%);
        }

        /* Panel shimmer lines */
        .rs-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -38deg,
            transparent, transparent 55px,
            rgba(255,255,255,0.055) 55px, rgba(255,255,255,0.055) 56px
          );
        }

        /* Panel inner glow — warm light source top-right */
        .rs-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 80% 15%,
            rgba(255,240,242,0.35) 0%,
            transparent 60%
          );
        }

        /* Primary button */
        .rs-btn-p {
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.4s ease, transform 0.4s ease;
          background: #c9626b;
          box-shadow: 0 10px 36px rgba(201,98,107,0.32);
        }
        .rs-btn-p::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #9e3d45;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .rs-btn-p:hover { transform: translateY(-2px); box-shadow: 0 18px 48px rgba(201,98,107,0.42); }
        .rs-btn-p:hover::before { transform: scaleX(1); transform-origin: left; }
        .rs-btn-p-inner { position: relative; z-index: 1; color: #fff; font-weight: 500; }

        /* Secondary button */
        .rs-btn-s {
          position: relative;
          padding-bottom: 3px;
          transition: color 0.25s ease, letter-spacing 0.3s ease;
        }
        .rs-btn-s::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: #c9626b;
          transition: background 0.3s ease;
        }
        .rs-btn-s:hover { color: #c9626b !important; letter-spacing: 0.32em; }
        .rs-btn-s:hover::after { background: #9e3d45; }

        /* Offer card */
        .rs-card {
          transition: transform 0.45s ease, box-shadow 0.45s ease;
          box-shadow: 0 28px 72px rgba(42,18,21,0.14), 0 4px 14px rgba(42,18,21,0.08);
        }
        .rs-card:hover { transform: translateY(-5px) rotate(-0.4deg); box-shadow: 0 38px 90px rgba(42,18,21,0.18); }
        .rs-card::before {
          content: '';
          position: absolute;
          inset: 9px;
          border: 1px solid rgba(180,120,128,0.3);
          pointer-events: none;
        }

        /* Marquee */
        .rs-track { animation: rs-scroll 22s linear infinite; }
        @keyframes rs-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

            <section
                ref={ref}
                className="rs-jost relative overflow-hidden min-h-screen flex flex-col"
                style={{
                    /* Richer multi-stop base gradient — warm blush to near-white */
                    background: "linear-gradient(148deg, #f7e8eb 0%, #f2dde1 25%, #faeef0 55%, #fdf6f7 100%)",
                }}
            >
                {/* Silk texture */}
                <div className="rs-silk absolute inset-0 pointer-events-none z-[1]" />

                {/* Right blush panel */}
                <div className="rs-panel absolute top-0 right-0 w-[42%] h-full z-0" />

                {/* ── Refined vignette — subtle frame around entire section ── */}
                <div
                    className="absolute inset-0 pointer-events-none z-[1]"
                    style={{
                        background: `
                          radial-gradient(ellipse at 25% 45%, transparent 30%, rgba(42,18,21,0.045) 100%),
                          radial-gradient(ellipse at 100% 100%, rgba(180,80,90,0.06) 0%, transparent 55%),
                          radial-gradient(ellipse at 0% 0%, rgba(255,240,242,0.5) 0%, transparent 40%)
                        `,
                    }}
                />

                {/* Ghost monogram */}
                <div
                    className="rs-cormorant absolute pointer-events-none select-none z-[1]"
                    style={{
                        fontSize: "clamp(12rem, 26vw, 24rem)",
                        fontWeight: 300,
                        fontStyle: "italic",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(180,80,90,0.10)",
                        bottom: "-0.12em",
                        left: "-0.04em",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                    }}
                >
                    RS
                </div>

                {/* ── Glow 1 — top-right warm bloom ── */}
                <div
                    className="absolute pointer-events-none z-[1] rounded-full"
                    style={{
                        width: 520,
                        height: 520,
                        top: -160,
                        right: "-5%",
                        background: "radial-gradient(circle, rgba(227,170,176,0.28) 0%, rgba(201,98,107,0.08) 45%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />

                {/* ── Glow 2 — bottom-left cool blush ── */}
                <div
                    className="absolute pointer-events-none z-[1] rounded-full"
                    style={{
                        width: 400,
                        height: 400,
                        bottom: "-80px",
                        left: "-60px",
                        background: "radial-gradient(circle, rgba(237,200,205,0.32) 0%, transparent 65%)",
                        filter: "blur(55px)",
                    }}
                />

                {/* ── Glow 3 — centre soft luminance behind text ── */}
                <div
                    className="absolute pointer-events-none z-[1] rounded-full"
                    style={{
                        width: 600,
                        height: 300,
                        top: "35%",
                        left: "8%",
                        background: "radial-gradient(ellipse, rgba(255,248,249,0.55) 0%, transparent 70%)",
                        filter: "blur(45px)",
                    }}
                />

                {/* ── Top bar ── */}
                <div
                    data-reveal
                    className="relative z-10 flex items-center justify-between px-8 lg:px-14 py-5"
                    style={{ borderBottom: "1px solid rgba(180,80,90,0.18)" }}
                >
                    <div
                        className="rs-cormorant tracking-[0.18em] uppercase"
                        style={{ fontSize: "1.05rem", fontWeight: 500, color: "#1a0a0c" }}
                    >
                        Roop
                        <em style={{ color: "#c9626b", fontStyle: "italic" }}>Swaroop</em>
                    </div>

                    <div
                        className="hidden md:block rs-jost text-[0.6rem] tracking-[0.28em] uppercase"
                        style={{ fontWeight: 400, color: "#7a3d43" }}
                    >
                        Single Brand Fashion
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#c9626b", opacity: 0.6 }} />
                        <div
                            className="rs-jost text-[0.6rem] tracking-[0.28em] uppercase"
                            style={{ fontWeight: 400, color: "#7a3d43" }}
                        >
                            SS — 2026
                        </div>
                    </div>
                </div>

                {/* ── Main grid ── */}
                <div className="relative z-[2] flex-1 w-full max-w-[1300px] mx-auto px-8 lg:px-14 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-10">

                    {/* LEFT */}
                    <div>

                        {/* Eyebrow */}
                        <div data-reveal className="flex items-center gap-3 mb-8">
                            <div className="flex flex-col gap-[3px]">
                                <span className="block h-px w-7" style={{ background: "#c9626b", opacity: 0.7 }} />
                                <span className="block h-px w-4" style={{ background: "#c9626b", opacity: 0.35 }} />
                            </div>
                            <span
                                className="rs-jost text-[0.62rem] tracking-[0.35em] uppercase"
                                style={{ fontWeight: 500, color: "#b0474f" }}
                            >
                                New Collection — 2026
                            </span>
                        </div>

                        {/* Main title */}
                        <h1
                            data-reveal
                            className="rs-cormorant m-0 leading-[0.9] tracking-[-0.02em]"
                            style={{ fontSize: "clamp(4.5rem, 7vw, 7rem)", color: "#1a0a0c" }}
                        >
                            <span style={{ display: "block", fontWeight: 600 }}>Roop</span>
                            <span
                                style={{
                                    display: "block",
                                    fontStyle: "italic",
                                    fontWeight: 400,
                                    color: "#c9626b",
                                    fontSize: "1.05em",
                                    marginLeft: "0.04em",
                                }}
                            >
                                Swaroop
                            </span>
                        </h1>

                        {/* Divider */}
                        <div data-reveal className="flex items-center gap-5 my-8">
                            <span
                                className="h-px flex-1 max-w-[2.5rem]"
                                style={{ background: "linear-gradient(to right, #c9a0a5, transparent)" }}
                            />
                            <span
                                className="rs-jost text-[0.62rem] tracking-[0.22em] uppercase"
                                style={{ fontWeight: 400, color: "#8c5058" }}
                            >
                                Elegance Redefined
                            </span>
                        </div>

                        {/* Subheading */}
                        <p
                            data-reveal
                            className="rs-cormorant m-0"
                            style={{ fontSize: "1.2rem", fontWeight: 500, fontStyle: "italic", color: "#4a2228", letterSpacing: "0.08em" }}
                        >
                            Elegance · Trend · Confidence
                        </p>

                        {/* Description */}
                        <p
                            data-reveal
                            className="rs-jost mt-3 max-w-sm"
                            style={{ fontSize: "0.84rem", fontWeight: 400, color: "#5c2e34", lineHeight: 1.9, letterSpacing: "0.01em" }}
                        >
                            Discover curated outfits crafted for comfort, confidence, and the modern woman — where heritage meets contemporary style.
                        </p>

                        {/* CTAs */}
                        <div data-reveal className="flex flex-wrap items-center gap-5 mt-10">
                            <Link
                                to="/products"
                                className="rs-btn-p rs-jost inline-block px-10 py-4 text-[0.64rem] tracking-[0.3em] uppercase"
                            >
                                <span className="rs-btn-p-inner">Shop Collection</span>
                            </Link>

                            <Link
                                to="/cart"
                                className="rs-btn-s rs-jost inline-flex items-center gap-2 text-[0.64rem] tracking-[0.28em] uppercase"
                                style={{ fontWeight: 400, color: "#4a2228" }}
                            >
                                View Cart →
                            </Link>
                        </div>

                        {/* Trust stats */}
                        <div data-reveal className="flex flex-wrap items-center gap-6 mt-12">
                            {[
                                { val: "2K", suf: "+", label: "Happy Clients" },
                                { val: "100", suf: "%", label: "Premium Quality" },
                                { val: "Free", suf: "", label: "Delivery" },
                            ].map((item, i) => (
                                <div key={item.label} className="flex items-center gap-6">
                                    {i > 0 && (
                                        <div className="w-px h-9 self-center" style={{ background: "#c9a0a5", opacity: 0.85 }} />
                                    )}
                                    <div className="flex flex-col gap-[3px]">
                                        <div
                                            className="rs-cormorant leading-none"
                                            style={{ fontSize: "1.65rem", fontWeight: 600, color: "#1a0a0c" }}
                                        >
                                            {item.val}
                                            <em className="italic" style={{ color: "#c9626b", fontSize: "0.82em" }}>{item.suf}</em>
                                        </div>
                                        <div
                                            className="rs-jost text-[0.58rem] tracking-[0.22em] uppercase"
                                            style={{ fontWeight: 400, color: "#7a3d43" }}
                                        >
                                            {item.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Offer card */}
                    <div data-reveal className="relative flex justify-center items-center min-h-[420px] lg:min-h-[500px]">

                        {/* Ghost numeral */}
                        <div
                            className="rs-cormorant absolute pointer-events-none select-none"
                            style={{
                                fontSize: "clamp(10rem, 19vw, 17rem)",
                                fontWeight: 300,
                                fontStyle: "italic",
                                color: "transparent",
                                WebkitTextStroke: "1px rgba(180,120,128,0.40)",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                lineHeight: 1,
                                letterSpacing: "-0.04em",
                            }}
                        >
                            04
                        </div>

                        {/* Card */}
                        <div className="relative w-[275px]">
                            {/* Back shadow card */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    // background: "#d4a8ad",
                                    background: "#b57f86",
                                    transform: "rotate(5.5deg) translate(13px, 9px)",
                                    opacity: 0.6,
                                }}
                            />

                            {/* Front card */}
                            <div
                                className="rs-card relative flex flex-col items-center gap-[1.1rem] text-center"
                                style={{ background: "#ffffff", padding: "2.75rem 2.25rem" }}
                            >
                                {/* Stamp */}
                                <div
                                    className="rs-jost absolute text-white text-[0.48rem] tracking-[0.28em] uppercase px-4 py-[7px]"
                                    style={{
                                        fontWeight: 500,
                                        background: "#1a0a0c",
                                        top: "-1rem",
                                        right: "-1.5rem",
                                        boxShadow: "0 6px 18px rgba(42,18,21,0.28)",
                                    }}
                                >
                                    SS — 2026
                                </div>

                                <div
                                    className="rs-jost text-[0.58rem] tracking-[0.32em] uppercase"
                                    style={{ fontWeight: 500, color: "#7a3d43" }}
                                >
                                    Exclusive Offer
                                </div>

                                <div
                                    className="rs-cormorant italic leading-none"
                                    style={{ fontSize: "5rem", fontWeight: 400, color: "#c9626b", letterSpacing: "-0.03em" }}
                                >
                                    30%
                                </div>

                                <div
                                    className="rs-cormorant tracking-[0.1em] uppercase -mt-2"
                                    style={{ fontSize: "1.1rem", fontWeight: 500, color: "#1a0a0c" }}
                                >
                                    Flat Off
                                </div>

                                <div
                                    className="w-10 h-px"
                                    style={{ background: "linear-gradient(to right, transparent, #c9a0a5, transparent)" }}
                                />

                                <div
                                    className="rs-jost text-[0.6rem] tracking-[0.2em] uppercase leading-[2]"
                                    style={{ fontWeight: 400, color: "#5c2e34" }}
                                >
                                    On All New Arrivals<br />This Season Only
                                </div>

                                <Link
                                    to="/products"
                                    className="rs-jost text-[0.62rem] tracking-[0.22em] uppercase mt-1 pb-[2px] transition-colors duration-200 hover:text-[#c9626b]"
                                    style={{
                                        fontWeight: 500,
                                        color: "#1a0a0c",
                                        borderBottom: "1px solid #c9a0a5",
                                        textDecoration: "none",
                                    }}
                                >
                                    Shop Now →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Marquee ── */}
                <div
                    className="relative z-[5] flex items-center overflow-hidden"
                    style={{
                        height: "2.75rem",
                        background: "#1a0a0c",
                        borderTop: "1px solid rgba(201,98,107,0.2)",
                    }}
                >
                    <div className="rs-track rs-jost flex whitespace-nowrap">
                        {Array(10).fill(null).map((_, i) => (
                            <span
                                key={i}
                                className="text-[0.52rem] tracking-[0.3em] uppercase px-8"
                                style={{ fontWeight: 400, color: "rgba(255,255,255,0.62)" }}
                            >
                                RoopSwaroop
                                <span style={{ color: "#c9626b", padding: "0 0.6rem" }}>✦</span>
                                New Collection
                                <span style={{ color: "#c9626b", padding: "0 0.6rem" }}>✦</span>
                                Elegant Fashion
                                <span style={{ color: "#c9626b", padding: "0 0.6rem" }}>✦</span>
                                Premium Quality
                                <span style={{ color: "#c9626b", padding: "0 0.6rem" }}>✦</span>
                                Free Delivery
                                <span style={{ color: "#c9626b", padding: "0 0.6rem" }}>✦</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;




