import glob from 'glob';
import * as fs from 'fs';

const LayerOrder = [
    'Teeth',
    'Bones',
    'Expression',
    'Hat',
    'Accessories',
    'Hand',
    'Hair',
    'Shirt'
]

const getColor = (name: string) => {
    if (name.toLowerCase().includes('rainbow'))
        return 'rainbow';
    else if (name.toLowerCase().includes('black'))
        return 'black';
    else if (name.toLowerCase().includes('white'))
        return 'white';

    return 'any';
}

const required = (name: string) => {
    return ['Teeth', 'Hand', 'Expression', 'Bones'].includes(name)
}

(async () => {
    try {

        const Layers = [];

        const layerNames = glob.sync('./layers/*');
        layerNames.forEach(layerName => {
            const elements = [];
            
            const layerElements = glob.sync(layerName + '/**/*.svg');            
            layerElements.forEach((_, id) => {
                const _name = _.replace(layerName, '').replace('.svg', '').split('/').pop();
                const name = _name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                const colorScheme = getColor(_);

                if(_name.charAt(_name.length-1) === '2') {
                    let lastElement = elements.pop();
                    
                    if(lastElement.name.includes(name.slice(0,-1))) {
                        lastElement = { ...lastElement, filename: [lastElement.filename, _] }
                    }

                    elements.push(lastElement);
                } else {
                    elements.push({ 
                        id,
                        name,
                        colorScheme, 
                        filename: _ ,
                        rarityRating: 0,
                    });
                }
            })

            const name = layerName.split('/').pop();
            Layers.push({
                name,
                required: required(name),
                path: ``,
                elements
            })
        });

        let writeData = Layers.map(_ => -1);
        Layers.forEach(layer => {
            writeData[LayerOrder.indexOf(layer.name)] = layer;
        })

        fs.writeFileSync(
            "./generated/_assetsLayers.json", 
            JSON.stringify(writeData, null, 4)
        );

    } catch(err) {
        console.log(err)
    }
})();
