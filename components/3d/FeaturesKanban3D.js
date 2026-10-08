"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * FeaturesKanban3D
 * Unique 3D scene designed specifically for Task Management Features:
 * - NO spheres or orbital rings!
 * - 3D Isometric Holographic Kanban Board in deep cyberspace.
 * - 3 Tilted Frosted Glass Pipeline Columns (To Do, In Progress, Done).
 * - Floating 3D Task Cards (geometric glass slabs with glowing status badges).
 * - Dynamic gliding task transit along laser spline tracks.
 * - 3D Isometric perspective with mouse-move tilt.
 */
export default function FeaturesKanban3D() {
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
    // Isometric-like high vantage angle
    camera.position.set(0, 9, isMobile ? 24 : 18);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    // Tilt the whole Kanban layout in 3D isometric perspective
    masterGroup.rotation.x = 0.35;
    scene.add(masterGroup);

    // 2. Base Grid Runner
    const grid = new THREE.GridHelper(32, 24, 0x00c2ff, 0x0a1e38);
    grid.position.y = -3.8;
    masterGroup.add(grid);

    // 3. Three 3D Kanban Columns
    // Col 0: To Do (Cyan)
    // Col 1: In Progress (Amber)
    // Col 2: Done (Emerald)
    const columns = [
      { name: "To Do", x: isMobile ? -3.8 : -7.5, color: 0x00c2ff, accent: 0x0284c7 },
      { name: "In Progress", x: 0, color: 0xfbbf24, accent: 0xd97706 },
      { name: "Done", x: isMobile ? 3.8 : 7.5, color: 0x00e599, accent: 0x059669 },
    ];

    const columnWidth = isMobile ? 3.2 : 5.2;
    const columnHeight = 9.5;
    const columnDepth = 0.25;

    const columnBases = [];
    columns.forEach((col) => {
      const colGroup = new THREE.Group();
      colGroup.position.set(col.x, -0.5, -2);
      masterGroup.add(colGroup);

      // Backing Glass Track
      const trackGeo = new THREE.BoxGeometry(columnWidth, columnHeight, columnDepth);
      const trackMat = new THREE.MeshStandardMaterial({
        color: 0x07152b,
        emissive: col.color,
        emissiveIntensity: 0.18,
        roughness: 0.3,
        metalness: 0.85,
        transparent: true,
        opacity: 0.75,
      });
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      colGroup.add(trackMesh);

      // Glowing Rim Wireframe for the column
      const wireGeo = new THREE.BoxGeometry(columnWidth + 0.05, columnHeight + 0.05, columnDepth + 0.05);
      const wireMat = new THREE.MeshBasicMaterial({
        color: col.color,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      colGroup.add(wireMesh);

      // Header Indicator Bar at Top of Column
      const headGeo = new THREE.BoxGeometry(columnWidth * 0.85, 0.3, 0.4);
      const headMat = new THREE.MeshStandardMaterial({
        color: col.color,
        emissive: col.color,
        emissiveIntensity: 1.2,
      });
      const headMesh = new THREE.Mesh(headGeo, headMat);
      headMesh.position.y = columnHeight / 2 - 0.4;
      headMesh.position.z = 0.2;
      colGroup.add(headMesh);

      columnBases.push(colGroup);
    });

    // 4. Floating 3D Holographic Task Cards
    const taskCards = [];
    const cardGeo = new THREE.BoxGeometry(isMobile ? 2.6 : 4.2, 1.6, 0.35);

    const initialCardData = [
      // Column 0: To Do
      { colIndex: 0, yOffset: 2.2, color: 0x00c2ff, tagColor: 0x00c2ff },
      { colIndex: 0, yOffset: 0.1, color: 0x00c2ff, tagColor: 0x38bdf8 },
      { colIndex: 0, yOffset: -2.0, color: 0x00c2ff, tagColor: 0x0ea5e9 },

      // Column 1: In Progress
      { colIndex: 1, yOffset: 1.8, color: 0xfbbf24, tagColor: 0xfbbf24 },
      { colIndex: 1, yOffset: -0.4, color: 0xfbbf24, tagColor: 0xf59e0b },

      // Column 2: Done
      { colIndex: 2, yOffset: 2.4, color: 0x00e599, tagColor: 0x00e599 },
      { colIndex: 2, yOffset: 0.3, color: 0x00e599, tagColor: 0x10b981 },
      { colIndex: 2, yOffset: -1.8, color: 0x00e599, tagColor: 0x059669 },
    ];

    initialCardData.forEach((item, idx) => {
      const cardGroup = new THREE.Group();
      const colX = columns[item.colIndex].x;
      cardGroup.position.set(colX, item.yOffset, -1.3);
      masterGroup.add(cardGroup);

      // Card Body: Sleek Holographic Tablet
      const cardMat = new THREE.MeshStandardMaterial({
        color: 0x0a1b38,
        emissive: item.color,
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.9,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardGroup.add(cardMesh);

      // Glowing Edge Frame
      const edgeGeo = new THREE.BoxGeometry(
        (isMobile ? 2.6 : 4.2) + 0.04,
        1.6 + 0.04,
        0.35 + 0.04
      );
      const edgeMat = new THREE.MeshBasicMaterial({
        color: item.tagColor,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      cardGroup.add(edgeMesh);

      // Status Badge Chip on Card
      const chipGeo = new THREE.BoxGeometry(0.8, 0.22, 0.38);
      const chipMat = new THREE.MeshStandardMaterial({
        color: item.tagColor,
        emissive: item.tagColor,
        emissiveIntensity: 1.4,
      });
      const chipMesh = new THREE.Mesh(chipGeo, chipMat);
      chipMesh.position.set(-(isMobile ? 0.8 : 1.4), 0.45, 0.05);
      cardGroup.add(chipMesh);

      // Mini Progress Bar on Card
      const progGeo = new THREE.BoxGeometry(isMobile ? 1.8 : 3.0, 0.12, 0.38);
      const progMat = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.85,
      });
      const progMesh = new THREE.Mesh(progGeo, progMat);
      progMesh.position.set(0, -0.45, 0.05);
      cardGroup.add(progMesh);

      taskCards.push({
        group: cardGroup,
        baseY: item.yOffset,
        colIndex: item.colIndex,
        floatSeed: idx * 1.3,
      });
    });

    // 5. One "Active Autonomous Task" that travels smoothly between In Progress and Done!
    const travelerGroup = new THREE.Group();
    travelerGroup.position.set(0, 0, -0.7);
    masterGroup.add(travelerGroup);

    const travelerGeo = new THREE.BoxGeometry(isMobile ? 2.4 : 3.8, 1.4, 0.4);
    const travelerMat = new THREE.MeshStandardMaterial({
      color: 0x052e3b,
      emissive: 0x00c2ff,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.95,
    });
    const travelerMesh = new THREE.Mesh(travelerGeo, travelerMat);
    travelerGroup.add(travelerMesh);

    const travelerWireGeo = new THREE.BoxGeometry(
      (isMobile ? 2.4 : 3.8) + 0.06,
      1.4 + 0.06,
      0.4 + 0.06
    );
    const travelerWireMat = new THREE.MeshBasicMaterial({
      color: 0x00e599,
      wireframe: true,
    });
    const travelerWire = new THREE.Mesh(travelerWireGeo, travelerWireMat);
    travelerGroup.add(travelerWire);

    // Laser Transit Rail between Col 1 (In Progress) and Col 2 (Done)
    const railPoints = [];
    railPoints.push(new THREE.Vector3(columns[1].x, -0.8, -1.0));
    railPoints.push(new THREE.Vector3((columns[1].x + columns[2].x) / 2, 0.4, 0.2));
    railPoints.push(new THREE.Vector3(columns[2].x, -0.8, -1.0));
    const railCurve = new THREE.QuadraticBezierCurve3(...railPoints);
    const railGeo = new THREE.BufferGeometry().setFromPoints(railCurve.getPoints(30));
    const railMat = new THREE.LineBasicMaterial({
      color: 0x00e599,
      transparent: true,
      opacity: 0.7,
    });
    const railLine = new THREE.Line(railGeo, railMat);
    masterGroup.add(railLine);

    // 6. Floating Ambient Code & Task Bits
    const bitCount = 100;
    const bitGeo = new THREE.BufferGeometry();
    const bitPositions = new Float32Array(bitCount * 3);
    for (let i = 0; i < bitCount * 3; i += 3) {
      bitPositions[i] = (Math.random() - 0.5) * 26;
      bitPositions[i + 1] = Math.random() * 12 - 3;
      bitPositions[i + 2] = (Math.random() - 0.5) * 16 - 2;
    }
    bitGeo.setAttribute("position", new THREE.BufferAttribute(bitPositions, 3));
    const bitMat = new THREE.PointsMaterial({
      color: 0x00c2ff,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
    });
    const bits = new THREE.Points(bitGeo, bitMat);
    masterGroup.add(bits);

    // 7. Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0x00c2ff, 2.8);
    light1.position.set(-10, 15, 12);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x00e599, 2.4);
    light2.position.set(10, 12, 10);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xfbbf24, 2.0);
    light3.position.set(0, 10, -8);
    scene.add(light3);

    // 8. Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = nx * 0.28;
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

    // 9. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax on the 3D isometric group
      masterGroup.rotation.y += (targetX - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x = 0.35 + (-targetY - masterGroup.rotation.x + 0.35) * 0.05;

      // Floating wave animation for all stationary task cards
      taskCards.forEach((c) => {
        c.group.position.y = c.baseY + Math.sin(elapsed * 1.8 + c.floatSeed) * 0.15;
        c.group.rotation.z = Math.sin(elapsed * 1.2 + c.floatSeed) * 0.015;
      });

      // Traveling card glide from In Progress to Done
      const transitT = (Math.sin(elapsed * 0.8) + 1) / 2; // oscillates 0 to 1
      const transitPoint = railCurve.getPoint(transitT);
      travelerGroup.position.copy(transitPoint);
      travelerGroup.rotation.z = Math.sin(elapsed * 2.5) * 0.04;

      // Pulse traveler wire
      travelerWire.rotation.y = elapsed * 0.3;

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
      grid.dispose();
      bitGeo.dispose();
      bitMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative pointer-events-none"
    />
  );
}
