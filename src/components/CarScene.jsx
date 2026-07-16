import { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, Html } from '@react-three/drei'
import { MousePointer2, ZoomIn, RotateCcw } from 'lucide-react'
import CarModel from './CarModel.jsx'

function LoadingScreen() {
  return (
    <Html center>
      <div className="loader-overlay" style={{ position: 'relative', background: 'transparent', width: '200px' }}>
        <div className="loader-spinner" />
        <p className="loader-text">Loading 3D Model…</p>
        <div className="loader-progress">
          <div className="loader-bar" />
        </div>
      </div>
    </Html>
  )
}

export default function CarScene({ modelUrl, carColor, finish, ppfEnabled, onLoaded }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Hint overlay */}
      <div className="canvas-overlay-top">
        <div className="view-hint">
          <MousePointer2 size={13} strokeWidth={2} />
          Drag to rotate horizontally
        </div>
      </div>

      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[5.5, 2.5, 5.5]} fov={40} />

        {/* Ambient + key lights */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[8, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#b4c8ff" />
        <pointLight position={[0, 5, -6]} intensity={0.5} color="#ff9060" />

        {/* Environment map for realistic reflections */}
        <Environment preset="studio" />

        {/* Ground contact shadow */}
        <ContactShadows
          position={[0, -1.02, 0]}
          opacity={0.65}
          scale={20}
          blur={2.5}
          far={4}
        />

        {/* Car Model */}
        <Suspense fallback={<LoadingScreen />}>
          <CarModel
            modelUrl={modelUrl}
            carColor={carColor}
            finish={finish}
            ppfEnabled={ppfEnabled}
            onLoaded={onLoaded}
          />
        </Suspense>

        {/* Orbit Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.15}
          maxPolarAngle={Math.PI / 2.15}
          autoRotate
          autoRotateSpeed={0.5}
          target={[0, 1.6, 0]}
        />
      </Canvas>

      {/* Bottom badge */}
      <div className="canvas-info-badge">
        <RotateCcw size={13} strokeWidth={2} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
        Interactive 3D Preview — Real-time Color & PPF Visualization
      </div>
    </div>
  )
}
