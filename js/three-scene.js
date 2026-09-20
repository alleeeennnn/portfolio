/* ===== Three.js floating 3D hero object ===== */
(function () {
  var container = document.getElementById('hero-canvas');
  if (!container || typeof THREE === 'undefined') return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 9);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  /* Lights — soft, studio-like */
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  var key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(5, 8, 6);
  scene.add(key);
  var accentLight = new THREE.PointLight(0x6366f1, 0.8, 30);
  accentLight.position.set(-6, -3, 4);
  scene.add(accentLight);

  var group = new THREE.Group();
  scene.add(group);

  /* Wireframe shell */
  var shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.1, 1),
    new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true, transparent: true, opacity: 0.35 })
  );
  group.add(shell);

  /* Inner core */
  var core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.1, 0),
    new THREE.MeshStandardMaterial({
      color: 0xeef2ff,
      roughness: 0.35,
      metalness: 0.1,
      flatShading: true
    })
  );
  group.add(core);

  /* Orbiting ring */
  var ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.9, 0.05, 16, 120),
    new THREE.MeshStandardMaterial({ color: 0xa5b4fc, roughness: 0.4 })
  );
  ring.rotation.x = Math.PI / 2.4;
  group.add(ring);

  /* Floating satellites */
  var satGeo = new THREE.SphereGeometry(1, 24, 24);
  var satMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.3, metalness: 0.2 });
  var sats = [
    { pos: [3.2, 1.1, -0.6], s: 0.28 },
    { pos: [-2.8, -1.5, 0.4], s: 0.22 },
    { pos: [1.9, -2.1, 0.9], s: 0.16 }
  ].map(function (cfg) {
    var m = new THREE.Mesh(satGeo, satMat);
    m.scale.setScalar(cfg.s);
    m.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
    group.add(m);
    return m;
  });

  /* Mouse parallax */
  var mouseX = 0, mouseY = 0, curX = 0, curY = 0, spin = 0;
  window.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    spin += reduced ? 0.0006 : 0.003;
    curX += (mouseX - curX) * 0.05;
    curY += (mouseY - curY) * 0.05;
    group.rotation.y = spin + curX * 0.4;
    group.rotation.x = curY * 0.3;
    core.rotation.y -= 0.004;
    ring.rotation.z += 0.0015;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', function () {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
