var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TEXTURE_SRC = 'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&s=96647cd4038299342a15cd2bd177075f';
var PREFAB = {
  WIDTH: 1,
  HEIGHT: 1
};

function init(texture) {
  var image = texture.image;
  var width = image.width;
  var height = image.height;
  var intervalX = width / PREFAB.WIDTH;
  var intervalY = height / PREFAB.HEIGHT;

  var three = new THREEWrapper({
    cameraPosition: [0, 0, width * 1.5]
  });

  var prefab = new THREE.PlaneGeometry(PREFAB.WIDTH, PREFAB.HEIGHT);
  var geometry = new BAS.PrefabBufferGeometry(prefab, intervalX * intervalY);
  var aPosition = geometry.createAttribute('aPosition', 4);

  var i = 0;
  for (var x = 0; x < intervalX; x++) {
    for (var y = 0; y < intervalY; y++) {
      geometry.setPrefabData(aPosition, i++, [x * PREFAB.WIDTH - width / 2, y * PREFAB.HEIGHT - height / 2, 0, Math.random() // random coefficient
      ]);
    }
  }

  texture.minFilter = THREE.LinearFilter;

  var material = new BAS.BasicAnimationMaterial({
    side: THREE.DoubleSide,
    vertexColors: THREE.VertexColors,
    uniforms: {
      uTime: { type: 'f', value: 0 },
      uSize: { type: 'vf2', value: [width, height] },
      map: { type: 't', value: texture }
    },
    vertexFunctions: [BAS.ShaderChunk['ease_cubic_in_out']],
    vertexParameters: ['uniform float uTime;', 'uniform vec2 uSize;', 'uniform sampler2D map;', 'attribute vec4 aPosition;', 'const float interval = 10.;', 'const float delay = 1.5;', 'const float speed = 80.;', 'const float minWeight = 0.3;', 'const float fallSpeed = 4.;', 'const float xSpeed = 0.03;'],
    vertexInit: ['vec4 texelColor = texture2D(map, (aPosition.xy + uSize / 2.) / uSize);', 'float tProgress = mod(uTime / 100., interval + delay) - delay;', 'float tMove = max(tProgress, 0.) * speed;', 'float weight = ((1. - texelColor.r * texelColor.g * texelColor.b) * (1. - minWeight) + minWeight) * fallSpeed;', 'float tFall = max(-aPosition.y - uSize.y / 2. + tMove, 0.) * (aPosition.w * 0.2 + 1.);', 'float y = easeCubicInOut(1. - max(-tProgress, 0.) / delay) * uSize.y * 0.66;'],
    vertexPosition: ['transformed.xy += vec2(aPosition.x / (1. + tFall * xSpeed), aPosition.y - tFall * weight - tMove + y);', 'transformed.z += aPosition.z;'],
    vertexColor: ['vColor = texelColor.rgb;']
  });
  material.uniforms['map'].value.needsUpdate = true;

  var mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;

  three.add(mesh);

  var time = 0;
  three.addUpdateCallback(function () {
    material.uniforms['uTime'].value = time++;
  });

  three.start();
}

new THREE.TextureLoader().load(TEXTURE_SRC, init);

// --------------------
// Three.js Wrapper
// forked from https://github.com/zadvorsky/three.bas/blob/86931253240abadf68b7c62edb934b994693ed4a/examples/_js/root.js
// --------------------

var THREEWrapper = function () {
  function THREEWrapper(params) {
    var _camera$position,
        _this = this;

    _classCallCheck(this, THREEWrapper);

    // defaults
    params = Object.assign({
      container: document.body,
      fov: 45,
      zNear: 1,
      zFar: 10000,
      cameraPosition: [0, 0, 30],
      createCameraControls: false,
      autoStart: true,
      pixelRatio: window.devicePixelRatio,
      antialias: window.devicePixelRatio === 1,
      alpha: false,
      clearColor: 0x000000
    }, params);

    // maps and arrays
    this.updateCallbacks = [];
    this.resizeCallbacks = [];
    this.objects = {};

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: params.antialias,
      alpha: params.alpha
    });
    this.renderer.setPixelRatio(params.pixelRatio);
    this.renderer.setClearColor(params.clearColor);
    this.canvas = this.renderer.domElement;

    // container
    this.container = typeof params.container === 'string' ? document.querySelector(params.container) : params.container;
    this.container.appendChild(this.canvas);

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    // camera
    this.camera = new THREE.PerspectiveCamera(params.fov, this.width / this.height, params.zNear, params.zFar);
    (_camera$position = this.camera.position).set.apply(_camera$position, _toConsumableArray(params.cameraPosition));

    // scene
    this.scene = new THREE.Scene();

    // resize handling
    this.resize();
    window.addEventListener('resize', function () {
      _this.resize();
    });

    // tick / update / render
    params.autoStart && this.tick();

    // optional camera controls
    params.createCameraControls && this.createOrbitControls();

    // pointer
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }

  _createClass(THREEWrapper, [{
    key: 'createOrbitControls',
    value: function createOrbitControls() {
      var _this2 = this;

      if (!THREE.TrackballControls) {
        console.error('TrackballControls.js file is not loaded.');
        return;
      }

      this.controls = new THREE.TrackballControls(this.camera, this.canvas);
      this.addUpdateCallback(function () {
        _this2.controls.update();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      this.tick();
    }
  }, {
    key: 'stop',
    value: function stop() {
      cancelAnimationFrame(this.animationFrameId);
    }
  }, {
    key: 'addUpdateCallback',
    value: function addUpdateCallback(callback) {
      this.updateCallbacks.push(callback);
    }
  }, {
    key: 'addResizeCallback',
    value: function addResizeCallback(callback) {
      this.resizeCallbacks.push(callback);
    }
  }, {
    key: 'add',
    value: function add(object, key) {
      key && (this.objects[key] = object);
      this.scene.add(object);
    }
  }, {
    key: 'addTo',
    value: function addTo(object, parentKey, key) {
      key && (this.objects[key] = object);
      this.get(parentKey).add(object);
    }
  }, {
    key: 'get',
    value: function get(key) {
      return this.objects[key];
    }
  }, {
    key: 'remove',
    value: function remove(o) {
      var object = void 0;

      if (typeof o === 'string') {
        object = this.objects[o];
      } else {
        object = o;
      }

      if (object) {
        object.parent.remove(object);
        delete this.objects[o];
      }
    }
  }, {
    key: 'tick',
    value: function tick(time) {
      var _this3 = this;

      this.update(time);
      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(function (time) {
        _this3.tick(time);
      });
    }
  }, {
    key: 'update',
    value: function update(time) {
      this.updateCallbacks.forEach(function (callback) {
        callback(time);
      });
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.container.style.width = '';
      this.container.style.height = '';
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;

      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.width, this.height);
      this.resizeCallbacks.forEach(function (callback) {
        callback();
      });
    }
  }, {
    key: 'checkPointer',
    value: function checkPointer(_ref, meshs, handler, nohandler) {
      var x = _ref.x,
          y = _ref.y;

      this.pointer.x = x / this.canvas.clientWidth * 2 - 1;
      this.pointer.y = -(y / this.canvas.clientHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      var intersects = this.raycaster.intersectObjects(meshs);

      if (intersects.length > 0) {
        handler(intersects[0].object);

        return true;
      } else {
        nohandler && nohandler();

        return false;
      }
    }
  }]);

  return THREEWrapper;
}();