"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroThreeScene() {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect mobile to reduce node count
    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire interactive network
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Color palette from TaskAura logo
    const colors = [
      0x1e58ff, // blue
      0x00d2ff, // cyan
      0x6366f1, // indigo
      0x7c3aed, // violet
      0xd946ef, // magenta
      0xff5e3a, // coral
      0xffb800, // warm yellow
    ];

    // 1. Central Glowing AI Core (Icosahedron + Wireframe cage)
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x6366f1,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    networkGroup.add(coreMesh);

    // Wireframe outer halo for AI Core
    const cageGeo = new THREE.IcosahedronGeometry(2.7, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    networkGroup.add(cageMesh);

    // 2. Floating Project Nodes
    const nodeCount = isMobile ? 6 : 12;
    const nodes = [];
    const nodeGeometries = [
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
      new THREE.OctahedronGeometry(0.6),
    ];

    for (let i = 0; i < nodeCount; i++) {
      const geo = nodeGeometries[i % nodeGeometries.length];
      const color = colors[i % colors.length];
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.6,
      });

      const mesh = new THREE.Mesh(geo, mat);
      
      // Orbit radius and angle
      const radius = 5.5 + Math.random() * 3.5;
      const angle = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.5;
      const yOffset = (Math.random() - 0.5) * 5;

      mesh.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );

      mesh.userData = {
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        speed: 0.008 + Math.random() * 0.012,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        orbitRadius: radius,
        currentAngle: angle,
      };

      networkGroup.add(mesh);
      nodes.push(mesh);
    }

    // 3. Connective Network Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const lineCount = nodes.length;
    const linePositions = new Float32Array(lineCount * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
    networkGroup.add(linesMesh);

    // 4. Ambient Sparkle Particles
    const particleCount = isMobile ? 60 : 150;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const tempColor = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      particleCoords[i * 3] = (Math.random() - 0.5) * 28;
      particleCoords[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particleCoords[i * 3 + 2] = (Math.random() - 0.5) * 15;

      tempColor.setHex(colors[Math.floor(Math.random() * colors.length)]);
      particleColors[i * 3] = tempColor.r;
      particleColors[i * 3 + 1] = tempColor.g;
      particleColors[i * 3 + 2] = tempColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particleCoords, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d2ff, 3, 30);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff5e3a, 2.5, 30);
    pointLight2.position.set(-10, -8, 8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xd946ef, 3, 25);
    pointLight3.position.set(0, 0, 8);
    scene.add(pointLight3);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
      targetRotationY = mouseX * 0.45;
      targetRotationX = mouseY * 0.35;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth group rotation toward mouse
      networkGroup.rotation.y += (targetRotationY - networkGroup.rotation.y) * 0.05;
      networkGroup.rotation.x += (targetRotationX - networkGroup.rotation.x) * 0.05;

      // Core rotation & pulse
      coreMesh.rotation.x = elapsedTime * 0.3;
      coreMesh.rotation.y = elapsedTime * 0.4;
      cageMesh.rotation.x = -elapsedTime * 0.2;
      cageMesh.rotation.y = -elapsedTime * 0.3;

      const scalePulse = 1 + Math.sin(elapsedTime * 2) * 0.04;
      coreMesh.scale.set(scalePulse, scalePulse, scalePulse);

      // Rotate nodes & update network lines
      const positions = linesMesh.geometry.attributes.position.array;
      let lineIdx = 0;

      nodes.forEach((node, i) => {
        const u = node.userData;
        u.currentAngle += u.speed;
        node.position.x = Math.cos(u.currentAngle) * u.orbitRadius;
        node.position.z = Math.sin(u.currentAngle) * u.orbitRadius;
        node.position.y = u.baseY + Math.sin(elapsedTime * 1.5 + i) * 0.6;

        node.rotation.x += u.rotSpeedX;
        node.rotation.y += u.rotSpeedY;

        // Line from core (0,0,0) to node
        positions[lineIdx++] = 0;
        positions[lineIdx++] = 0;
        positions[lineIdx++] = 0;

        positions[lineIdx++] = node.position.x;
        positions[lineIdx++] = node.position.y;
        positions[lineIdx++] = node.position.z;
      });

      linesMesh.geometry.attributes.position.needsUpdate = true;

      // Gently rotate ambient particles
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up WebGL resources
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      nodeGeometries.forEach((g) => g.dispose());
      lineGeo.dispose();
      lineMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[520px] lg:min-h-[640px] flex items-center justify-center pointer-events-auto">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD Badges around 3D space */}
      <div className="absolute top-6 left-4 sm:left-10 pointer-events-none rounded-xl bg-white/80 backdrop-blur-md px-3.5 py-2 border border-slate-200/80 shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-bold text-slate-800">AI Core Active</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-0.5">Autonomous Project Mesh</p>
      </div>

      <div className="absolute bottom-8 right-4 sm:right-10 pointer-events-none rounded-xl bg-white/80 backdrop-blur-md px-3.5 py-2 border border-slate-200/80 shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-slate-800">Zero-Latency Sync</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-0.5">99.9% Uptime Telemetry</p>
      </div>
    </div>
  );
}
