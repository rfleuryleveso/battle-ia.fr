(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderParent = document.getElementById("shiprender");
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(renderParent.clientWidth, renderParent.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderParent.appendChild(renderer.domElement);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const light = new THREE.AmbientLight(0x404040, 5  ); // soft white light
  scene.add(light);

  const loader = new THREE.GLTFLoader();
  camera.position.z = 1.5;
  let ship = null;

  loader.load(
    "./assets/glb/bot_1.glb",
    function (gltf) {
      ship = gltf.scene;
      scene.add(ship);

      ship.position.y -= 0.5;
      ship.position.x += 0.5;

      camera.lookAt(ship.position);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // const geometry = new THREE.BoxGeometry();
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  //

  const animate = function () {
    requestAnimationFrame(animate);
    if (ship) {
      // ship.rotation.x += 0.01;
      ship.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  };
  animate();
})();

() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderParent = document.getElementById("particlerenderer");
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(renderParent.clientWidth, renderParent.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderParent.appendChild(renderer.domElement);

  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
  });

  const points = [];
  points.push(new THREE.Vector3(-6, -2, 0));
  points.push(new THREE.Vector3(-3, -1, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);
  scene.add(line);

  camera.position.z = 3;
  camera.lookAt(scene.position);

  const animate = function () {
    requestAnimationFrame(animate);

    //line.rotation.z += 0.01;

    //line.position.x += 0.01;
    //line.position.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
};
