import { CameraType } from "../src/Managers/Appearance";
import { ControlsType } from "../src/Managers/Controls";
import { Viewer } from "../src/Viewer";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const wireframe = document.getElementById("wireframe") as HTMLInputElement;
const smallparts = document.getElementById("smallparts") as HTMLInputElement;
const camera = document.getElementById("camera") as HTMLInputElement;
const controls = document.getElementById("controls") as HTMLInputElement;


const planex = document.getElementById("planex") as HTMLInputElement;
const xoffset = document.getElementById("planex-offset") as HTMLInputElement;
const planey = document.getElementById("planey") as HTMLInputElement;
const yoffset = document.getElementById("planey-offset") as HTMLInputElement;
const planez = document.getElementById("planez") as HTMLInputElement;
const zoffset = document.getElementById("planez-offset") as HTMLInputElement;

const occtImportJsWasmPath = new URL("../libs/occt-import-js/occt-import-js.wasm", import.meta.url).href;
const viewer = new Viewer(canvas, { occtImportJsWasmPath: occtImportJsWasmPath });
viewer.appearance.effects.outline = true;
viewer.addListener("loaded", () => UpdatePlanesMinMax());
const loadButton = document.getElementById("load-file");
loadButton!.onchange = (e) => {
    const files = (e.target as any).files;
    if (files.length != 0) {
        const file = files[0] as File;
        const src = URL.createObjectURL(file);
        viewer.LoadModelFile(file.name, src);
    }
}
wireframe.onchange = (e) => {
    viewer.appearance.wireframe = (e.target as any).checked;
}
smallparts.onchange = (e) => {
    viewer.appearance.hideSmallPartsOnCameraMove = (e.target as any).checked;
}
camera.onchange = (e) => {
    const value = (e.target as any).checked as boolean;
    viewer.appearance.SetCameraType(value == true ? CameraType.orthographic : CameraType.perspective);
}
controls.onchange = (e) => {
    const value = (e.target as any).checked as boolean;
    viewer.controls.SetCameraControl(value == true ? ControlsType.trackball : ControlsType.orbit);
}
planex.onchange = (e) => {
    const value = (e.target as any).checked as boolean;
    viewer.sceneManager.planes[0].SetVisibility(value);
}
xoffset.onchange = (e) => {
    const value = (e.target as any).value as number;
    viewer.sceneManager.planes[0].SetOffset(value);
}
planey.onchange = (e) => {
    const value = (e.target as any).checked as boolean;
    viewer.sceneManager.planes[1].SetVisibility(value);
}
yoffset.onchange = (e) => {
    const value = (e.target as any).value as number;
    viewer.sceneManager.planes[1].SetOffset(value);
}
planez.onchange = (e) => {
    const value = (e.target as any).checked as boolean;
    viewer.sceneManager.planes[2].SetVisibility(value);
}
zoffset.onchange = (e) => {
    const value = (e.target as any).value as number;
    viewer.sceneManager.planes[2].SetOffset(value);
}


function UpdatePlanesMinMax() {
    xoffset.min = (viewer.sceneManager.planes[0].min - 1e-6).toString();
    xoffset.max = (viewer.sceneManager.planes[0].max + 1e-6).toString();
    yoffset.min = (viewer.sceneManager.planes[1].min - 1e-6).toString();
    yoffset.max = (viewer.sceneManager.planes[1].max + 1e-6).toString();
    zoffset.min = (viewer.sceneManager.planes[2].min - 1e-6).toString();
    zoffset.max = (viewer.sceneManager.planes[2].max + 1e-6).toString();
    xoffset.step = 1e-6.toString();
    yoffset.step = 1e-6.toString();
    zoffset.step = 1e-6.toString();

}