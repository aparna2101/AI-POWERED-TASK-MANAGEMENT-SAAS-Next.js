"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playAiActivationSound } from "@/lib/sound";

/**
 * InteractiveAiNexus3D
 * - Completely NEW 3D architecture: NO center ball with rings!
 * - Signature Brand Colors: Electric Cyan, Emerald Teal, and Warm Gold.
 * - Multi-layer 3D Kinetic Neural Particle Wave & Quantum Lattice.
 * - Interactive Touch & Cursor Physics:
 *   * Finger/cursor acts as an interactive magnetic light beacon displacing particles.
 *   * Clicking or tapping triggers an expanding 3D energy shockwave blast!
 *   * Smooth fluid physics that react immediately on touch and drag.
 */
export default function InteractiveAiNexus3D({ onInteraction }) {
  const mountRef = useRef(null);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;
    const isMobile = window.innerWidth < 768;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b1a, 0.028);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, isMobile ? 22 : 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Interactive Kinetic Neural Fluid Wave (2,200 Particles)
    const particleCount = isMobile ? 1200 : 2200;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Palette: Cyan, Emerald Mint, Warm Amber Gold
    const brandPalette = [
      new THREE.Color(0x00c2ff), // Cyan
      new THREE.Color(0x00e599), // Emerald
      new THREE.Color(0x2dd4bf), // Teal
      new THREE.Color(0xfbbf24), // Gold
    ];

    const gridRows = isMobile ? 30 : 45;
    const gridCols = Math.floor(particleCount / gridRows);
    const spacingX = isMobile ? 0.75 : 0.85;
    const spacingZ = isMobile ? 0.65 : 0.75;
    const startX = -(gridCols * spacingX) / 2;
    const startZ = -(gridRows * spacingZ) / 2;

    for (let i = 0; i < particleCount; i++) {
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);

      const x = startX + col * spacingX + (Math.random() - 0.5) * 0.3;
      const y = -2.8 + Math.sin(col * 0.25) * 0.8 + Math.cos(row * 0.25) * 0.6;
      const z = startZ + row * spacingZ + (Math.random() - 0.5) * 0.3;

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      // Color mapping
      const colorPick = brandPalette[Math.floor(Math.random() * brandPalette.length)];
      colors[i3] = colorPick.r;
      colors[i3 + 1] = colorPick.g;
      colors[i3 + 2] = colorPick.b;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: isMobile ? 0.18 : 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(pGeo, pMat);
    masterGroup.add(particleField);

    // 3. Floating 3D Geometric Quantum Data Shards (Flanking Left & Right)
    // Left: Floating Cyber Monolith with glowing edge rings
    const shardGroupLeft = new THREE.Group();
    shardGroupLeft.position.set(isMobile ? -4.5 : -8.5, 1.5, -2);
    masterGroup.add(shardGroupLeft);

    const monoGeo = new THREE.BoxGeometry(1.4, 3.2, 0.4);
    const monoMat = new THREE.MeshStandardMaterial({
      color: 0x07152b,
      emissive: 0x00c2ff,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.95,
    });
    const monoMesh = new THREE.Mesh(monoGeo, monoMat);
    shardGroupLeft.add(monoMesh);

    const monoWireGeo = new THREE.BoxGeometry(1.45, 3.25, 0.45);
    const monoWireMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      wireframe: true,
    });
    const monoWire = new THREE.Mesh(monoWireGeo, monoWireMat);
    shardGroupLeft.add(monoWire);

    // Right: Floating Golden Hexagonal Prism
    const shardGroupRight = new THREE.Group();
    shardGroupRight.position.set(isMobile ? 4.5 : 8.5, 1.5, -2);
    masterGroup.add(shardGroupRight);

    const prismGeo = new THREE.CylinderGeometry(1.3, 1.3, 2.8, 6);
    const prismMat = new THREE.MeshStandardMaterial({
      color: 0x08152c,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.9,
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    shardGroupRight.add(prismMesh);

    const prismWireGeo = new THREE.CylinderGeometry(1.35, 1.35, 2.85, 6);
    const prismWireMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const prismWire = new THREE.Mesh(prismWireGeo, prismWireMat);
    shardGroupRight.add(prismWire);

    // 4. Interactive Touch / Pointer Beacon (A glowing energy spark that tracks the finger/mouse)
    const beaconGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      transparent: true,
      opacity: 0.9,
    });
    const pointerBeacon = new THREE.Mesh(beaconGeo, beaconMat);
    pointerBeacon.position.set(0, 0, 0);
    masterGroup.add(pointerBeacon);

    // Beacon Glow Halo
    const beaconHaloGeo = new THREE.RingGeometry(0.5, 0.65, 32);
    const beaconHaloMat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const beaconHalo = new THREE.Mesh(beaconHaloGeo, beaconHaloMat);
    pointerBeacon.add(beaconHalo);

    // 5. Shockwave Blast Rings (Triggered on Tap/Click)
    const shockwavePool = [];
    const maxShockwaves = 3;
    for (let i = 0; i < maxShockwaves; i++) {
      const sGeo = new THREE.RingGeometry(0.2, 0.4, 32);
      const sMat = new THREE.MeshBasicMaterial({
        color: 0x00e599,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.rotation.x = -Math.PI / 2.5;
      masterGroup.add(sMesh);
      shockwavePool.push({
        mesh: sMesh,
        active: false,
        radius: 0.2,
        maxRadius: 8.5,
        x: 0,
        y: 0,
        z: 0,
        opacity: 0,
      });
    }

    // 6. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(amb);

    const dirLight1 = new THREE.DirectionalLight(0x00c2ff, 2.5);
    dirLight1.position.set(-10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfbbf24, 2.2);
    dirLight2.position.set(10, 12, 10);
    scene.add(dirLight2);

    // 7. Interactive Touch & Pointer Tracking Logic
    const raycaster = new THREE.Raycaster();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // virtual interaction plane
    const pointerPos3D = new THREE.Vector3(0, -1, 0);
    let isInteracting = false;
    let targetGroupRotY = 0;
    let targetGroupRotX = 0;

    const updatePointer3D = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((clientY - rect.top) / rect.height) * 2 + 1;

      targetGroupRotY = nx * 0.35;
      targetGroupRotX = -ny * 0.2;

      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      const targetPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, targetPoint);
      if (targetPoint) {
        pointerPos3D.copy(targetPoint);
        isInteracting = true;
      }
    };

    const triggerShockwave = (clientX, clientY) => {
      updatePointer3D(clientX, clientY);
      try {
        playAiActivationSound();
      } catch (e) {}

      // Find an inactive shockwave or reuse oldest
      const sw = shockwavePool.find((s) => !s.active) || shockwavePool[0];
      sw.active = true;
      sw.radius = 0.3;
      sw.x = pointerPos3D.x;
      sw.y = pointerPos3D.y;
      sw.z = pointerPos3D.z;
      sw.opacity = 0.9;
      sw.mesh.position.set(sw.x, sw.y, sw.z);
      sw.mesh.material.opacity = sw.opacity;

      // Give surrounding particles an impulse blast
      const pos = particleField.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const dx = pos[i3] - sw.x;
        const dy = pos[i3 + 1] - sw.y;
        const dz = pos[i3 + 2] - sw.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 16) {
          const force = (4.0 - Math.sqrt(distSq)) * 0.15;
          velocities[i3] += dx * force;
          velocities[i3 + 1] += (dy + 0.5) * force;
          velocities[i3 + 2] += dz * force;
        }
      }

      if (onInteraction) onInteraction();
    };

    // Pointer & Touch Listeners directly on canvas container
    const handleMouseMove = (e) => {
      updatePointer3D(e.clientX, e.clientY);
    };

    const handleMouseDown = (e) => {
      triggerShockwave(e.clientX, e.clientY);
      setHintVisible(false);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updatePointer3D(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        triggerShockwave(e.touches[0].clientX, e.touches[0].clientY);
        setHintVisible(false);
      }
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 700;
      if (w && h) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener("resize", onResize);

    // 8. Animation Loop with Physics & Wave Dynamics
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera / group parallax
      masterGroup.rotation.y += (targetGroupRotY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetGroupRotX - masterGroup.rotation.x) * 0.05;

      // Pointer Beacon smooth follow
      pointerBeacon.position.lerp(pointerPos3D, 0.12);
      beaconHalo.rotation.z = elapsed * 2.5;
      const bScale = 1 + Math.sin(elapsed * 4.0) * 0.15;
      beaconHalo.scale.set(bScale, bScale, 1);

      // Flanking Shards animation
      shardGroupLeft.rotation.y = elapsed * 0.4;
      shardGroupLeft.position.y = 1.5 + Math.sin(elapsed * 1.8) * 0.25;
      monoWire.rotation.x = elapsed * 0.3;

      shardGroupRight.rotation.y = -elapsed * 0.35;
      shardGroupRight.position.y = 1.5 + Math.cos(elapsed * 1.6) * 0.25;
      prismWire.rotation.z = elapsed * 0.25;

      // Update Shockwaves
      shockwavePool.forEach((sw) => {
        if (sw.active) {
          sw.radius += 0.25;
          sw.opacity -= 0.025;
          const sc = sw.radius;
          sw.mesh.scale.set(sc, sc, sc);
          sw.mesh.material.opacity = Math.max(0, sw.opacity);
          if (sw.radius >= sw.maxRadius || sw.opacity <= 0) {
            sw.active = false;
            sw.mesh.material.opacity = 0;
          }
        }
      });

      // Update Particle Fluid Wave & Physics
      const pos = particleField.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base sine wave motion
        const origX = originalPositions[i3];
        const origZ = originalPositions[i3 + 2];
        const baseWaveY =
          originalPositions[i3 + 1] +
          Math.sin(elapsed * 2.2 + origX * 0.5) * 0.35 +
          Math.cos(elapsed * 1.8 + origZ * 0.6) * 0.3;

        // Pointer Magnetic Displacement Force
        const dx = pos[i3] - pointerBeacon.position.x;
        const dy = pos[i3 + 1] - pointerBeacon.position.y;
        const dz = pos[i3 + 2] - pointerBeacon.position.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 9.0 && isInteracting) {
          const force = (3.0 - Math.sqrt(distSq)) * 0.04;
          velocities[i3] += dx * force;
          velocities[i3 + 1] += dy * force;
          velocities[i3 + 2] += dz * force;
        }

        // Apply velocity with damping
        pos[i3] += velocities[i3];
        pos[i3 + 1] += velocities[i3 + 1];
        pos[i3 + 2] += velocities[i3 + 2];

        velocities[i3] *= 0.88;
        velocities[i3 + 1] *= 0.88;
        velocities[i3 + 2] *= 0.88;

        // Spring back to base position
        pos[i3] += (origX - pos[i3]) * 0.05;
        pos[i3 + 1] += (baseWaveY - pos[i3 + 1]) * 0.08;
        pos[i3 + 2] += (origZ - pos[i3 + 2]) * 0.05;
      }
      particleField.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      monoGeo.dispose();
      monoMat.dispose();
      monoWireGeo.dispose();
      monoWireMat.dispose();
      prismGeo.dispose();
      prismMat.dispose();
      prismWireGeo.dispose();
      prismWireMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        className="w-full h-full cursor-crosshair select-none"
        title="Tap or drag anywhere to trigger 3D quantum fluid shockwaves"
      />
      {hintVisible && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1 rounded-full bg-[#081734]/80 border border-cyan-500/40 text-[10px] sm:text-xs font-mono font-bold text-cyan-300 backdrop-blur-md shadow-md animate-pulse">
          ✨ Touch or Drag to interact with 3D Neural Fluid
        </div>
      )}
    </div>
  );
}
