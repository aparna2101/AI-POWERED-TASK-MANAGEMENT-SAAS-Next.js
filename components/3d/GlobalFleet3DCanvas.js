"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function GlobalFleet3DCanvas() {
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
    camera.position.z = isMobile ? 19 : 14;

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

    // 1. Planetary Wireframe Core (Distributed Mesh)
    const globeGeo = new THREE.SphereGeometry(3.6, 28, 28);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    masterGroup.add(globe);

    // Inner Radiant Atmosphere
    const innerAtmGeo = new THREE.SphereGeometry(3.3, 32, 32);
    const innerAtmMat = new THREE.MeshStandardMaterial({
      color: 0x08152c,
      emissive: 0x009f9d,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.8,
    });
    const innerAtm = new THREE.Mesh(innerAtmGeo, innerAtmMat);
    masterGroup.add(innerAtm);

    // 2. Equatorial Telemetry Rings
    const ringGeo = new THREE.RingGeometry(4.8, 5.0, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    masterGroup.add(ring);

    // 3. Global Hub Beacon Markers (SF, London, Singapore, Bengaluru)
    const hubCoordinates = [
      { lat: 37.77, lon: -122.41, name: "SF", color: 0x00c2ff },
      { lat: 51.5, lon: -0.12, name: "London", color: 0x00e599 },
      { lat: 1.35, lon: 103.81, name: "Singapore", color: 0xfbbf24 },
      { lat: 12.97, lon: 77.59, name: "Bengaluru", color: 0x2dd4bf },
    ];

    const hubPoints = [];
    const beaconGeo = new THREE.SphereGeometry(0.18, 16, 16);

    hubCoordinates.forEach((hub) => {
      // Convert lat/lon to 3D Cartesian coordinates
      const phi = (90 - hub.lat) * (Math.PI / 180);
      const theta = (hub.lon + 180) * (Math.PI / 180);
      const r = 3.65;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      const beaconMat = new THREE.MeshBasicMaterial({ color: hub.color });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(x, y, z);
      masterGroup.add(beacon);
      hubPoints.push(new THREE.Vector3(x, y, z));
    });

    // 4. Inter-Hub Laser Arcs (Bezier curves connecting hubs)
    const arcGroup = new THREE.Group();
    masterGroup.add(arcGroup);

    for (let i = 0; i < hubPoints.length; i++) {
      const p1 = hubPoints[i];
      const p2 = hubPoints[(i + 1) % hubPoints.length];

      // Midpoint elevated above surface for orbital arc effect
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(4.6);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x00e599,
        transparent: true,
        opacity: 0.6,
      });
      const arc = new THREE.Line(curveGeo, curveMat);
      arcGroup.add(arc);
    }

    // 5. Ambient Particles
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
      color: 0x00c2ff,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 6. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(amb);
    const light1 = new THREE.DirectionalLight(0x00c2ff, 2.2);
    light1.position.set(10, 10, 10);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x00e599, 1.8);
    light2.position.set(-10, -5, -5);
    scene.add(light2);

    // 7. Mouse Parallax
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

    // 8. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      // Slow axial rotation of the global fleet
      globe.rotation.y = elapsed * 0.12;
      innerAtm.rotation.y = elapsed * 0.08;
      ring.rotation.z = elapsed * 0.05;

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
      globeGeo.dispose();
      globeMat.dispose();
      innerAtmGeo.dispose();
      innerAtmMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      beaconGeo.dispose();
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
