"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * PricingCyberVault3D
 * Unique 3D scene designed specifically for Pricing:
 * - NO central sphere/rings!
 * - Isometric cyber grid horizon floor with moving telemetry lines.
 * - 3 Staggered Tier Pedestals (Left: Starter, Center-Back: Pro, Right: Enterprise).
 * - Floating, spinning 3D Cyber Coins / Value Tokens levitating above each pedestal.
 * - Energy beam pillars & upward particle fountain metrics.
 * - Leaves center heading text readable while framing the scene with 3D depth.
 */
export default function PricingCyberVault3D() {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;
    const isMobile = window.innerWidth < 768;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b1a, 0.035);

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

    // 2. Cyber Horizon Grid Floor (Digital Velocity Matrix)
    const gridHelper = new THREE.GridHelper(36, 36, 0x00c2ff, 0x072545);
    gridHelper.position.y = -4.5;
    masterGroup.add(gridHelper);

    // 3. Three Distinct Tier Pedestals & Floating Tokens
    // Tier 1: Starter (Left) - Cyan
    // Tier 2: Pro (Center elevated/deep) - Gold / Amber
    // Tier 3: Enterprise (Right) - Emerald Green
    const tiers = [
      {
        name: "Starter",
        x: isMobile ? -3.5 : -7.5,
        y: -3.5,
        z: -1,
        color: 0x00c2ff,
        emissive: 0x0077aa,
        tokenType: "cylinder", // Cylindrical Cyber Coin
        scale: 1.0,
      },
      {
        name: "Pro",
        x: 0,
        y: -2.8,
        z: -5, // Pushed further back in Z so heading text is unobstructed!
        color: 0xfbbf24,
        emissive: 0xb45309,
        tokenType: "icosahedron", // Golden Value Gem
        scale: 1.3,
      },
      {
        name: "Enterprise",
        x: isMobile ? 3.5 : 7.5,
        y: -3.5,
        z: -1,
        color: 0x00e599,
        emissive: 0x047857,
        tokenType: "octahedron", // Enterprise Prism
        scale: 1.15,
      },
    ];

    const pedestalMeshes = [];
    const tokenMeshes = [];
    const beamLines = [];

    tiers.forEach((tier) => {
      const tierGroup = new THREE.Group();
      tierGroup.position.set(tier.x, tier.y, tier.z);
      masterGroup.add(tierGroup);

      // A. Hexagonal Pedestal Base
      const baseGeo = new THREE.CylinderGeometry(1.6 * tier.scale, 1.9 * tier.scale, 1.2, 6);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x08152c,
        emissive: tier.color,
        emissiveIntensity: 0.35,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: false,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      tierGroup.add(baseMesh);

      // Pedestal Glowing Rim Wireframe
      const wireGeo = new THREE.CylinderGeometry(1.62 * tier.scale, 1.92 * tier.scale, 1.22, 6);
      const wireMat = new THREE.MeshBasicMaterial({
        color: tier.color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      tierGroup.add(wireMesh);
      pedestalMeshes.push(wireMesh);

      // B. Floating Token Geometry
      let tokenGeo;
      if (tier.tokenType === "cylinder") {
        tokenGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.22, 24);
        tokenGeo.rotateX(Math.PI / 2);
      } else if (tier.tokenType === "icosahedron") {
        tokenGeo = new THREE.IcosahedronGeometry(0.85 * tier.scale, 0);
      } else {
        tokenGeo = new THREE.OctahedronGeometry(0.9 * tier.scale, 0);
      }

      const tokenMat = new THREE.MeshStandardMaterial({
        color: tier.color,
        emissive: tier.emissive,
        emissiveIntensity: 1.2,
        roughness: 0.15,
        metalness: 0.95,
      });
      const tokenMesh = new THREE.Mesh(tokenGeo, tokenMat);
      tokenMesh.position.y = 2.2 * tier.scale;
      tierGroup.add(tokenMesh);
      tokenMeshes.push({ mesh: tokenMesh, baseY: tokenMesh.position.y, tier });

      // C. Upward Holographic Energy Rings hovering around the token
      const haloGeo = new THREE.TorusGeometry(1.3 * tier.scale, 0.03, 16, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: tier.color,
        transparent: true,
        opacity: 0.45,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.y = tokenMesh.position.y;
      haloMesh.rotation.x = Math.PI / 2;
      tierGroup.add(haloMesh);

      // D. Vertical Energy Beam (Translucent Cylinder from base to token)
      const beamGeo = new THREE.CylinderGeometry(0.08, 0.25, 2.0 * tier.scale, 12, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: tier.color,
        transparent: true,
        opacity: 0.35,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.y = 1.1 * tier.scale;
      tierGroup.add(beamMesh);
      beamLines.push(beamMesh);
    });

    // 4. Floating Currency & Value Symbol Particles
    const pCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pPositions[i3] = (Math.random() - 0.5) * 28;
      pPositions[i3 + 1] = Math.random() * 12 - 4;
      pPositions[i3 + 2] = (Math.random() - 0.5) * 16 - 2;

      // Random color among Cyan, Gold, Emerald
      const rand = Math.random();
      if (rand < 0.33) {
        pColors[i3] = 0.0;
        pColors[i3 + 1] = 0.76;
        pColors[i3 + 2] = 1.0;
      } else if (rand < 0.66) {
        pColors[i3] = 0.98;
        pColors[i3 + 1] = 0.75;
        pColors[i3 + 2] = 0.14;
      } else {
        pColors[i3] = 0.0;
        pColors[i3 + 1] = 0.9;
        pColors[i3 + 2] = 0.6;
      }
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(pGeo, pMat);
    masterGroup.add(particles);

    // 5. Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x00c2ff, 2.5);
    dirLight1.position.set(-10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfbbf24, 2.0);
    dirLight2.position.set(0, 10, -5);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x00e599, 2.2);
    dirLight3.position.set(10, 12, 10);
    scene.add(dirLight3);

    // 6. Interactive Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = nx * 0.3;
      targetY = ny * 0.2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Resize
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

    // 7. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax
      masterGroup.rotation.y += (targetX - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (-targetY - masterGroup.rotation.x) * 0.05;

      // Animate Cyber Grid (subtle forward glide)
      gridHelper.position.z = (elapsed * 0.8) % 1.0 - 0.5;

      // Animate Tier Tokens
      tokenMeshes.forEach((item, idx) => {
        item.mesh.rotation.y = elapsed * (0.8 + idx * 0.3);
        item.mesh.rotation.x = Math.sin(elapsed * 1.5 + idx) * 0.2;
        // Levitating vertical float
        item.mesh.position.y = item.baseY + Math.sin(elapsed * 2.0 + idx * 1.8) * 0.25;
      });

      // Pulse pedestal rims
      pedestalMeshes.forEach((mesh, idx) => {
        mesh.rotation.y = elapsed * 0.1 * (idx % 2 === 0 ? 1 : -1);
      });

      // Float upward particles
      const pos = particles.geometry.attributes.position.array;
      for (let i = 1; i < pos.length; i += 3) {
        pos[i] += 0.025;
        if (pos[i] > 8) {
          pos[i] = -4.5;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      gridHelper.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative pointer-events-none"
    />
  );
}
