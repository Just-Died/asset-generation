import * as fs from 'fs';
import { 
    AssetLayers, 
    ColorClasses, 
    ImgHeightPx, 
    ImgWidthPx 
} from "./config";


/**
 * Gives a random integer between 0 and max
 * @param max 
 */
const random = (max: number): number => Math.floor(Math.random()*max);

/**
 * Checks if the selected combination of DNA is unique or not
 * @param _dnaList
 */
const isDnaUnique = (_dnaList: Array<number>, _globalDnaList) => {
    return _globalDnaList[_dnaList.join('')] === undefined;
}

/* Gives a random Color class */
const chooseClass = (): string => {
    return ColorClasses[random(ColorClasses.length)];
}

/**
 * Create a dna based on rarity and color
 * @param color
 */
const createDna = (color: string) => {
    let dna: Array<number> = [];
    AssetLayers.forEach(layer => {
        let layerIds = [];

        /* layer is optional and probability greater than 50% */
        if(!layer.required && random(2) === 1) {
            /* Layer not included */
            layerIds.push(-1);
        }

        /* Select layers based on rarity and color */
        while(!layerIds.length) {
            let randomNum = random(100);

            layer.elements.forEach(element => {
                if(
                    randomNum >= element.rarityRating &&
                    (color === element.colorScheme || element.colorScheme === 'any')
                ) {
                    layerIds.push(element.id);
                }
            });
        }
        
        /* Select one layer among the selected layers */
        dna.push(layerIds[random(layerIds.length)]);
    })
    
    return dna;
}

/**
 * This Constructs the DNA structure required for the Canvas api
 * @param _dna 
 */
const constructLayerToDna = (_dna: number[]) => {
    let returnObject = [];
    AssetLayers.forEach((layer, _) => {
        let selectedElement = layer.elements.find(e => e.id === _dna[_]);
        
        if(selectedElement) {
            /* This means selectedElements contains 2 svg files one goes in front of layers 
               and another in sequence to the layers organized in config.ts */
            if (typeof selectedElement.filename === 'string') {
                returnObject.push({
                  name: layer.name,
                  position: { x: 0, y: 0 },
                  size: { width: ImgWidthPx, height: ImgHeightPx },
                  selectedElement: { ...selectedElement, path: layer.path + selectedElement.filename },
                });
            } else {
                returnObject.push({
                  name: layer.name,
                  position: { x: 0, y: 0 },
                  size: { width: ImgWidthPx, height: ImgHeightPx },
                  selectedElement: { ...selectedElement, path: selectedElement.filename[0] },
                })
    
                returnObject.unshift({
                  name: layer.name,
                  position: { x: 0, y: 0 },
                  size: { width: ImgWidthPx, height: ImgHeightPx },
                  selectedElement: { ...selectedElement, path: selectedElement.filename[1] },
                });
            }
        }
    })

    return returnObject;
}

/**
 * Write metadata for the Collection
 * @param _data string data
 */
const writeMetaData = (_data: string= '') => {
    fs.writeFileSync(
        "./generated/assets/_metadata.json", 
        _data,
    );
};

export {
    isDnaUnique,
    chooseClass,
    createDna,
    constructLayerToDna,
    writeMetaData,
}
