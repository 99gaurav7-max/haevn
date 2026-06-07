import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let shootingStars = [];
    let goldDust = [];
    let nebula = [];

    const STAR_COUNT = 600;
    const DUST_COUNT = 150;
    const NEBULA_COUNT = 4;

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
      for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          Math.random() * 1.5 + 0.5,
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(201, 169, 110, ${Math.random() * 0.3 + 0.05})`;
        ctx.fill();
      }
      return () => window.removeEventListener('resize', resize);
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      const typeRand = Math.random();
      let color;
      if (typeRand > 0.85) color = 'gold';
      else if (typeRand > 0.7) color = 'blue';
      else if (typeRand > 0.55) color = 'warm';
      else color = 'white';

      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.8 + 0.3,
        dx: (Math.random() - 0.5) * 0.08,
        dy: (Math.random() - 0.5) * 0.08,
        alpha: Math.random() * 0.8 + 0.2,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        alphaSpeed: Math.random() * 0.004 + 0.001,
        color,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    for (let i = 0; i < DUST_COUNT; i++) {
      goldDust.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        dx: (Math.random() - 0.5) * 0.02,
        dy: -Math.random() * 0.015 - 0.005,
        alpha: Math.random() * 0.6 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < NEBULA_COUNT; i++) {
      nebula.push({
        x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
        y: Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.15,
        rx: Math.random() * 200 + 150,
        ry: Math.random() * 100 + 60,
        alpha: Math.random() * 0.04 + 0.02,
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.05,
        hue: Math.random() > 0.5 ? 42 : 220,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * window.innerWidth * 1.2 - window.innerWidth * 0.1,
        y: Math.random() * window.innerHeight * 0.3,
        len: Math.random() * 200 + 120,
        speed: Math.random() * 10 + 6,
        angle: Math.PI / 4 + Math.random() * Math.PI / 5,
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.006 + 0.005,
        color: Math.random() > 0.6 ? 'gold' : 'white',
      });
    };

    let shootingStarTimer = 0;
    let time = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
      time += 0.005;

      for (const n of nebula) {
        n.x += n.dx;
        n.y += n.dy;
        n.alpha += Math.sin(time * 0.3 + n.phase) * 0.0005;

        if (n.x < -n.rx) n.x = w + n.rx;
        if (n.x > w + n.rx) n.x = -n.rx;
        if (n.y < -n.ry) n.y = h + n.ry;
        if (n.y > h + n.ry) n.y = -n.ry;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.rx);
        if (n.hue === 42) {
          grad.addColorStop(0, `rgba(201, 169, 110, ${n.alpha * 0.6})`);
          grad.addColorStop(0.4, `rgba(180, 150, 80, ${n.alpha * 0.3})`);
          grad.addColorStop(1, `rgba(201, 169, 110, 0)`);
        } else {
          grad.addColorStop(0, `rgba(100, 140, 220, ${n.alpha * 0.5})`);
          grad.addColorStop(0.4, `rgba(60, 100, 200, ${n.alpha * 0.25})`);
          grad.addColorStop(1, `rgba(100, 140, 220, 0)`);
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      for (const star of stars) {
        star.alpha += Math.sin(time * 2 + star.phase) * star.pulseSpeed;
        star.alpha = Math.max(0.05, Math.min(1, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);

        if (star.color === 'gold') {
          ctx.fillStyle = `rgba(201, 169, 110, ${star.alpha * 0.85})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(201, 169, 110, ${star.alpha * 0.5})`;
        } else if (star.color === 'blue') {
          ctx.fillStyle = `rgba(180, 210, 255, ${star.alpha * 0.6})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(180, 210, 255, ${star.alpha * 0.25})`;
        } else if (star.color === 'warm') {
          ctx.fillStyle = `rgba(255, 240, 210, ${star.alpha * 0.7})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(255, 240, 210, ${star.alpha * 0.2})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.5})`;
          if (star.r > 1.5) {
            ctx.shadowBlur = 3;
            ctx.shadowColor = `rgba(255, 255, 255, ${star.alpha * 0.15})`;
          }
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < -5) star.x = w + 5;
        if (star.x > w + 5) star.x = -5;
        if (star.y < -5) star.y = h + 5;
        if (star.y > h + 5) star.y = -5;
      }

      for (const dust of goldDust) {
        dust.x += dust.dx + Math.sin(time + dust.phase) * 0.01;
        dust.y += dust.dy;
        dust.alpha = 0.2 + Math.sin(time * 1.5 + dust.phase) * 0.15;

        if (dust.y < -5) {
          dust.y = h + 5;
          dust.x = Math.random() * w;
        }
        if (dust.x < -5) dust.x = w + 5;
        if (dust.x > w + 5) dust.x = -5;

        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${dust.alpha * 0.4})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(201, 169, 110, ${dust.alpha * 0.2})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      shootingStarTimer++;
      if (shootingStarTimer > 80 + Math.random() * 150) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        );

        const color = s.color === 'gold'
          ? `rgba(201, 169, 110, ${s.alpha * 0.7})`
          : `rgba(255, 255, 255, ${s.alpha * 0.6})`;
        ctx.strokeStyle = color;
        ctx.lineWidth = s.alpha * 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.alpha * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = s.color === 'gold' ? 'rgba(201, 169, 110, 0.6)' : 'rgba(255,255,255,0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= s.decay;
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
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #0F0F24 0%, #0a0a1a 40%, #05050f 100%)',
      }}
    />
  );
}
