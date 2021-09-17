import { constructLayerToDna } from "./src/core";
import { Image } from "./src/draw";

(async() => {
    try {
        const _dnaListJSON: number[][] = require('./generated/stats/_dnaList.json');
        
        if(!_dnaListJSON) {
            console.log(`DNA List is empty!!!`);
            return;
        }

        _dnaListJSON.forEach(async (_dna, index) => {
            const _dnaLayerObjectList =  constructLayerToDna(_dna);
            
            const create = new Image(_dnaLayerObjectList);
            await create.generate(index+1);
        })

    } catch(error) {
        console.log(error);
    }
})();