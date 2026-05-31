import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let shootingStars = [];
    const STAR_COUNT = 400;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    if (prefersReducedMotion) {
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      ctx.fillStyle = 'rgba(201, 169, 110, 0.03)';
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          Math.random() * 1.5 + 0.5,
          0, Math.PI * 2
        );
        ctx.fill();
      }
      return () => window.removeEventListener('resize', resize);
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      const isGold = Math.random() > 0.7;
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.8 + 0.2,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.003 + 0.001,
        isGold,
      });
    }

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.3,
        len: Math.random() * 150 + 80,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 4 + Math.random() * Math.PI / 6,
        alpha: 1,
        life: 1,
      });
    };

    let shootingStarTimer = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      for (const star of stars) {
        star.alpha += star.alphaSpeed * star.alphaDir;
        if (star.alpha > 1) { star.alpha = 1; star.alphaDir = -1; }
        if (star.alpha < 0.1) { star.alpha = 0.1; star.alphaDir = 1; }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        
        if (star.isGold) {
          ctx.fillStyle = `rgba(201, 169, 110, ${star.alpha * 0.7})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(201, 169, 110, ${star.alpha * 0.4})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.5})`;
          if (star.r > 1.5) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(255, 255, 255, ${star.alpha * 0.2})`;
          }
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0) star.x = window.innerWidth;
        if (star.x > window.innerWidth) star.x = 0;
        if (star.y < 0) star.y = window.innerHeight;
        if (star.y > window.innerHeight) star.y = 0;
      }

      shootingStarTimer++;
      if (shootingStarTimer > 120 + Math.random() * 180) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.strokeStyle = `rgba(201, 169, 110, ${s.alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.fill();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.008;
        s.alpha = s.life;

        if (s.life <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #0a0a1a 0%, #05050f 50%, #020208 100%)' }}
    />
  );
}
