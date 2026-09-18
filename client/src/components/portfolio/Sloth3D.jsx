import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Realistic 3D Interactive Sloth (Scrolltide Amble Template)
 * - Built with Three.js WebGL 3D Mesh Hierarchy
 * - Real-time 3D Head rotation, Neck Pivot, and Eyeball tracking
 * - 3D Eyelid blinking & smiling squint on hover
 * - Studio soft lighting, rim highlights & shadows
 * - Idle wandering animation after 7 seconds
 */
export const Sloth3D = ({ className = "" }) => {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 500;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // 3. Studio Lighting (Soft Dove Blue Studio feel)
    const ambientLight = new THREE.AmbientLight(0xf2f5f8, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    mainLight.position.set(3, 4, 4);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.001;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x8ea3b0, 1.2);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd05a3f, 0.9);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // 4. Materials (Tactile Felt & Soft Fur)
    const feltFurMaterial = new THREE.MeshStandardMaterial({
      color: 0x766252, // Warm felted sloth brown
      roughness: 0.92,
      metalness: 0.05,
    });

    const chestFurMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a7665,
      roughness: 0.95,
      metalness: 0.02,
    });

    const faceMaskMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8dfd2, // Creamy off-white mask
      roughness: 0.88,
      metalness: 0.02,
    });

    const eyePatchMaterial = new THREE.MeshStandardMaterial({
      color: 0x382a20, // Dark chocolate eye patch
      roughness: 0.9,
    });

    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
    });

    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.05,
      metalness: 0.3,
    });

    const noseMaterial = new THREE.MeshStandardMaterial({
      color: 0x221a16,
      roughness: 0.5,
      metalness: 0.1,
    });

    // 5. 3D Sloth Mesh Construction
    const slothRoot = new THREE.Group();
    scene.add(slothRoot);
    slothRoot.position.y = -0.4;

    // --- Body / Torso ---
    const bodyGroup = new THREE.Group();
    slothRoot.add(bodyGroup);

    const bodyGeo = new THREE.SphereGeometry(1.05, 32, 32);
    bodyGeo.scale(1.1, 1.35, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeo, feltFurMaterial);
    bodyMesh.position.set(0, -0.6, -0.1);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bodyGroup.add(bodyMesh);

    // Chest fluff
    const chestGeo = new THREE.SphereGeometry(0.75, 24, 24);
    chestGeo.scale(0.9, 1.1, 0.4);
    const chestMesh = new THREE.Mesh(chestGeo, chestFurMaterial);
    chestMesh.position.set(0, -0.45, 0.68);
    bodyGroup.add(chestMesh);

    // Cute curved arms resting forward
    const armGeo = new THREE.CylinderGeometry(0.24, 0.28, 1.1, 16);
    const leftArm = new THREE.Mesh(armGeo, feltFurMaterial);
    leftArm.position.set(-0.95, -0.7, 0.35);
    leftArm.rotation.set(0.3, 0, 0.45);
    leftArm.castShadow = true;
    bodyGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, feltFurMaterial);
    rightArm.position.set(0.95, -0.7, 0.35);
    rightArm.rotation.set(0.3, 0, -0.45);
    rightArm.castShadow = true;
    bodyGroup.add(rightArm);

    // --- Head Group (Pivot at neck) ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.65, 0.1);
    slothRoot.add(headGroup);

    // Main Skull
    const skullGeo = new THREE.SphereGeometry(0.9, 32, 32);
    skullGeo.scale(1.08, 0.98, 0.95);
    const skullMesh = new THREE.Mesh(skullGeo, feltFurMaterial);
    skullMesh.castShadow = true;
    headGroup.add(skullMesh);

    // Left & Right Ears
    const earGeo = new THREE.SphereGeometry(0.24, 16, 16);
    earGeo.scale(0.9, 1.1, 0.5);
    const leftEar = new THREE.Mesh(earGeo, feltFurMaterial);
    leftEar.position.set(-0.9, 0.2, -0.15);
    leftEar.rotation.set(0, -0.4, -0.3);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, feltFurMaterial);
    rightEar.position.set(0.9, 0.2, -0.15);
    rightEar.rotation.set(0, 0.4, 0.3);
    headGroup.add(rightEar);

    // --- Face Mask (Cream Felt) ---
    const maskGeo = new THREE.SphereGeometry(0.68, 32, 32);
    maskGeo.scale(1.15, 0.9, 0.5);
    const maskMesh = new THREE.Mesh(maskGeo, faceMaskMaterial);
    maskMesh.position.set(0, -0.05, 0.68);
    headGroup.add(maskMesh);

    // --- Dark Chocolate Eye Patches ---
    const patchGeo = new THREE.SphereGeometry(0.28, 20, 20);
    patchGeo.scale(1.25, 0.75, 0.35);

    const leftPatch = new THREE.Mesh(patchGeo, eyePatchMaterial);
    leftPatch.position.set(-0.34, 0.05, 0.92);
    leftPatch.rotation.set(-0.05, -0.15, -0.3);
    headGroup.add(leftPatch);

    const rightPatch = new THREE.Mesh(patchGeo, eyePatchMaterial);
    rightPatch.position.set(0.34, 0.05, 0.92);
    rightPatch.rotation.set(-0.05, 0.15, 0.3);
    headGroup.add(rightPatch);

    // --- 3D Eyeballs (Track cursor in 3D!) ---
    const eyeGeo = new THREE.SphereGeometry(0.12, 24, 24);

    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.32, 0.06, 0.98);
    headGroup.add(leftEyeGroup);

    const leftEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMaterial);
    leftEyeGroup.add(leftEyeWhite);

    const pupilGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(0, 0, 0.085);
    leftEyeGroup.add(leftPupil);

    // Catchlight highlight
    const sparkleGeo = new THREE.SphereGeometry(0.022, 8, 8);
    const sparkleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftSparkle = new THREE.Mesh(sparkleGeo, sparkleMat);
    leftSparkle.position.set(-0.025, 0.025, 0.12);
    leftEyeGroup.add(leftSparkle);

    // Right Eye
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.32, 0.06, 0.98);
    headGroup.add(rightEyeGroup);

    const rightEyeWhite = new THREE.Mesh(eyeGeo, eyeWhiteMaterial);
    rightEyeGroup.add(rightEyeWhite);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0, 0, 0.085);
    rightEyeGroup.add(rightPupil);

    const rightSparkle = new THREE.Mesh(sparkleGeo, sparkleMat);
    rightSparkle.position.set(-0.025, 0.025, 0.12);
    rightEyeGroup.add(rightSparkle);

    // --- 3D Eyelids (Blink mesh) ---
    const eyelidGeo = new THREE.SphereGeometry(0.13, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const leftEyelid = new THREE.Mesh(eyelidGeo, eyePatchMaterial);
    leftEyelid.position.set(-0.32, 0.06, 0.98);
    leftEyelid.rotation.x = -Math.PI * 0.55;
    headGroup.add(leftEyelid);

    const rightEyelid = new THREE.Mesh(eyelidGeo, eyePatchMaterial);
    rightEyelid.position.set(0.32, 0.06, 0.98);
    rightEyelid.rotation.x = -Math.PI * 0.55;
    headGroup.add(rightEyelid);

    // --- Snout & Nose ---
    const snoutGeo = new THREE.SphereGeometry(0.26, 24, 24);
    snoutGeo.scale(1.15, 0.85, 0.7);
    const snoutMesh = new THREE.Mesh(snoutGeo, faceMaskMaterial);
    snoutMesh.position.set(0, -0.18, 0.97);
    headGroup.add(snoutMesh);

    const noseGeo = new THREE.SphereGeometry(0.1, 16, 16);
    noseGeo.scale(1.3, 0.85, 0.7);
    const noseMesh = new THREE.Mesh(noseGeo, noseMaterial);
    noseMesh.position.set(0, -0.12, 1.15);
    headGroup.add(noseMesh);

    // Gentle 3D Smile (Torus curve)
    const smileGeo = new THREE.TorusGeometry(0.11, 0.016, 8, 20, Math.PI * 0.75);
    const smileMesh = new THREE.Mesh(smileGeo, noseMaterial);
    smileMesh.position.set(0, -0.22, 1.13);
    smileMesh.rotation.set(Math.PI * 0.9, 0, Math.PI * 0.62);
    headGroup.add(smileMesh);

    // 6. Interactive 3D Cursor Tracking & Physics
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    let targetEyeX = 0;
    let targetEyeY = 0;
    let currentEyeX = 0;
    let currentEyeY = 0;

    let blink = 0; // 0 = open, 1 = closed
    let isBlinking = false;
    let nextBlink = Date.now() + 2500;

    let lastMoveTime = Date.now();
    const IDLE_TIME_MS = 7000;

    const onMouseMove = (e) => {
      lastMoveTime = Date.now();
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      // 3D Head rotation target angles (up to 35 deg yaw, 25 deg pitch)
      targetRotY = nx * 0.65;
      targetRotX = -ny * 0.45;

      // Eyeball tracking offsets
      targetEyeX = nx * 0.4;
      targetEyeY = ny * 0.35;
    };

    window.addEventListener('mousemove', onMouseMove);

    // 7. Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const now = Date.now();

      // Idle wandering after 7s
      if (now - lastMoveTime > IDLE_TIME_MS) {
        targetRotY = Math.sin(elapsedTime * 0.45) * 0.55;
        targetRotX = Math.cos(elapsedTime * 0.35) * 0.25 + 0.05;
        targetEyeX = Math.sin(elapsedTime * 0.45) * 0.35;
        targetEyeY = Math.cos(elapsedTime * 0.35) * 0.2;
      }

      // Smooth Spring Lerp
      currentRotY += (targetRotY - currentRotY) * 0.07;
      currentRotX += (targetRotX - currentRotX) * 0.07;
      currentEyeX += (targetEyeX - currentEyeX) * 0.1;
      currentEyeY += (targetEyeY - currentEyeY) * 0.1;

      // Apply 3D rotation to Head & Body
      headGroup.rotation.y = currentRotY;
      headGroup.rotation.x = currentRotX;
      headGroup.rotation.z = -currentRotY * 0.15; // Natural neck roll

      bodyGroup.rotation.y = currentRotY * 0.3;
      bodyGroup.rotation.x = currentRotX * 0.15;

      // Breathing scale
      const breath = 1 + Math.sin(elapsedTime * 1.2) * 0.012;
      slothRoot.scale.set(breath, breath, breath);

      // Eyeball 3D rotation
      leftEyeGroup.rotation.y = currentEyeX;
      leftEyeGroup.rotation.x = -currentEyeY;
      rightEyeGroup.rotation.y = currentEyeX;
      rightEyeGroup.rotation.x = -currentEyeY;

      // Handle Blinking
      if (!isBlinking && now > nextBlink) {
        isBlinking = true;
      }
      if (isBlinking) {
        blink += 0.18;
        if (blink >= 1) {
          blink = 0;
          isBlinking = false;
          nextBlink = now + 2500 + Math.random() * 4500;
        }
      }

      // Eyelid angle
      const targetEyelidAngle = -Math.PI * 0.55 + blink * (Math.PI * 0.55);
      leftEyelid.rotation.x = targetEyelidAngle;
      rightEyelid.rotation.x = targetEyelidAngle;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
};
