"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function TaskGraph3DCanvas() {
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

    // Master Group for 3D Task Graph
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 2. Central Sprint Orchestrator Node (3D Polyhedron Core)
    const coreGeo = new THREE.DodecahedronGeometry(1.6, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x081734,
      emissive: 0x00c2ff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Core Wireframe Cage
    const coreWireGeo = new THREE.DodecahedronGeometry(2.0, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeo, coreWireMat);
    masterGroup.add(coreWireMesh);

    // 3. Orbiting 3D Task Nodes (Representing Sprint Deliverables: Auth, API, DB, AI, UI)
    const taskColors = [
      0x00c2ff, // Cyan - In Progress
      0x00e599, // Emerald - Completed
      0xfbbf24, // Amber - Review
      0x00c2ff, // Cyan - Active
      0x2dd4bf, // Teal - Deployed
      0x00e599, // Emerald - Done
      0xfbbf24, // Gold - Blocker Resolved
    ];

    const taskNodes = [];
    const taskGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const nodeMaterials = taskColors.map(
      (col) =>
        new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 0.9,
          roughness: 0.2,
          metalness: 0.8,
        })
    );

    const numNodes = 7;
    for (let i = 0; i < numNodes; i++) {
      const node = new THREE.Mesh(taskGeo, nodeMaterials[i]);
      const angle = (i / numNodes) * Math.PI * 2;
      const radius = 5.2 + (i % 2) * 1.4;
      const yOffset = ((i % 3) - 1) * 1.8;

      node.userData = {
        angle,
        radius,
        baseY: yOffset,
        speed: 0.004 + (i % 3) * 0.002,
        wobbleSpeed: 1.2 + i * 0.2,
      };

      node.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );
      taskNodes.push(node);
      masterGroup.add(node);
    }

    // 4. Dynamic Laser Dependency Lines (DAG Graph connecting tasks)
    const maxLineSegments = numNodes * 2;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00c2ff,
      transparent: true,
      opacity: 0.45,
    });
    const dependencyLines = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(dependencyLines);

    // 5. 3D Floating Particle Cloud
    const particleCount = 180;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 28;
      pPositions[i + 1] = (Math.random() - 0.5) * 28;
      pPositions[i + 2] = (Math.random() - 0.5) * 28;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00c2ff,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 6. Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0x00c2ff, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00e599, 1.8);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    // 7. Mouse Parallax Easing
    let targetRotX = 0;
    let targetRotY = 0;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.35;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

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

    // 8. Animation & Render Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse easing
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      // Central core pulse & rotation
      coreMesh.rotation.x = elapsed * 0.25;
      coreMesh.rotation.y = elapsed * 0.35;
      coreWireMesh.rotation.x = -elapsed * 0.18;
      coreWireMesh.rotation.y = -elapsed * 0.22;

      const pulse = 1 + Math.sin(elapsed * 2.2) * 0.06;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Orbit Task Nodes & Update Dependency Splines
      const lineArray = dependencyLines.geometry.attributes.position.array;
      let ptr = 0;

      taskNodes.forEach((node, i) => {
        const u = node.userData;
        u.angle += u.speed;
        node.position.x = Math.cos(u.angle) * u.radius;
        node.position.z = Math.sin(u.angle) * u.radius;
        node.position.y = u.baseY + Math.sin(elapsed * u.wobbleSpeed) * 0.4;

        node.rotation.x += 0.015;
        node.rotation.y += 0.02;

        // Line 1: From Core to Task Node
        lineArray[ptr++] = 0;
        lineArray[ptr++] = 0;
        lineArray[ptr++] = 0;
        lineArray[ptr++] = node.position.x;
        lineArray[ptr++] = node.position.y;
        lineArray[ptr++] = node.position.z;

        // Line 2: Inter-task dependency line (from task i to task i+1)
        const nextNode = taskNodes[(i + 1) % taskNodes.length];
        lineArray[ptr++] = node.position.x;
        lineArray[ptr++] = node.position.y;
        lineArray[ptr++] = node.position.z;
        lineArray[ptr++] = nextNode.position.x;
        lineArray[ptr++] = nextNode.position.y;
        lineArray[ptr++] = nextNode.position.z;
      });

      dependencyLines.geometry.attributes.position.needsUpdate = true;

      // Rotate particle dust
      particles.rotation.y = elapsed * 0.018;

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
      coreGeo.dispose();
      coreMat.dispose();
      coreWireGeo.dispose();
      coreWireMat.dispose();
      taskGeo.dispose();
      nodeMaterials.forEach((m) => m.dispose());
      lineGeo.dispose();
      lineMat.dispose();
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
