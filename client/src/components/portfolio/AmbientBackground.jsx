import React, { useEffect, useRef } from 'react';

export const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGlobe();
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking with inertia
    const mouse = {
      x: width * 0.65,
      y: height * 0.4,
      targetX: width * 0.65,
      targetY: height * 0.4,
      isHovering: false
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width * 0.65;
      mouse.targetY = height * 0.4;
      mouse.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // --- 3D Globe Parameters ---
    const GLOBE_POINT_COUNT = 240;
    let globeRadius = Math.min(width, height) * 0.32;
    if (globeRadius < 180) globeRadius = 180;
    if (globeRadius > 340) globeRadius = 340;

    let globeCenter = {
      x: width > 1024 ? width * 0.72 : width * 0.5,
      y: width > 1024 ? Math.min(height * 0.42, 380) : Math.min(height * 0.38, 320)
    };

    // Generate points on sphere using Fibonacci distribution
    let spherePoints = [];
    const initGlobe = () => {
      globeRadius = Math.min(width, height) * 0.32;
      if (globeRadius < 180) globeRadius = 180;
      if (globeRadius > 340) globeRadius = 340;

      globeCenter = {
        x: width > 1024 ? width * 0.72 : width * 0.5,
        y: width > 1024 ? Math.min(height * 0.42, 380) : Math.min(height * 0.38, 320)
      };

      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
      spherePoints = [];

      for (let i = 0; i < GLOBE_POINT_COUNT; i++) {
        const y = 1 - (i / (GLOBE_POINT_COUNT - 1)) * 2; // y goes from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y); // radius at y
        const theta = phi * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        spherePoints.push({
          baseX: x,
          baseY: y,
          baseZ: z,
          // Displacement physics for interactive ripples
          dx: 0,
          dy: 0,
          dz: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 1.5 + Math.random() * 1.5,
          size: 1.5 + Math.random() * 1.8
        });
      }
    };

    initGlobe();

    // Floating background ambient particles
    const AMBIENT_COUNT = 32;
    const ambientParticles = Array.from({ length: AMBIENT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.3 + 0.1
    }));

    // Rotation angles
    let angleX = 0.2;
    let angleY = 0;
    let angleZ = 0.05;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // Smooth mouse inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Cursor-driven rotation tilt
      const targetAngleX = 0.15 + ((mouse.y - globeCenter.y) / height) * 0.6;
      const targetAngleY = time * 0.25 + ((mouse.x - globeCenter.x) / width) * 1.2;

      angleX += (targetAngleX - angleX) * 0.04;
      angleY = targetAngleY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // 1. Subtle radial light spotlight behind globe
      const radialGrad = ctx.createRadialGradient(
        globeCenter.x,
        globeCenter.y,
        30,
        globeCenter.x,
        globeCenter.y,
        globeRadius * 1.6
      );
      if (isDark) {
        radialGrad.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
        radialGrad.addColorStop(0.4, 'rgba(161, 161, 170, 0.025)');
        radialGrad.addColorStop(1, 'rgba(10, 11, 13, 0)');
      } else {
        radialGrad.addColorStop(0, 'rgba(24, 24, 27, 0.04)');
        radialGrad.addColorStop(0.4, 'rgba(82, 82, 91, 0.015)');
        radialGrad.addColorStop(1, 'rgba(245, 245, 247, 0)');
      }
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Full-Screen Ambient Particles
      const ambientColor = isDark ? '244, 244, 245' : '39, 39, 42';
      ambientParticles.forEach((p, i) => {
        p.x += p.vx + Math.sin(time * 0.5 + i) * 0.1;
        p.y += p.vy + Math.cos(time * 0.5 + i) * 0.1;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ambientColor}, ${p.alpha * 0.35})`;
        ctx.fill();

        for (let j = i + 1; j < ambientParticles.length; j++) {
          const p2 = ambientParticles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${ambientColor}, ${(1 - dist / 110) * 0.06})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      // 3. Transform & Project 3D Globe Points
      const projected = [];
      const fov = 700;

      for (let i = 0; i < spherePoints.length; i++) {
        const pt = spherePoints[i];

        // Breathing organic pulse on sphere surface
        const pulse = 1 + Math.sin(time * pt.pulseSpeed + pt.pulseOffset) * 0.035;
        const currentR = globeRadius * pulse;

        // Base 3D Coordinates
        let x = pt.baseX * currentR + pt.dx;
        let y = pt.baseY * currentR + pt.dy;
        let z = pt.baseZ * currentR + pt.dz;

        // Interactive spring physics return to base
        pt.vx += -pt.dx * 0.06;
        pt.vy += -pt.dy * 0.06;
        pt.vz += -pt.dz * 0.06;
        pt.vx *= 0.88;
        pt.vy *= 0.88;
        pt.vz *= 0.88;
        pt.dx += pt.vx;
        pt.dy += pt.vy;
        pt.dz += pt.vz;

        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;

        // Rotate X
        let y2 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = y2 * cosZ + x1 * sinZ;
        let z3 = z2;

        // Perspective Projection
        const scale = fov / (fov + z3 + globeRadius);
        const px = globeCenter.x + x3 * scale;
        const py = globeCenter.y + y3 * scale;

        // Interactive mouse disturbance / magnetic push
        const distToMouse = Math.hypot(px - mouse.x, py - mouse.y);
        if (distToMouse < 90 && mouse.isHovering) {
          const force = (1 - distToMouse / 90) * 8;
          const angle = Math.atan2(py - mouse.y, px - mouse.x);
          pt.vx += Math.cos(angle) * force * 0.4;
          pt.vy += Math.sin(angle) * force * 0.4;
          pt.vz += (Math.random() - 0.5) * force * 0.3;
        }

        // Depth factor (0 = far back, 1 = front center)
        const depth = Math.max(0, Math.min(1, (z3 + globeRadius) / (globeRadius * 2)));

        projected.push({
          px,
          py,
          scale,
          depth,
          rawZ: z3,
          size: pt.size * scale,
          index: i
        });
      }

      // 4. Draw Globe Constellation Filaments / Great Circle Links
      const maxConnectDist = globeRadius * 0.32;
      const globeLineColor = isDark ? '244, 244, 245' : '24, 24, 27';

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        // Only connect if not too deep in the background
        if (p1.depth < 0.15) continue;

        let connections = 0;
        for (let j = i + 1; j < projected.length && connections < 4; j++) {
          const p2 = projected[j];
          if (p2.depth < 0.15) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist2D = Math.hypot(dx, dy);

          if (dist2D < maxConnectDist) {
            connections++;
            const alpha = (1 - dist2D / maxConnectDist) * Math.min(p1.depth, p2.depth) * (isDark ? 0.22 : 0.14);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(${globeLineColor}, ${alpha})`;
            ctx.lineWidth = 0.75 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // 5. Draw 3D Globe Nodes (Sorted by Z for proper depth sorting)
      projected.sort((a, b) => a.rawZ - b.rawZ);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.pow(p.depth, 1.4) * 0.85 + 0.1;
        const radius = Math.max(0.6, p.size * (0.6 + p.depth * 0.8));

        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);

        if (isDark) {
          // Platinum/Silver core with halo glow
          ctx.fillStyle = `rgba(244, 244, 245, ${alpha})`;
          ctx.fill();

          if (p.depth > 0.75) {
            ctx.beginPath();
            ctx.arc(p.px, p.py, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${(p.depth - 0.75) * 0.35})`;
            ctx.fill();
          }
        } else {
          // Obsidian Carbon core
          ctx.fillStyle = `rgba(24, 24, 27, ${alpha * 0.85})`;
          ctx.fill();
        }
      }

      // 6. Draw Subtle Equatorial Orbital Ring
      const ringRadius = globeRadius * 1.14;
      const ringSegments = 48;
      ctx.beginPath();
      for (let i = 0; i <= ringSegments; i++) {
        const theta = (i / ringSegments) * Math.PI * 2 + time * 0.4;
        const rx = Math.cos(theta) * ringRadius;
        const ry = 0;
        const rz = Math.sin(theta) * ringRadius;

        // Rotate Y
        let rx1 = rx * cosY - rz * sinY;
        let rz1 = rz * cosY + rx * sinY;

        // Rotate X
        let ry2 = ry * cosX - rz1 * sinX;
        let rz2 = rz1 * cosX + ry * sinX;

        // Rotate Z
        let rx3 = rx1 * cosZ - ry2 * sinZ;
        let ry3 = ry2 * cosZ + rx1 * sinZ;

        const scale = fov / (fov + rz2 + globeRadius);
        const px = globeCenter.x + rx3 * scale;
        const py = globeCenter.y + ry3 * scale;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(24, 24, 27, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 3D Particle Physics Globe Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Ambient Radial Aura */}
      <div className="tide-glow top-[-100px] left-[15%] animate-pulse-subtle" />
      <div className="tide-glow bottom-[10%] right-[-100px] opacity-40 animate-float" />

      {/* Analog Grain Texture */}
      <div className="grain-overlay" />
    </div>
  );
};
