"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * AboutMilestoneHelix3D
 * Unique 3D scene designed specifically for About & Company Story:
 * - NO central sphere or orbital rings!
 * - 3D Dual Engineering DNA Helix (Cyan & Emerald strands) spiraling gracefully.
 * - Floating Holographic Milestone Pods positioned along the helix ascent.
 * - Horizontal cross-link rungs representing architectural integrations.
 * - Mouse parallax tilts the soaring helix.
 */
export default function AboutMilestoneHelix3D() {
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
    camera.position.set(0, 0, isMobile ? 22 : 16);
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
    // Tilt the helix slightly for heroic perspective
    masterGroup.rotation.z = -0.15;
    scene.add(masterGroup);

    // 2. Dual Helix Structure (DNA of Engineering Velocity)
    const pointsStrandA = [];
    const pointsStrandB = [];
    const rungs = [];

    const numPoints = 60;
    const heightSpan = 18;
    const radius = isMobile ? 3.8 : 5.8;
    const turns = 2.4;

    const rungGeo = new THREE.CylinderGeometry(0.04, 0.04, radius * 2, 8);
    rungGeo.rotateZ(Math.PI / 2);
    const rungMat = new THREE.MeshBasicMaterial({
      color: 0x072c4d,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * turns * Math.PI * 2;
      const y = (i / numPoints) * heightSpan - heightSpan / 2;
      const xA = Math.cos(t) * radius;
      const zA = Math.sin(t) * radius;
      const xB = Math.cos(t + Math.PI) * radius;
      const zB = Math.sin(t + Math.PI) * radius;

      pointsStrandA.push(new THREE.Vector3(xA, y, zA));
      pointsStrandB.push(new THREE.Vector3(xB, y, zB));

      // Add architectural cross-rungs every 4 points
      if (i % 4 === 0) {
        const rungMesh = new THREE.Mesh(rungGeo, rungMat);
        rungMesh.position.set(0, y, 0);
        rungMesh.rotation.y = -t;
        masterGroup.add(rungMesh);
        rungs.push(rungMesh);
      }
    }

    // Spline curve for Strand A (Cyan)
    const curveA = new THREE.CatmullRomCurve3(pointsStrandA);
    const tubeGeoA = new THREE.TubeGeometry(curveA, 100, 0.09, 8, false);
    const tubeMatA = new THREE.MeshStandardMaterial({
      color: 0x00c2ff,
      emissive: 0x0077aa,
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.85,
    });
    const tubeA = new THREE.Mesh(tubeGeoA, tubeMatA);
    masterGroup.add(tubeA);

    // Spline curve for Strand B (Emerald)
    const curveB = new THREE.CatmullRomCurve3(pointsStrandB);
    const tubeGeoB = new THREE.TubeGeometry(curveB, 100, 0.09, 8, false);
    const tubeMatB = new THREE.MeshStandardMaterial({
      color: 0x00e599,
      emissive: 0x047857,
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.85,
    });
    const tubeB = new THREE.Mesh(tubeGeoB, tubeMatB);
    masterGroup.add(tubeB);

    // 3. Floating Milestone Pods (Crystalline Markers hovering along the helix)
    const milestonePods = [];
    const podGeo = new THREE.DodecahedronGeometry(0.7, 0);
    const podColors = [0x00c2ff, 0x00e599, 0xfbbf24, 0x2dd4bf];

    for (let i = 0; i < 4; i++) {
      const pMat = new THREE.MeshStandardMaterial({
        color: 0x081734,
        emissive: podColors[i],
        emissiveIntensity: 1.2,
        roughness: 0.15,
        metalness: 0.9,
      });
      const pMesh = new THREE.Mesh(podGeo, pMat);

      // Wireframe cage around milestone pod
      const pWireGeo = new THREE.DodecahedronGeometry(0.9, 1);
      const pWireMat = new THREE.MeshBasicMaterial({
        color: podColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const pWire = new THREE.Mesh(pWireGeo, pWireMat);
      pMesh.add(pWire);

      masterGroup.add(pMesh);

      milestonePods.push({
        mesh: pMesh,
        tOffset: (i / 4),
        strand: i % 2 === 0 ? curveA : curveB,
        color: podColors[i],
      });
    }

    // 4. Ambient Chrono Dust
    const pCount = 130;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 26;
      pPositions[i + 1] = (Math.random() - 0.5) * 18;
      pPositions[i + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00c2ff,
      size: 0.11,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    masterGroup.add(particles);

    // 5. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0x00c2ff, 2.5);
    light1.position.set(-10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x00e599, 2.5);
    light2.position.set(10, -10, 10);
    scene.add(light2);

    // 6. Mouse Parallax
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
      masterGroup.rotation.y = elapsed * 0.15 + targetX;
      masterGroup.rotation.x = -targetY;

      // Milestone Pods glide along the ascending helical strands
      milestonePods.forEach((pod) => {
        const t = (elapsed * 0.03 + pod.tOffset) % 1.0;
        const pt = pod.strand.getPoint(t);
        pod.mesh.position.copy(pt);
        pod.mesh.rotation.x = elapsed * 0.5;
        pod.mesh.rotation.y = elapsed * 0.6;
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
      tubeGeoA.dispose();
      tubeMatA.dispose();
      tubeGeoB.dispose();
      tubeMatB.dispose();
      rungGeo.dispose();
      rungMat.dispose();
      podGeo.dispose();
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
