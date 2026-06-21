"use client";

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, ContactShadows } from '@react-three/drei';

function IcosahedronShape() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color={hovered ? '#ff4081' : '#00e5ff'} wireframe={false} />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      
      {/* UI Overlay Layer */}
      <div style={{ position: 'absolute', top: '5%', left: '5%', color: 'white', zIndex: 10, pointerEvents: 'none' }}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>My 3D World</h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Interactive Space</p>
        <p>Drag anywhere to orbit the camera. Click or tap the shape to interact with it.</p>
      </div>

      {/* 3D Canvas Layer */}
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <IcosahedronShape />
          </Float>
          
          <ContactShadows position={[0, -2.5, 0]} opacity={0.7} scale={10} blur={2} far={4} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
        
        <OrbitControls enableZoom={true} />
      </Canvas>

    </div>
  );
}
