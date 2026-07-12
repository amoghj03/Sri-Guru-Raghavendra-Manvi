import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows, Text } from '@react-three/drei'
import * as THREE from 'three'

// A single embossed gold coin. Geometry is procedural so no external GLB is required.
function Coin({ label = '₹' }) {
  const group = useRef()

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4
    }
  })

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#caa14b',
        metalness: 1,
        roughness: 0.22,
        emissive: '#3a2a0c',
        emissiveIntensity: 0.25,
      }),
    []
  )

  const rimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e3c77a',
        metalness: 1,
        roughness: 0.15,
      }),
    []
  )

  return (
    <group ref={group} rotation={[Math.PI / 2.2, 0, 0]}>
      {/* Coin body */}
      <mesh castShadow receiveShadow material={goldMaterial}>
        <cylinderGeometry args={[2, 2, 0.32, 96]} />
      </mesh>
      {/* Raised outer rim, front + back */}
      <mesh position={[0, 0.17, 0]} material={rimMaterial}>
        <torusGeometry args={[1.78, 0.08, 24, 96]} />
      </mesh>
      <mesh position={[0, -0.17, 0]} material={rimMaterial}>
        <torusGeometry args={[1.78, 0.08, 24, 96]} />
      </mesh>
      {/* Embossed symbol on both faces */}
      <Text
        position={[0, 0.17, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1.7}
        color="#7a5a18"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, -0.17, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        fontSize={1.7}
        color="#7a5a18"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-6, -2, -4]} intensity={0.8} color="#e08a1e" />
      <spotLight position={[0, 6, 6]} angle={0.5} penumbra={1} intensity={1.5} color="#e3c77a" />

      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.9}>
        <Coin label="₹" />
      </Float>

      <ContactShadows position={[0, -2.6, 0]} opacity={0.4} scale={12} blur={2.6} far={4} color="#000000" />
      <Environment preset="sunset" />
    </>
  )
}

export default function Coin3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // Dispose WebGL resources cleanly when this component unmounts.
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
