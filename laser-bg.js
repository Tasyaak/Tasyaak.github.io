(() => {
  const canvas = document.querySelector('#laser-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let beams = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId = 0;

  const palette = [
    [66, 122, 105],
    [102, 148, 127],
    [174, 192, 113]
  ];

  function makeBeam(index) {
    const leftOrigin = index % 2 === 0;
    const y0 = height * (0.08 + Math.random() * 0.46);
    const y1 = height * (0.22 + Math.random() * 0.56);
    return {
      x0: leftOrigin ? -width * 0.08 : width * 1.08,
      y0,
      x1: leftOrigin ? width * (0.58 + Math.random() * 0.50) : width * (0.10 + Math.random() * 0.38),
      y1,
      speed: 0.00006 + Math.random() * 0.00005,
      offset: Math.random(),
      alpha: 0.10 + Math.random() * 0.10,
      width: 0.7 + Math.random() * 1.0,
      color: palette[index % palette.length]
    };
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    beams = Array.from({ length: width < 640 ? 5 : 8 }, (_, i) => makeBeam(i));
    drawStatic();
  }

  function lineGradient(beam) {
    const g = ctx.createLinearGradient(beam.x0, beam.y0, beam.x1, beam.y1);
    const [r, gC, b] = beam.color;
    g.addColorStop(0, `rgba(${r}, ${gC}, ${b}, 0)`);
    g.addColorStop(0.25, `rgba(${r}, ${gC}, ${b}, ${beam.alpha})`);
    g.addColorStop(0.72, `rgba(${r}, ${gC}, ${b}, ${beam.alpha * 0.86})`);
    g.addColorStop(1, `rgba(${r}, ${gC}, ${b}, 0)`);
    return g;
  }

  function drawBeam(beam, time, animated) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineGradient(beam);
    ctx.lineWidth = beam.width;
    ctx.shadowBlur = 9;
    ctx.shadowColor = `rgba(${beam.color.join(',')}, .20)`;

    ctx.beginPath();
    ctx.moveTo(beam.x0, beam.y0);
    ctx.lineTo(beam.x1, beam.y1);
    ctx.stroke();

    if (animated) {
      const phase = (time * beam.speed + beam.offset) % 1;
      const pulseStart = Math.max(0, phase - 0.055);
      const pulseEnd = Math.min(1, phase + 0.055);
      const dx = beam.x1 - beam.x0;
      const dy = beam.y1 - beam.y0;
      const [r, gC, b] = beam.color;

      const px0 = beam.x0 + dx * pulseStart;
      const py0 = beam.y0 + dy * pulseStart;
      const px1 = beam.x0 + dx * pulseEnd;
      const py1 = beam.y0 + dy * pulseEnd;

      const pg = ctx.createLinearGradient(px0, py0, px1, py1);
      pg.addColorStop(0, `rgba(${r}, ${gC}, ${b}, 0)`);
      pg.addColorStop(.5, `rgba(${r}, ${gC}, ${b}, .78)`);
      pg.addColorStop(1, `rgba(${r}, ${gC}, ${b}, 0)`);

      ctx.strokeStyle = pg;
      ctx.lineWidth = beam.width + 1.4;
      ctx.shadowBlur = 16;
      ctx.shadowColor = `rgba(${r}, ${gC}, ${b}, .34)`;
      ctx.beginPath();
      ctx.moveTo(px0, py0);
      ctx.lineTo(px1, py1);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawFaintNodes(time, animated) {
    ctx.save();
    ctx.fillStyle = 'rgba(55, 101, 76, .12)';
    for (let i = 0; i < 11; i += 1) {
      const x = ((i * 173.7) % (width + 120)) - 60;
      const baseY = height * (0.18 + ((i * 0.137) % 0.56));
      const y = animated ? baseY + Math.sin(time * 0.00045 + i) * 7 : baseY;
      ctx.beginPath();
      ctx.arc(x, y, i % 3 === 0 ? 2.2 : 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function paint(time = 0, animated = true) {
    ctx.clearRect(0, 0, width, height);
    drawFaintNodes(time, animated);
    beams.forEach(beam => drawBeam(beam, time, animated));
  }

  function drawStatic() {
    paint(0, false);
  }

  function animate(time) {
    paint(time, true);
    animationId = window.requestAnimationFrame(animate);
  }

  function syncMotionPreference() {
    window.cancelAnimationFrame(animationId);
    animationId = 0;
    if (reduceMotion.matches) {
      drawStatic();
    } else {
      animationId = window.requestAnimationFrame(animate);
    }
  }

  function handleVisibility() {
    if (document.hidden) {
      window.cancelAnimationFrame(animationId);
      animationId = 0;
    } else if (!reduceMotion.matches && !animationId) {
      animationId = window.requestAnimationFrame(animate);
    }
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener('resize', resize, { passive: true });
  }

  reduceMotion.addEventListener?.('change', syncMotionPreference);
  document.addEventListener('visibilitychange', handleVisibility);

  resize();
  syncMotionPreference();
})();
