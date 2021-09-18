import { Layers } from "./types";

const AssetLayers: Layers[] = require('../generated/_assetsLayers.json');

const CollectionLength = 10000;
const ImgHeightPx = 2048;
const ImgWidthPx = 2048;

const ColorClasses: string[] = [
    'white',
    'black',
    'rainbow'
];


export {
    CollectionLength,
    ImgHeightPx,
    ImgWidthPx,
    ColorClasses,
    AssetLayers
}