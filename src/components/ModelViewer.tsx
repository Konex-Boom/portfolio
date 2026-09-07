import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows, Center } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return (
    <Center>
      <primitive object={scene} scale={8.5} />
    </Center>
  );
}

function isWebGL2Supported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return (
      !!window.WebGL2RenderingContext &&
      !!canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false })
    );
  } catch {
    return false;
  }
}

export const ModelViewer = ({ className = '' }: { className?: string }) => {
  const [error, setError] = useState<boolean>(false);
  const [webglOK, setWebglOK] = useState<boolean>(true);

  useEffect(() => {
    setWebglOK(isWebGL2Supported());
  }, []);

  if (error || !webglOK) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.8))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontSize: '12px',
        }}
      >
        <p>Modèle 3D indisponible</p>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <Canvas
        camera={{
          position: [1.9, 1, 1.9],
          fov: 45,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
        }}
        onError={() => {
          console.error('Canvas rendering error');
          setError(true);
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, 2, -5]} intensity={0.5} color="#00f2fe" />
        <directionalLight position={[0, -3, 0]} intensity={0.3} />

        <Suspense fallback={null}>
          <Model />
          <ContactShadows
            position={[0, -8.5, 0]}
            opacity={0.4}
            scale={18}
            blur={2.5}
            far={10}
            resolution={512}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1.8}
          minDistance={2}
          maxDistance={10}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/model.glb');