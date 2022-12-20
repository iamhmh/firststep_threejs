// J'ai crée une fonction main qui regroupe tous les paramètres de la scène, de la caméra et du rendu
function main () {
    //dans un premier temps, il faut mettre en place la scene, la camera et le rendu
    const canvas = document.querySelector('#c');

    //etendu de la scene vu par l'utilisateur sur le navigateur (en degre)
    const fov = 100;
    //l'aspect, c'est le ratio entre la largeur et la hauteur de l'ecran
    const aspect = canvas.clientWidth / canvas.clientHeight;
    //les distances de rendu, c'est la distance entre le plan de rendu le plus proche et le plus loin
    const near = 0.1;
    const far = 2000;

    //creation de la scene
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1;

    //creation du rendu
    const renderer = new THREE.WebGLRenderer({canvas});
    

    //orbit controls pour pouvoir bouger la camera

    const controls = new THREE.OrbitControls(camera, canvas);

    //creation de la scene
    const scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
        './bergsjostolen-planet.jpg',
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(renderer, texture);
            scene.background = rt.texture;
        }
    );

    //création de la fonction de rendu
    function render () {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

//ici j'apelle la fonction main
main();