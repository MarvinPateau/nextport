import { animate, spring } from "https://cdn.jsdelivr.net/npm/motion@10/+esm";

// Lenis smooth scrolling
const lenis = new Lenis({
  lerp: 0.1,
  smooth: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);

// GSAP animations
const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

tl.from('#visual-panel', { y: 16, opacity: 0, duration: 0.8 })
  .from('#info-panel', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
  .to('#visual-panel .loading .bar .progress', { width: '100%', duration: 1.8, ease: 'power1.out' });


// Stats gauges
const gauges = document.querySelectorAll('.gauge');
gauges.forEach(g => {
  const fill = g.querySelector('.fill');
  const val = g.getAttribute('data-value');
  ScrollTrigger.create({
    trigger: g,
    start: 'top 80%',
    once: true,
    onEnter: () => gsap.to(fill, { width: `${val * 100}%`, duration: 1.2 })
  });
});

// Parallax pin
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: '+=120%',
  pin: true,
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;
    gsap.to('.visual .silhouette', { opacity: 0.06 + progress * 0.06, overwrite: true });
  }
});

const cta = document.querySelector('.cta');
if (cta) {
  cta.addEventListener('mousemove', (e) => {
    const rect = cta.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    animate(cta, { x: x * 0.1, y: y * 0.1 }, { duration: 0.2 });
  });
  cta.addEventListener('mouseleave', () => {
    animate(cta, { x: 0, y: 0 }, { duration: 0.3 });
  });
}
