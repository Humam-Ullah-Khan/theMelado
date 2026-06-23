export default function Hero() {
  return (
    <section id="home">
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/DesktopBanner.jfif" />
        <img
          src="/images/MobileBanner.jpg"
          alt="Melado Premium Ice Cream"
          className="w-full h-auto"
        />
      </picture>
    </section>
  );
}
