"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas({ onCoreClick }) {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Camera distance calibrated so full 3D orbital core spans majestically across hero
    camera.position.z = isMobile ? 16 : 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Master Group for 3D AI Command Center
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Official Palette: Cyan, Teal, Emerald Green, Aqua, Warm Gold
    const palette = [
      0x00c2ff, // Cyan
      0x009f9d, // Teal
      0x00e599, // Emerald Green
      0x2dd4bf, // Aqua
      0xfbbf24, // Warm Amber / Gold
    ];

    // 2. Central AI Intelligence Core
    const coreGroup = new THREE.Group();
    masterGroup.add(coreGroup);

    // A. Inner Radiant Nucleus (Pulsing glowing orb)
    const nucleusGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x00c2ff,
      emissive: 0x00e599,
      emissiveIntensity: 1.4,
      roughness: 0.1,
      metalness: 0.9,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // B. Middle Polyhedral Crystal (Icosahedron geometric lattice)
    const crystalGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x009f9d,
      emissive: 0x00c2ff,
      emissiveIntensity: 0.75,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(crystal);

    // C. Outer Wireframe Casing
    const wireGeo = new THREE.IcosahedronGeometry(3.3, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireCasing = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireCasing);

    // D. Gyroscopic Gimbal Ring 1: Cyan Orbit
    const ring1Geo = new THREE.TorusGeometry(4.3, 0.045, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      transparent: true,
      opacity: 0.75,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    masterGroup.add(ring1);

    // E. Gyroscopic Gimbal Ring 2: Emerald Vertical Orbit
    const ring2Geo = new THREE.TorusGeometry(5.1, 0.05, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      transparent: true,
      opacity: 0.7,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    masterGroup.add(ring2);

    // F. Gyroscopic Gimbal Ring 3: Warm Gold Diagonal Orbit
    const ring3Geo = new THREE.TorusGeometry(5.9, 0.055, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.8,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 4;
    masterGroup.add(ring3);

    // 3. Orbiting Project Nodes & Floating Task Blocks
    const nodeCount = isMobile ? 6 : 12;
    const nodes = [];
    const geometries = [
      new THREE.BoxGeometry(0.7, 0.45, 0.12), // Floating Task Card
      new THREE.OctahedronGeometry(0.5), // Neural Crystal
      new THREE.SphereGeometry(0.38, 16, 16), // Telemetry Node
      new THREE.DodecahedronGeometry(0.48), // Workspace Epic
    ];

    for (let i = 0; i < nodeCount; i++) {
      const geo = geometries[i % geometries.length];
      const color = palette[i % palette.length];
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.55,
        roughness: 0.15,
        metalness: 0.75,
      });

      const mesh = new THREE.Mesh(geo, mat);

      const radius = 6.8 + (i % 3) * 1.8;
      const angle = (i / nodeCount) * Math.PI * 2;
      const yOffset = ((i % 5) - 2) * 1.3;

      mesh.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );

      mesh.userData = {
        radius: radius,
        angle: angle,
        speed: 0.005 + (i % 3) * 0.003,
        baseY: yOffset,
        rotSpeedX: 0.015,
        rotSpeedY: 0.02,
        wobbleSpeed: 1.4 + Math.random(),
      };

      masterGroup.add(mesh);
      nodes.push(mesh);
    }

    // 4. Connective Pulsing Holographic Rays
    const linePositions = new Float32Array(nodeCount * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00c2ff,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
    });
    const connections = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(connections);

    // 5. Ambient Particle Starfield
    const particleCount = isMobile ? 100 : 240;
    const pCoords = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const tempColor = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      pCoords[i * 3] = (Math.random() - 0.5) * 36;
      pCoords[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pCoords[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const hex = palette[Math.floor(Math.random() * palette.length)];
      tempColor.setHex(hex);
      pColors[i * 3] = tempColor.r;
      pColors[i * 3 + 1] = tempColor.g;
      pColors[i * 3 + 2] = tempColor.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pCoords, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 6. Dynamic High-Performance Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00c2ff, 4.2, 40);
    cyanPoint.position.set(12, 10, 14);
    scene.add(cyanPoint);

    const emeraldPoint = new THREE.PointLight(0x00e599, 3.6, 40);
    emeraldPoint.position.set(-14, -10, 12);
    scene.add(emeraldPoint);

    const goldPoint = new THREE.PointLight(0xfbbf24, 3.0, 30);
    goldPoint.position.set(0, 10, -8);
    scene.add(goldPoint);

    // 7. Mouse Depth & Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const normX = (x / rect.width) * 2;
      const normY = -(y / rect.height) * 2;

      targetRotY = normX * 0.4;
      targetRotX = normY * 0.3;
      targetCamX = normX * 1.4;
      targetCamY = normY * 1.0;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 8. 3D SCROLL REACTION: The 3D scene responds and warps as user scrolls!
    let targetScrollY = 0;
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // 9. Animation & Render Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.045;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.045;
      camera.position.x += (targetCamX - camera.position.x) * 0.035;
      camera.position.y += (targetCamY - camera.position.y) * 0.035;

      // Gyroscopic multi-axis rotations
      ring1.rotation.z += 0.004;
      ring2.rotation.x -= 0.0035;
      ring3.rotation.y += 0.003;

      // Core pulsating breathing effect
      const corePulse = 1 + Math.sin(elapsed * 2.4) * 0.05;
      crystal.scale.set(corePulse, corePulse, corePulse);
      nucleus.scale.set(corePulse * 0.98, corePulse * 0.98, corePulse * 0.98);

      crystal.rotation.x = elapsed * 0.35;
      crystal.rotation.y = elapsed * 0.45;
      wireCasing.rotation.x = -elapsed * 0.22;
      wireCasing.rotation.y = -elapsed * 0.3;

      // Update orbiting project nodes & data lines
      const positions = connections.geometry.attributes.position.array;
      let lineIndex = 0;

      nodes.forEach((node, i) => {
        const u = node.userData;
        u.angle += u.speed;
        node.position.x = Math.cos(u.angle) * u.radius;
        node.position.z = Math.sin(u.angle) * u.radius;
        node.position.y = u.baseY + Math.sin(elapsed * u.wobbleSpeed + i) * 0.45;

        node.rotation.x += u.rotSpeedX;
        node.rotation.y += u.rotSpeedY;

        // Line from nucleus (0,0,0) to node
        positions[lineIndex++] = 0;
        positions[lineIndex++] = 0;
        positions[lineIndex++] = 0;

        positions[lineIndex++] = node.position.x;
        positions[lineIndex++] = node.position.y;
        positions[lineIndex++] = node.position.z;
      });

      connections.geometry.attributes.position.needsUpdate = true;

      // Rotate particle constellation
      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = Math.sin(elapsed * 0.015) * 0.04;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      geometries.forEach((g) => g.dispose());
      lineGeo.dispose();
      lineMat.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[580px] sm:min-h-[660px] lg:min-h-[760px] flex items-center justify-center pointer-events-auto">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onClick={onCoreClick}
      />
    </div>
  );
}
