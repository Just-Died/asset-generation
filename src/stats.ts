import * as fs from 'fs';
import { AssetLayers, CollectionLength, ColorClasses } from "./config";
import { GlobalDnaList, StatsList } from "./types";

const maxCollectionsPossible = (): number => {
    if(!AssetLayers.length) 
        return 0;

    if(!ColorClasses.length) {
        let res = 1;
        AssetLayers.forEach(_ => {
            res *= _.elements.length;
        })

        return res;
    }
        
    let result = 0;
    ColorClasses.forEach(color => {
        let color_res = 1;
        AssetLayers.forEach(_ => {
            let asset_res = _.required ? 0 : 1;
            _.elements.forEach(e => {
                if(e.colorScheme === color || e.colorScheme === 'any')
                    asset_res++;
            });

            if(asset_res === 0) {
                color_res = 0
                return;
            }

            color_res *= asset_res;         
        })
        
        if(color_res === 0) {
            result = 0
            return;
        }
        result += color_res;
    })
    
    return result;
}

const calcRarityPercentage = (_globalDnaList: GlobalDnaList): StatsList => {
    let assets = [];

    AssetLayers.map(layers => {
        let object = {};
        object[-1] = layers.name;
        layers.elements.map(element => {
            object[element.id] = {
                name: element.name,
                count: 0,
            }
        })

        assets.push(object);
    });

    Object.keys(_globalDnaList).forEach(dnaKey => {
        _globalDnaList[dnaKey].forEach((dnaId, dnaIndex) => {
            if(dnaId !== -1)
                assets[dnaIndex][dnaId].count += 1;
        })
    })

    const result: StatsList = {};
    assets.map(asset => {
        const assetStatObject: StatsList['layer'] = [];
        console.log(`\nLayer: ${asset[-1]}`);
        Object.keys(asset).map(_ => {
            if(_ !== '-1') {
                const assetObject = {
                   [asset[_].name]: ((asset[_].count*100)/CollectionLength).toFixed(2) + '%'
                };

                assetStatObject.push(assetObject);
                console.log(JSON.stringify(assetObject));
            } 
        })

        result[asset[-1]] = assetStatObject;
    })

    return result;
}

const writeDnaData = (max: number, _gloablDnaList: GlobalDnaList) => {
    const _statData: StatsList = calcRarityPercentage(_gloablDnaList);

    fs.writeFileSync(
        "./generated/stats/_dnaList.json", 
        JSON.stringify(Object.values(_gloablDnaList), null, 4),
    );
    fs.writeFileSync(
        "./generated/stats/_dnaStats.json", 
        JSON.stringify({
            MaxGenerationPossible: max,
            ..._statData
        }, null, 4),
    );
}

export {
    calcRarityPercentage,
    maxCollectionsPossible,
    writeDnaData
};
