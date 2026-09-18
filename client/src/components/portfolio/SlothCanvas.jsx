import React, { useEffect, useRef, useState } from 'react';

/**
 * Interactive Sloth Character (Scrolltide "Amble" Aesthetic)
 * - Eyes, pupils, and head rotate and track the mouse cursor across the screen
 * - Blinks naturally at random intervals
 * - Reacts with facial expressions (happy squint on hover, curious focus)
 * - Wanders off into a slow gentle sweep when idle for >7 seconds
 */
export const SlothCanvas = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = 440);
    let height = (canvas.height = 480);

    // Target tracking coordinates (normalized -1 to 1)
    let targetLookX = 0;
    let targetLookY = 0;
    let currentLookX = 0;
    let currentLookY = 0;

    // Head orientation
    let headAngle = 0;
    let targetHeadAngle = 0;

    // Blink state
    let blinkProgress = 0; // 0 (open) to 1 (closed)
    let isBlinking = false;
    let nextBlinkTime = Date.now() + 3000;

    // Idle wandering state
    let lastMouseMoveTime = Date.now();
    const IDLE_TIMEOUT_MS = 7000; // 7 seconds

    // Breathing / ambient time
    let time = 0;

    const handleMouseMove = (e) => {
      lastMouseMoveTime = Date.now();
      const rect = canvas.getBoundingClientRect();
      const slothCenterX = rect.left + rect.width / 2;
      const slothCenterY = rect.top + rect.height * 0.45;

      const dx = (e.clientX - slothCenterX) / (window.innerWidth / 2);
      const dy = (e.clientY - slothCenterY) / (window.innerHeight / 2);

      // Clamp between -1 and 1 with smooth curve
      targetLookX = Math.max(-1, Math.min(1, dx));
      targetLookY = Math.max(-1, Math.min(1, dy));
      targetHeadAngle = targetLookX * 0.18; // slight head roll
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += 0.03;
      const now = Date.now();

      // Check if idle -> wander gently
      if (now - lastMouseMoveTime > IDLE_TIMEOUT_MS) {
        const wanderSpeed = 0.4;
        targetLookX = Math.sin(time * wanderSpeed) * 0.65;
        targetLookY = Math.cos(time * wanderSpeed * 0.7) * 0.35 + 0.1;
        targetHeadAngle = Math.sin(time * wanderSpeed * 0.5) * 0.12;
      }

      // Smooth lerp for tracking
      currentLookX += (targetLookX - currentLookX) * 0.08;
      currentLookY += (targetLookY - currentLookY) * 0.08;
      headAngle += (targetHeadAngle - headAngle) * 0.06;

      // Handle natural blinking
      if (!isBlinking && now > nextBlinkTime) {
        isBlinking = true;
      }
      if (isBlinking) {
        blinkProgress += 0.15;
        if (blinkProgress >= 1) {
          blinkProgress = 0;
          isBlinking = false;
          nextBlinkTime = now + 2500 + Math.random() * 4000;
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Sloth center coordinates
      const cx = width / 2;
      const cy = height * 0.52;

      // Gentle breathing scale
      const breathScale = 1 + Math.sin(time * 0.8) * 0.015;
      const headOffsetY = Math.sin(time * 0.8) * 3;

      ctx.save();
      ctx.translate(cx, cy + headOffsetY);
      ctx.scale(breathScale, breathScale);

      // -------------------------------------------------------------
      // 1. Sloth Body & Shoulders (Felted warm brown texture)
      // -------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, 150, 140, 100, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#6E5D4F'; // warm felted fur brown
      ctx.fill();

      // Body subtle shadow & felt gradient
      const bodyGrad = ctx.createLinearGradient(0, 70, 0, 240);
      bodyGrad.addColorStop(0, 'rgba(0,0,0,0)');
      bodyGrad.addColorStop(1, 'rgba(0,0,0,0.3)');
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // 2. Head with 3D Rotation & Tilt
      // -------------------------------------------------------------
      ctx.save();
      // Head shift based on look direction
      const headShiftX = currentLookX * 16;
      const headShiftY = currentLookY * 12;
      ctx.translate(headShiftX, headShiftY);
      ctx.rotate(headAngle);

      // Left & Right Cute Ears
      ctx.fillStyle = '#5A4A3E';
      ctx.beginPath();
      ctx.arc(-110, -35, 24, 0, Math.PI * 2);
      ctx.arc(110, -35, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#826E5F';
      ctx.beginPath();
      ctx.arc(-110, -35, 14, 0, Math.PI * 2);
      ctx.arc(110, -35, 14, 0, Math.PI * 2);
      ctx.fill();

      // Head Main Fur (Rounded felt shape)
      ctx.beginPath();
      ctx.ellipse(0, -10, 125, 115, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#786657'; // Felted warm coat
      ctx.fill();

      // Fur felt edge texture highlights
      ctx.strokeStyle = '#8E7B6C';
      ctx.lineWidth = 4;
      ctx.stroke();

      // -------------------------------------------------------------
      // 3. Sloth Cream Face Mask (Heart-like curved mask)
      // -------------------------------------------------------------
      const maskShiftX = currentLookX * 10;
      const maskShiftY = currentLookY * 8;
      ctx.save();
      ctx.translate(maskShiftX, maskShiftY);

      ctx.beginPath();
      ctx.ellipse(0, -5, 92, 80, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#E8DFD3'; // Cream/Off-white felt face
      ctx.fill();

      // -------------------------------------------------------------
      // 4. Iconic Sloth Eye Patches (Dark characteristic bands)
      // -------------------------------------------------------------
      // Left eye patch
      ctx.save();
      ctx.translate(-42, -18);
      ctx.rotate(-0.25);
      ctx.beginPath();
      ctx.ellipse(0, 0, 32, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#4A3B30'; // Dark chocolate patch
      ctx.fill();
      ctx.restore();

      // Right eye patch
      ctx.save();
      ctx.translate(42, -18);
      ctx.rotate(0.25);
      ctx.beginPath();
      ctx.ellipse(0, 0, 32, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#4A3B30';
      ctx.fill();
      ctx.restore();

      // -------------------------------------------------------------
      // 5. Interactive Eyes & Pupils (Tracking cursor!)
      // -------------------------------------------------------------
      const pupilMaxOffset = 7.5;
      const eyeLookX = currentLookX * pupilMaxOffset;
      const eyeLookY = currentLookY * pupilMaxOffset;

      const drawEye = (eyeCenterX, eyeCenterY) => {
        ctx.save();
        ctx.translate(eyeCenterX, eyeCenterY);

        // Eye White / Socket
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Dark Iris / Pupil (Tracks cursor!)
        ctx.beginPath();
        ctx.arc(eyeLookX, eyeLookY, 7.5, 0, Math.PI * 2);
        ctx.fillStyle = '#1D1917'; // Deep black pupil
        ctx.fill();

        // Catchlight sparkle (Light reflection)
        ctx.beginPath();
        ctx.arc(eyeLookX - 2.5, eyeLookY - 2.5, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeLookX + 2, eyeLookY + 2, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        // Eyelid / Blink animation (or happy squint on hover)
        let closeAmount = blinkProgress;
        if (isHovered) {
          closeAmount = Math.max(closeAmount, 0.4); // cute happy squint
        }

        if (closeAmount > 0) {
          ctx.beginPath();
          ctx.rect(-15, -15, 30, 30 * closeAmount);
          ctx.fillStyle = '#4A3B30'; // Match dark eye patch
          ctx.fill();

          // Eyelid crease line
          ctx.strokeStyle = '#2F231A';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-12, -15 + 30 * closeAmount);
          ctx.quadraticCurveTo(0, -12 + 30 * closeAmount, 12, -15 + 30 * closeAmount);
          ctx.stroke();
        }

        ctx.restore();
      };

      drawEye(-40, -16);
      drawEye(40, -16);

      // -------------------------------------------------------------
      // 6. Cute Snout, Nose & Smile
      // -------------------------------------------------------------
      const snoutShiftX = currentLookX * 5;
      const snoutShiftY = currentLookY * 4;
      ctx.save();
      ctx.translate(snoutShiftX, snoutShiftY);

      // Snout oval base
      ctx.beginPath();
      ctx.ellipse(0, 16, 30, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#D6C8B8';
      ctx.fill();

      // Soft rounded Nose
      ctx.beginPath();
      ctx.ellipse(0, 9, 14, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#261F1A';
      ctx.fill();

      // Nose shine
      ctx.beginPath();
      ctx.ellipse(-3, 7, 4, 2.5, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      // Gentle Smile
      ctx.strokeStyle = '#261F1A';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      if (isHovered) {
        // Wider happy smile on hover!
        ctx.arc(0, 16, 12, 0.2 * Math.PI, 0.8 * Math.PI, false);
      } else {
        // Calm gentle smile
        ctx.arc(0, 18, 9, 0.25 * Math.PI, 0.75 * Math.PI, false);
      }
      ctx.stroke();

      ctx.restore(); // end snout

      ctx.restore(); // end mask
      ctx.restore(); // end head
      ctx.restore(); // end sloth

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }}
      />
    </div>
  );
};
