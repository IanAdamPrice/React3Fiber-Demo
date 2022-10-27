import React from "react"
import { Canvas } from "@react-three/fiber"
import {OrbitControls, Stars, PerspectiveCamera} from "@react-three/drei"
import {Physics, useBox,usePlane} from "@react-three/cannon"

function Box(props) {
  const [ref, api] = useBox(() => ({
    mass :1,  

    args: [1.5, 1.5, 1.5]
  }));
  return (
    <mesh onClick={() => {
      api.velocity.set(0, 2, 0)
     }} ref={ref} >
      <boxBufferGeometry attach="geometry" args={[ 1.5, 1.5, 1.5]} />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

function Plane(props) {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[10, 10]}/>
      <meshLambertMaterial attach="material" color="seafoamgreen" />
    </mesh>
  );
}

function App() {
  return (
      <Canvas>
        <PerspectiveCamera makeDefault fov={ 65 } position={ [-5, 2, 5] } />
        <OrbitControls />
        <Stars />
        <ambientLight intensity={.5} />
        <spotLight 
          position={[10, 15, 10]}
          angle={0.3}
        />
        <Physics>
          <Box position={[10, 15, 10]}/>
          <Box position={[100, 200, 200]}/>
          <Plane />
        </Physics>
      </Canvas>
  );
}

export default App;
