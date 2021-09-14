import * as fs from 'fs';
import { Canvas, createCanvas, loadImage, NodeCanvasRenderingContext2D } from "canvas";
import { ImgWidthPx, ImgHeightPx } from "./config";


class Image {
    private _canvas: Canvas;
    private _ctx: NodeCanvasRenderingContext2D; 
    private _allLayerList: Array<any>;

    constructor(_dnaLayerList) {
        this._canvas = createCanvas(ImgWidthPx, ImgHeightPx);
        this._allLayerList = _dnaLayerList;

        this._ctx = this._canvas.getContext("2d");
        // this._ctx.imageSmoothingEnabled = false;
        // this._ctx.patternQuality = 'nearest';
        // this._ctx.quality = 'nearest';
        // this._ctx.textDrawingMode = 'glyph';
    }

    async generate(_editionNo: number) {
        this.emptyImage();
        this.drawBackground();

        let loadedElements = await this.loadAllLayerImg();
        loadedElements.forEach((element) => this.drawElement(element));

        this.saveImage(_editionNo);
    }

    private drawElement = (_element) => {
      this._ctx.drawImage(
        _element.loadedImage,
        _element.layer.position.x,
        _element.layer.position.y,
        _element.layer.size.width,
        _element.layer.size.height
      );
    };

    private loadAllLayerImg = async () => {
        let loadedElements = [];

        // load all images to be used by canvas
        this._allLayerList.forEach(async (layer) => {
            loadedElements.push(this.loadLayerImg(layer));
        });

        return Promise.all(loadedElements);
    }
    
    // loads an image from the layer path
    // returns the image in a format usable by canvas
    private loadLayerImg = async (_layer) => {
        return new Promise(async (resolve) => {
            const image = await loadImage(`${_layer.selectedElement.path}`);
            resolve({ layer: _layer, loadedImage: image });
        });
    };
    
    private genColor = () => {
        let hue = Math.floor(Math.random() * 360);
        let pastel = `hsl(${hue}, 100%, 85%)`;
        
        return pastel;
    };
    
    private drawBackground = () => {
        // this._ctx.fillStyle = this.genColor();
        // this._ctx.fillRect(0, 0, ImgWidthPx, ImgHeightPx);
    };
    
    private saveImage = (_editionCount) => {
        fs.writeFileSync(
            `./generated/images/${_editionCount}.png`,
            this._canvas.toBuffer("image/png", { 
                // compressionLevel: 0,
                // resolution: 1024 
            })
        );

        console.log(`Saved ${_editionCount}.png`)
    };

    private generateMetadata = (
        _dna: number[], 
        _edition: number,
        _attributesList: any
    ) => {
      let dateTime = Date.now();
      let tempMetadata = {
        dna: _dna.join(""),
        name: `#${_edition}`,
        // description: description,
        // image: `${baseImageUri}/${_edition}`,
        edition: _edition,
        date: dateTime,
        attributes: _attributesList,
      };
      return tempMetadata;
    };
    
    private emptyImage = () => {
        this._ctx.clearRect(0, 0, ImgWidthPx, ImgHeightPx);
    }
}


export { Image }
