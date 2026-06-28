import { useState, useEffect } from 'react';

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch('/api/hero')
      .then(res => res.ok ? res.json() : null)
      .then(data => setHero(data))
      .catch(() => {});
  }, []);

  return (
    <section id="home">
      <picture>
        <source media="(min-width: 768px)" srcSet={hero?.desktopBanner || '/images/DesktopBanner.jfif'} />
        <img
          src={hero?.mobileBanner || '/images/MobileBanner.jpg'}
          alt="Melado Premium Ice Cream"
          className="w-full h-auto"
        />
      </picture>
    </section>
  );
}
