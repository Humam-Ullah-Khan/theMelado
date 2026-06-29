import { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

export default function Hero() {
  const [hero, setHero] = useState(null);
  const { register, done } = useLoading();

  useEffect(() => {
    register('hero');
    fetch('/api/hero')
      .then(res => res.ok ? res.json() : null)
      .then(data => setHero(data))
      .catch(() => {})
      .finally(() => done('hero'));
  }, []);

  if (!hero) {
    return (
      <section id="home" className="w-full bg-[#FFF8F0]" style={{ aspectRatio: '16/9' }} />
    );
  }

  return (
    <section id="home">
      <picture>
        <source media="(min-width: 768px)" srcSet={hero.desktopBanner} />
        <img
          src={hero.mobileBanner}
          alt="Melado Premium Ice Cream"
          className="w-full h-auto"
        />
      </picture>
    </section>
  );
}
