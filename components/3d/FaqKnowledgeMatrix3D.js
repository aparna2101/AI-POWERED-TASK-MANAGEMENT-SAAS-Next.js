"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * FaqKnowledgeMatrix3D
 * Unique 3D scene designed specifically for FAQ & Knowledge Center:
 * - NO central sphere or orbital rings!
 * - Leaves the center open for the search input and hero title.
 * - Left side: 3D Floating Knowledge Data Blocks (indexed library crystals hovering in 3D).
 * - Right side: 3D Holographic Query Beacon with radiating radar rings.
 * - Subtle ambient cyber wave particles at the bottom.
 * - Mouse parallax tilts the knowledge pillars.
 */
export default function FaqKnowledgeMatrix3D() {
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
    camera.position.set(0, 2, isMobile ? 22 : 16);
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

    // 2. LEFT FLANK: 3D Floating Knowledge Stack (Modular Library Cubes)
    const leftGroup = new THREE.Group();
    leftGroup.position.set(isMobile ? -4.5 : -8.5, 0.5, -2);
    masterGroup.add(leftGroup);

    const blockColors = [0x00c2ff, 0x00e599, 0x2dd4bf, 0xfbbf24];
    const dataBlocks = [];
    const blockGeo = new THREE.BoxGeometry(1.8, 0.8, 1.8);

    for (let i = 0; i < 4; i++) {
      const bMat = new THREE.MeshStandardMaterial({
        color: 0x081734,
        emissive: blockColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.9,
      });
      const bMesh = new THREE.Mesh(blockGeo, bMat);
      bMesh.position.y = (i - 1.5) * 1.6;

      // Wireframe frame for data block
      const wGeo = new THREE.BoxGeometry(1.82, 0.82, 1.82);
      const wMat = new THREE.MeshBasicMaterial({
        color: blockColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const wMesh = new THREE.Mesh(wGeo, wMat);
      bMesh.add(wMesh);

      leftGroup.add(bMesh);
      dataBlocks.push({ mesh: bMesh, baseY: bMesh.position.y, seed: i * 1.2 });
    }

    // 3. RIGHT FLANK: 3D Query Beacon & Knowledge Radar
    const rightGroup = new THREE.Group();
    rightGroup.position.set(isMobile ? 4.5 : 8.5, 0.5, -2);
    masterGroup.add(rightGroup);

    // Faceted Query Polyhedron
    const queryGeo = new THREE.OctahedronGeometry(1.4, 0);
    const queryMat = new THREE.MeshStandardMaterial({
      color: 0x07152b,
      emissive: 0x00e599,
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.9,
    });
    const queryMesh = new THREE.Mesh(queryGeo, queryMat);
    rightGroup.add(queryMesh);

    const queryWireGeo = new THREE.OctahedronGeometry(1.6, 1);
    const queryWireMat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const queryWireMesh = new THREE.Mesh(queryWireGeo, queryWireMat);
    rightGroup.add(queryWireMesh);

    // Concentric Radar Rings emanating from the beacon
    const radarRings = [];
    for (let i = 0; i < 3; i++) {
      const rGeo = new THREE.RingGeometry(1.8 + i * 0.9, 1.86 + i * 0.9, 32);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0x00e599,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35 - i * 0.08,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.x = Math.PI / 2.2;
      rightGroup.add(rMesh);
      radarRings.push(rMesh);
    }

    // 4. Connective Data Laser Arc between Left and Right (Arcs over the top)
    const arcPoints = [];
    arcPoints.push(new THREE.Vector3(leftGroup.position.x, 2.5, -2));
    arcPoints.push(new THREE.Vector3(0, 5.5, -4)); // peaks high above center heading
    arcPoints.push(new THREE.Vector3(rightGroup.position.x, 2.5, -2));
    const arcCurve = new THREE.QuadraticBezierCurve3(...arcPoints);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcCurve.getPoints(40));
    const arcMat = new THREE.LineDashedMaterial({
      color: 0x00c2ff,
      dashSize: 0.5,
      gapSize: 0.3,
      transparent: true,
      opacity: 0.55,
    });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    arcLine.computeLineDistances();
    masterGroup.add(arcLine);

    // 5. Ambient Knowledge Dust (Dispersed laterally, keeping center clear)
    const pCount = 140;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      // Push particles towards the left or right
      const side = Math.random() < 0.5 ? -1 : 1;
      pPositions[i3] = (3.5 + Math.random() * 9) * side;
      pPositions[i3 + 1] = (Math.random() - 0.5) * 12;
      pPositions[i3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00e599,
      size: 0.12,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    masterGroup.add(particles);

    // 6. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0x00c2ff, 2.5);
    light1.position.set(-10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x00e599, 2.2);
    light2.position.set(10, 8, 10);
    scene.add(light2);

    // 7. Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = nx * 0.25;
      targetY = ny * 0.18;
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

    // 8. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax
      masterGroup.rotation.y += (targetX - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (-targetY - masterGroup.rotation.x) * 0.05;

      // Animate Left Data Blocks (hovering and gentle twisting)
      dataBlocks.forEach((b) => {
        b.mesh.position.y = b.baseY + Math.sin(elapsed * 1.5 + b.seed) * 0.18;
        b.mesh.rotation.y = elapsed * 0.3 + b.seed * 0.5;
      });

      // Animate Right Query Beacon
      queryMesh.rotation.x = elapsed * 0.4;
      queryMesh.rotation.y = elapsed * 0.5;
      queryWireMesh.rotation.x = -elapsed * 0.25;
      queryWireMesh.rotation.y = -elapsed * 0.35;

      // Pulse Radar Rings
      radarRings.forEach((r, i) => {
        const scale = 1 + Math.sin(elapsed * 2.0 + i * 1.2) * 0.08;
        r.scale.set(scale, scale, scale);
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
      blockGeo.dispose();
      queryGeo.dispose();
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
