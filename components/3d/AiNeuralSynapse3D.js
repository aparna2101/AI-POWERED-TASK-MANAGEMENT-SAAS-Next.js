"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * AiNeuralSynapse3D
 * Unique 3D scene designed specifically for AI Copilot:
 * - NO central sphere or orbital rings!
 * - True 3D Multi-Layer Neural Network Graph (Input -> Hidden Reasoning -> Output Decision).
 * - Traveling Synaptic Impulses (glowing energy packets shooting along axons).
 * - 2 Autonomous Agent Scanner Drones navigating through the network.
 * - Ambient synaptic particle clouds.
 * - Mouse parallax tilts the entire multi-layered neural topology.
 */
export default function AiNeuralSynapse3D() {
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
    scene.fog = new THREE.FogExp2(0x050b1a, 0.032);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, isMobile ? 22 : 16);
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

    // 2. Define 3D Neural Layers
    // Layer 1 (Input Nodes, Left): x = -9
    // Layer 2 (Hidden Layer 1, Left-Center): x = -3
    // Layer 3 (Hidden Layer 2, Right-Center): x = 3
    // Layer 4 (Decision Nodes, Right): x = 9
    const layers = [
      {
        x: isMobile ? -5 : -9,
        nodes: [
          { y: 3.5, z: -1, color: 0x00c2ff },
          { y: 1.2, z: 1.5, color: 0x00c2ff },
          { y: -1.2, z: -1.5, color: 0x00c2ff },
          { y: -3.5, z: 1, color: 0x00c2ff },
        ],
      },
      {
        x: isMobile ? -1.8 : -3.2,
        nodes: [
          { y: 4.2, z: -2, color: 0x00e599 },
          { y: 2.1, z: 1, color: 0x00e599 },
          { y: 0.0, z: -2.5, color: 0x00e599 },
          { y: -2.1, z: 1.5, color: 0x00e599 },
          { y: -4.2, z: -1, color: 0x00e599 },
        ],
      },
      {
        x: isMobile ? 1.8 : 3.2,
        nodes: [
          { y: 4.0, z: 1.5, color: 0x2dd4bf },
          { y: 1.8, z: -1.8, color: 0x2dd4bf },
          { y: -0.5, z: 2.0, color: 0x2dd4bf },
          { y: -2.8, z: -1.2, color: 0x2dd4bf },
          { y: -4.2, z: 1.8, color: 0x2dd4bf },
        ],
      },
      {
        x: isMobile ? 5 : 9,
        nodes: [
          { y: 3.0, z: -1, color: 0xfbbf24 },
          { y: 0.0, z: 1.5, color: 0xfbbf24 },
          { y: -3.0, z: -1, color: 0xfbbf24 },
        ],
      },
    ];

    // Build Node Meshes & collect 3D vectors
    const nodeMeshes = [];
    const layerVectors = []; // Array of arrays of THREE.Vector3
    const neuronGeo = new THREE.IcosahedronGeometry(0.35, 1);

    layers.forEach((l, lIdx) => {
      const vList = [];
      l.nodes.forEach((n, nIdx) => {
        const pos = new THREE.Vector3(l.x, n.y, n.z);
        vList.push(pos);

        const nMat = new THREE.MeshStandardMaterial({
          color: 0x07152b,
          emissive: n.color,
          emissiveIntensity: 1.1,
          roughness: 0.15,
          metalness: 0.9,
        });
        const nMesh = new THREE.Mesh(neuronGeo, nMat);
        nMesh.position.copy(pos);
        masterGroup.add(nMesh);

        // Halo wireframe for each neuron
        const haloGeo = new THREE.IcosahedronGeometry(0.55, 1);
        const haloMat = new THREE.MeshBasicMaterial({
          color: n.color,
          wireframe: true,
          transparent: true,
          opacity: 0.45,
        });
        const haloMesh = new THREE.Mesh(haloGeo, haloMat);
        nMesh.add(haloMesh);

        nodeMeshes.push({ mesh: nMesh, halo: haloMesh, basePos: pos.clone(), seed: lIdx * 2 + nIdx });
      });
      layerVectors.push(vList);
    });

    // 3. Connect Synapses between adjacent layers
    const axonSegments = []; // array of { start: Vector3, end: Vector3 }
    const linePositions = [];
    const lineColors = [];

    for (let l = 0; l < layerVectors.length - 1; l++) {
      const currentLayer = layerVectors[l];
      const nextLayer = layerVectors[l + 1];

      currentLayer.forEach((v1) => {
        nextLayer.forEach((v2) => {
          // Connect if within plausible distance
          if (Math.abs(v1.y - v2.y) < 5.0) {
            axonSegments.push({ start: v1, end: v2 });

            linePositions.push(v1.x, v1.y, v1.z);
            linePositions.push(v2.x, v2.y, v2.z);

            // Gradient cyan to emerald to amber
            lineColors.push(0.0, 0.76, 1.0);
            lineColors.push(0.0, 0.9, 0.6);
          }
        });
      });
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    });
    const axonLines = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(axonLines);

    // 4. Live Synaptic Impulses (Action Potentials firing between layers)
    const impulseCount = 20;
    const impulseGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const impulseMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      transparent: true,
      opacity: 0.9,
    });
    const impulses = [];

    for (let i = 0; i < impulseCount; i++) {
      const mesh = new THREE.Mesh(impulseGeo, impulseMat);
      masterGroup.add(mesh);

      const segment = axonSegments[Math.floor(Math.random() * axonSegments.length)];
      impulses.push({
        mesh,
        segment,
        t: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
      });
    }

    // 5. Autonomous Scanner Drone Probes (2 AI scouts patrolling the network)
    const drones = [];
    const droneGeo = new THREE.ConeGeometry(0.4, 1.1, 4);
    droneGeo.rotateX(Math.PI / 2);

    const droneColors = [0x00c2ff, 0xfbbf24];
    for (let i = 0; i < 2; i++) {
      const dMat = new THREE.MeshStandardMaterial({
        color: 0x081734,
        emissive: droneColors[i],
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.95,
      });
      const dMesh = new THREE.Mesh(droneGeo, dMat);
      masterGroup.add(dMesh);

      // Scanning cone light beam
      const coneBeamGeo = new THREE.ConeGeometry(1.2, 3.5, 16, 1, true);
      coneBeamGeo.rotateX(-Math.PI / 2);
      coneBeamGeo.translate(0, 0, 1.75);
      const coneBeamMat = new THREE.MeshBasicMaterial({
        color: droneColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const coneBeam = new THREE.Mesh(coneBeamGeo, coneBeamMat);
      dMesh.add(coneBeam);

      drones.push({
        mesh: dMesh,
        speed: 0.003 + i * 0.002,
        radiusX: 7.5,
        radiusY: 3.5,
        radiusZ: 3.0,
        phase: i * Math.PI,
      });
    }

    // 6. Ambient Synaptic Particle Dust
    const pCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 26;
      pPositions[i + 1] = (Math.random() - 0.5) * 12;
      pPositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00c2ff,
      size: 0.1,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    masterGroup.add(particles);

    // 7. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0x00c2ff, 2.8);
    light1.position.set(-10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x00e599, 2.4);
    light2.position.set(10, -5, 10);
    scene.add(light2);

    // 8. Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = nx * 0.35;
      targetY = ny * 0.22;
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

    // 9. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax
      masterGroup.rotation.y += (targetX - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (-targetY - masterGroup.rotation.x) * 0.05;

      // Pulse neurons and halos
      nodeMeshes.forEach((n) => {
        const pulse = 1 + Math.sin(elapsed * 2.5 + n.seed) * 0.12;
        n.mesh.scale.set(pulse, pulse, pulse);
        n.halo.rotation.y = elapsed * 0.4 + n.seed;
        n.halo.rotation.x = elapsed * 0.2;
      });

      // Advance Synaptic Impulses
      impulses.forEach((imp) => {
        imp.t += imp.speed;
        if (imp.t >= 1) {
          imp.t = 0;
          imp.segment = axonSegments[Math.floor(Math.random() * axonSegments.length)];
        }
        imp.mesh.position.lerpVectors(imp.segment.start, imp.segment.end, imp.t);
      });

      // Animate Autonomous Drones
      drones.forEach((d) => {
        const angle = elapsed * 0.6 + d.phase;
        d.mesh.position.x = Math.sin(angle) * d.radiusX;
        d.mesh.position.y = Math.cos(angle * 1.5) * d.radiusY;
        d.mesh.position.z = Math.sin(angle * 2.0) * d.radiusZ;

        // Look toward direction of travel
        const nextAngle = angle + 0.05;
        const nextPos = new THREE.Vector3(
          Math.sin(nextAngle) * d.radiusX,
          Math.cos(nextAngle * 1.5) * d.radiusY,
          Math.sin(nextAngle * 2.0) * d.radiusZ
        );
        d.mesh.lookAt(nextPos);
      });

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
      neuronGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      impulseGeo.dispose();
      impulseMat.dispose();
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
