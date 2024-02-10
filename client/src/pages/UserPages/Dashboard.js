import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Axios from "axios";
import "../../styles/dashboardlaw.css";
import { AuthWrapper } from "../../services/AuthService.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import Navbar from "../../components/Navbar.js";
function App() {
  const [data, setData] = useState("");
  const mount = useRef(null);
  useLayoutEffect(() => {
    const width = mount.current.clientWidth;
    const height = mount.current.clientHeight;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mount.current.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111212);
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.rotation.y = (60 / 180) * Math.PI;
    camera.position.set(8, 1, 5);

    const hlight = new THREE.AmbientLight(0x000000, 100);
    scene.add(hlight);
    const directionlight = new THREE.DirectionalLight(0xf7e54a, 30);
    // directionlight.set(100,1,0);
    scene.add(directionlight);
    const light = new THREE.PointLight(0xf7e54a, 30);
    light.position.set(8, 1, 5);
    scene.add(light);
    const light2 = new THREE.PointLight(0x000000, 100);
    light2.position.set(8, 1, 3);
    scene.add(light2);
    const light3 = new THREE.PointLight(0x000000, 700);
    light3.position.set(7, 0, 4);
    scene.add(light3);
    const light4 = new THREE.PointLight(0x000000, 100);
    light4.position.set(7, 8, 9);
    scene.add(light4);
    let objectToRotate;
    const loader = new GLTFLoader();
    loader.load("object.glb", function (gltf) {
      objectToRotate = gltf.scene.children[0];
      scene.add(gltf.scene);
      animate();
    });

    function animate() {
      requestAnimationFrame(animate);
      // controls.update();
      objectToRotate.rotation.z += 0.01;
      renderer.render(scene, camera);
    }

    return () => {
      mount.current.removeChild(mount.current.secondElementChild);
    };
  }, []);

  return (
    <div className="App">
      {/* <AuthWrapper /> */}
      {/* {data} */}
		<Navbar/>
      <div style={{ width: "85%", height: "100%" }} ref={mount} >
		{/* <div className="filler"></div> */}
	  </div>
    </div>
  );
}

export default App;