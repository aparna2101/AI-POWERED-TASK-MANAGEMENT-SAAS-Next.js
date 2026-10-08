"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function AiNeural3DCanvas() {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    // 1. Scene, Camera & Renderer
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

    // 2. Central Neural AI Brain Lattice (Torus Knot)
    const knotGeo = new THREE.TorusKnotGeometry(2.2, 0.42, 100, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x00c2ff,
      emissive: 0x009f9d,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: true,
    });
    const neuralKnot = new THREE.Mesh(knotGeo, knotMat);
    masterGroup.add(neuralKnot);

    // Inner Radiant Energy Core
    const innerGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerCore);

    // 3. Gyroscopic Orbiting Neural Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const ringGeo1 = new THREE.TorusGeometry(4.2, 0.04, 16, 64);
    const ringGeo2 = new THREE.TorusGeometry(5.2, 0.04, 16, 64);

    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring1);
    masterGroup.add(ring2);

    // 4. Autonomous Agent Satellite Probes (4 Specialised Agents)
    const agentGeo = new THREE.OctahedronGeometry(0.55, 0);
    const agentColors = [0x00e599, 0x00c2ff, 0xfbbf24, 0x2dd4bf];
    const agentNodes = [];

    agentColors.forEach((color, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.1,
        roughness: 0.2,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(agentGeo, mat);
      const angle = (i / 4) * Math.PI * 2;
      mesh.userData = {
        angle,
        radius: 4.8,
        speed: 0.006 + i * 0.001,
        inclination: (i % 2 === 0 ? 1 : -1) * 0.4,
      };
      agentNodes.push(mesh);
      masterGroup.add(mesh);
    });

    // 5. Neural Synapse Beams (Connecting Brain to Agents)
    const beamPositions = new Float32Array(4 * 2 * 3);
    const beamGeo = new THREE.BufferGeometry();
    beamGeo.setAttribute("position", new THREE.BufferAttribute(beamPositions, 3));
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x00e599,
      transparent: true,
      opacity: 0.5,
    });
    const synapseBeams = new THREE.LineSegments(beamGeo, beamMat);
    masterGroup.add(synapseBeams);

    // 6. Constellation Particles
    const pCount = 150;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 26;
      pPos[i + 1] = (Math.random() - 0.5) * 26;
      pPos[i + 2] = (Math.random() - 0.5) * 26;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00e599,
      size: 0.09,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 7. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);
    const light1 = new THREE.DirectionalLight(0x00c2ff, 2.5);
    light1.position.set(10, 10, 10);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x00e599, 2.0);
    light2.position.set(-10, -5, -5);
    scene.add(light2);

    // 8. Mouse Parallax
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

    // 9. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Mouse easing
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      // Torus knot slow multi-axis twist
      neuralKnot.rotation.x = elapsed * 0.3;
      neuralKnot.rotation.y = elapsed * 0.4;
      neuralKnot.rotation.z = elapsed * 0.15;

      const pulse = 1 + Math.sin(elapsed * 2.8) * 0.07;
      innerCore.scale.set(pulse, pulse, pulse);

      ring1.rotation.z += 0.005;
      ring2.rotation.x -= 0.004;

      // Orbit Agent Nodes
      const beamArr = synapseBeams.geometry.attributes.position.array;
      let ptr = 0;

      agentNodes.forEach((node, idx) => {
        const u = node.userData;
        u.angle += u.speed;
        node.position.x = Math.cos(u.angle) * u.radius;
        node.position.z = Math.sin(u.angle) * u.radius;
        node.position.y = Math.sin(u.angle * 2) * 1.5 + u.inclination;

        node.rotation.x += 0.02;
        node.rotation.y += 0.025;

        // Beam from center to agent
        beamArr[ptr++] = 0;
        beamArr[ptr++] = 0;
        beamArr[ptr++] = 0;
        beamArr[ptr++] = node.position.x;
        beamArr[ptr++] = node.position.y;
        beamArr[ptr++] = node.position.z;
      });

      synapseBeams.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.02;

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
      knotGeo.dispose();
      knotMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      agentGeo.dispose();
      beamGeo.dispose();
      beamMat.dispose();
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
