/**
 * ✦ KOMOREBI — Celestial Night Sky with Authentic Shooting Stars (Canvas Physics Engine)
 */

function CelestialPhysicsCanvas({ theme = 'pink' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement.clientHeight || 600);

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', resize);

    // Deep Sky Twinkling Stars (Fixed Background Field)
    const starField = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * 1.8,
      baseAlpha: 0.15 + Math.random() * 0.25,
      pulseAmp: 0.15 + Math.random() * 0.25,
      pulseSpeed: 0.0015 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
      isGold: Math.random() > 0.6
    }));

    // Active Shooting Stars (Meteors with Aerodynamic Light Tails)
    let shootingStars = [];
    let wakeEmbers = [];

    const themeColors = {
      pink: [{ r: 252, g: 165, b: 201 }, { r: 248, g: 207, b: 101 }, { r: 255, g: 240, b: 245 }],
      forest: [{ r: 110, g: 231, b: 183 }, { r: 163, g: 230, b: 53 }, { r: 248, g: 207, b: 101 }],
      ocean: [{ r: 56, g: 189, b: 248 }, { r: 96, g: 165, b: 250 }, { r: 224, g: 242, b: 254 }]
    };

    function spawnShootingStar() {
      const angle = (Math.PI / 180) * (130 + Math.random() * 15); // ~130°–145° diagonal sweep
      const speed = 7.5 + Math.random() * 5.5;
      const startX = width * 0.35 + Math.random() * (width * 0.75);
      const startY = -20 - Math.random() * 40;
      const palette = themeColors[theme] || themeColors.pink;
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];

      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 70 + Math.random() * 80,
        thickness: 1.5 + Math.random() * 1.2,
        alpha: 0,
        maxAlpha: 0.85 + Math.random() * 0.15,
        life: 0,
        maxLife: 45 + Math.random() * 30, // Crisp ~0.8s-1.2s lifespan
        color: chosenColor
      });
    }

    let nextShootingStarTime = performance.now() + 1800;
    let lastTime = performance.now();

    function render(currentTime) {
      const dt = Math.min((currentTime - lastTime) / 16.67, 2.0);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Ambient Twinkling Stars
      starField.forEach(star => {
        const alpha = Math.max(0.05, star.baseAlpha + Math.sin(currentTime * star.pulseSpeed + star.phase) * star.pulseAmp);
        ctx.fillStyle = star.isGold
          ? `rgba(248, 207, 101, ${alpha})`
          : `rgba(255, 250, 242, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Periodic Authentic Shooting Star Emitter (Every 5–8 seconds)
      if (currentTime > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = currentTime + 4500 + Math.random() * 4500;
      }

      // 3. Update & Draw Shooting Stars (Aerodynamic Light Streaks)
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        const lifeRatio = s.life / s.maxLife;
        if (lifeRatio < 0.2) {
          s.alpha = (lifeRatio / 0.2) * s.maxAlpha;
        } else if (lifeRatio > 0.65) {
          s.alpha = ((1 - lifeRatio) / 0.35) * s.maxAlpha;
        } else {
          s.alpha = s.maxAlpha;
        }

        if (Math.random() < 0.45 && s.alpha > 0.2) {
          wakeEmbers.push({
            x: s.x + (Math.random() - 0.5) * 4,
            y: s.y + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: 0.3 + Math.random() * 0.5,
            size: 1 + Math.random() * 1.5,
            alpha: s.alpha * 0.7,
            life: 0,
            maxLife: 20 + Math.random() * 20,
            color: s.color
          });
        }

        const velocityMag = Math.hypot(s.vx, s.vy);
        const normVx = s.vx / velocityMag;
        const normVy = s.vy / velocityMag;
        const tailX = s.x - normVx * s.length;
        const tailY = s.y - normVy * s.length;

        ctx.save();
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
        grad.addColorStop(0.2, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.alpha * 0.85})`);
        grad.addColorStop(1, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.shadowColor = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (s.life >= s.maxLife || s.x < -100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      // 4. Update & Draw Wake Embers
      for (let j = wakeEmbers.length - 1; j >= 0; j--) {
        const ember = wakeEmbers[j];
        ember.life += dt;
        ember.x += ember.vx * dt;
        ember.y += ember.vy * dt;
        const emberAlpha = (1 - ember.life / ember.maxLife) * ember.alpha;

        if (emberAlpha > 0.02) {
          ctx.fillStyle = `rgba(${ember.color.r}, ${ember.color.g}, ${ember.color.b}, ${emberAlpha})`;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
          ctx.fill();
        }

        if (ember.life >= ember.maxLife) {
          wakeEmbers.splice(j, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

window.CelestialPhysicsCanvas = CelestialPhysicsCanvas;
