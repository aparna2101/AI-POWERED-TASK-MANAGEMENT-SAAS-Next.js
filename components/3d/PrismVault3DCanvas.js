"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function PrismVault3DCanvas() {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 18 : 13;

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

    // 1. Central Multifaceted Holographic Crystal (Icosahedron Prism)
    const prismGeo = new THREE.IcosahedronGeometry(2.4, 0);
    const prismMat = new THREE.MeshStandardMaterial({
      color: 0x091b38,
      emissive: 0x00c2ff,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    masterGroup.add(prismMesh);

    // Wireframe Prism Shell
    const wireGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24, // Gold wireframe
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // 2. Three Concentric Tier Orbit Rings (Starter, Pro, Enterprise)
    const tierRings = [];
    const ringColors = [0x00c2ff, 0x00e599, 0xfbbf24];
    const ringRadii = [3.8, 4.8, 5.8];

    ringColors.forEach((color, i) => {
      const rGeo = new THREE.TorusGeometry(ringRadii[i], 0.04, 16, 64);
      const rMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(rGeo, rMat);
      ringMesh.rotation.x = Math.PI / (2 + i * 0.4);
      ringMesh.rotation.y = Math.PI / (3 + i * 0.5);
      masterGroup.add(ringMesh);
      tierRings.push(ringMesh);
    });

    // 3. Floating Token Cubes (Tier Entitlements)
    const tokenGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const tokenNodes = [];
    for (let i = 0; i < 6; i++) {
      const tMat = new THREE.MeshStandardMaterial({
        color: ringColors[i % 3],
        emissive: ringColors[i % 3],
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      const tMesh = new THREE.Mesh(tokenGeo, tMat);
      const angle = (i / 6) * Math.PI * 2;
      const radius = 4.2 + (i % 2) * 1.2;
      tMesh.userData = {
        angle,
        radius,
        speed: 0.005 + (i % 2) * 0.003,
        baseY: ((i % 3) - 1) * 1.5,
      };
      tokenNodes.push(tMesh);
      masterGroup.add(tMesh);
    }

    // 4. Floating Particles
    const pCount = 140;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 26;
      pPos[i + 1] = (Math.random() - 0.5) * 26;
      pPos[i + 2] = (Math.random() - 0.5) * 26;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 5. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);
    const light1 = new THREE.DirectionalLight(0xfbbf24, 2.2);
    light1.position.set(10, 10, 10);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x00c2ff, 2.0);
    light2.position.set(-10, -5, -5);
    scene.add(light2);

    // 6. Mouse Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.35;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

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

      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      // Slow multifaceted prism rotation
      prismMesh.rotation.x = elapsed * 0.25;
      prismMesh.rotation.y = elapsed * 0.35;
      wireMesh.rotation.x = -elapsed * 0.18;
      wireMesh.rotation.y = -elapsed * 0.22;

      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.05;
      prismMesh.scale.set(pulse, pulse, pulse);

      // Rotate tier rings
      tierRings.forEach((r, idx) => {
        r.rotation.z += (idx % 2 === 0 ? 1 : -1) * 0.003;
      });

      // Orbit tokens
      tokenNodes.forEach((node) => {
        const u = node.userData;
        u.angle += u.speed;
        node.position.x = Math.cos(u.angle) * u.radius;
        node.position.z = Math.sin(u.angle) * u.radius;
        node.position.y = u.baseY + Math.sin(elapsed * 2.0) * 0.3;
        node.rotation.x += 0.02;
        node.rotation.y += 0.02;
      });

      particles.rotation.y = elapsed * 0.015;

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
      prismGeo.dispose();
      prismMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      tokenGeo.dispose();
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
