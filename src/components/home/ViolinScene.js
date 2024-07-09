import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Violin = () => {
  const { scene } = useGLTF('/violin.glb');
  const violinRef = useRef();
  const [rotationAngle, setRotationAngle] = useState(0);

  useFrame(() => {
    setRotationAngle((prevAngle) => prevAngle + 0.01); // Adjust speed as needed

    if (violinRef.current) {
      violinRef.current.rotation.y = rotationAngle;
    }
  });

  useEffect(() => {
    if (violinRef.current) {
      violinRef.current.position.set(0, -1, 0); // Adjust as necessary
      violinRef.current.scale.set(0.6, 0.6, 0.6); // Adjust as necessary
    }
  }, []);

  return <primitive object={scene} ref={violinRef} />;
};

const ViolinScene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 60], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 1, 10]} intensity={1} />
      <Violin />
      <OrbitControls enableZoom={false}/>
    </Canvas>
  );
};

export default ViolinScene;
