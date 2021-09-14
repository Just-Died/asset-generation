import { Layers } from "./types";

const dir = `${__dirname}/../layers`;
const AssetLayers: Layers[] = [
    {
        name: "Teeth",
        required: true,
        path: `${dir}/Teeth/`,
        elements: [
            {
                id: 0,
                name: 'Black Normal',
                filename: `black\ normal.svg`,
                colorScheme: 'black',
                rarityRating: 0,
            },
            {
                id: 1,
                name: 'White Normal',
                filename: `white\ normal.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            },
            {
                id: 2,
                name: 'White Missing Teeth',
                filename: `white\ missing\ teeth.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            },
            {
                id: 3,
                name: 'Black Missing Teeth',
                filename: `black\ missing\ teeth.svg`,
                colorScheme: 'black',
                rarityRating: 0,
            },
        ]
    },
    {
        name: "Bones",
        required: true,
        path: `${dir}/Bones/`,
        elements: [
            {
                id: 0,
                name: 'Black Bones',
                filename: `black.svg`,
                colorScheme: 'black',
                rarityRating: 0,
            },
            {
                id: 1,
                name: 'White Bones',
                filename: `white2.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            }
        ]
    },
    {
        name: "Expression",
        required: true,
        path: `${dir}/Expression/`,
        elements: [
            // {
            //     id: 0,
            //     name: 'Black Normal',
            //     filename: `black\ normal.svg`,
            //     colorScheme: 'black',
            //     rarityRating: 0,
            // },
            {
                id: 1,
                name: 'White Normal',
                filename: `white\ normal.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            },
            {
                id: 2,
                name: 'Wink',
                filename: `wink.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            },
        ]
    },
    {
        name: "Hand",
        required: true,
        path: `${dir}/Hand/`,
        elements: [
            {
                id: 0,
                name: 'White Middle Finger',
                filename: `white\ middle\ finger.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            },
            {
                id: 1,
                name: 'White Peace Finger',
                filename: `white\ peace.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            },
            {
                id: 2,
                name: 'Black Middle Finger',
                filename: `black\ middle\ finger.svg`,
                colorScheme: 'black',
                rarityRating: 0,
            },
            {
                id: 3,
                name: 'Black Peace Finger',
                filename: `black\ peace.svg`,
                colorScheme: 'black',
                rarityRating: 0,
            },
            {
                id: 4,
                name: 'White Okay Finger',
                filename: `white\ okay.svg`,
                colorScheme: 'white',
                rarityRating: 0,
            },
        ]
    },
    {
        name: "Accessories",
        required: false,
        path: `${dir}/Accessories/`,
        elements: [
            {
                id: 0,
                name: '3d glasses',
                filename: `3d\ glasses.svg`,
                colorScheme: 'any',
                rarityRating: 0
            },
        ]
    },
    {
        name: "Hair",
        required: false,
        path: `${dir}/Hair/`,
        elements: [
            {
                id: 0,
                name: 'Mustache',
                filename: `mustache.svg`,
                colorScheme: 'any',
                rarityRating: 0
            },
        ]
    },
    {
        name: "Hat",
        required: false,
        path: `${dir}/Hat/`,
        elements: [
            {
                id: 0,
                name: 'Yellow Crown Red Gems',
                filename: `Yellow\ Crown\ Red\ Gems.svg`,
                colorScheme: 'any',
                rarityRating: 0
            },
            {
                id: 1,
                name: 'Halo',
                filename: `halo.svg`,
                colorScheme: 'any',
                rarityRating: 0
            },
            {
                id: 2,
                name: 'Durag',
                filename: `durag.svg`,
                colorScheme: 'any',
                rarityRating: 0
            },
        ]
    },
    {
        name: "BodySuit",
        required: false,
        path: ``,
        elements: [
            {
                id: 0,
                name: 'Goo',
                filename: [`${dir}/Goo/goo\ front.svg`, `${dir}/Goo/goo\ back.svg`],
                colorScheme: 'any',
                rarityRating: 0
            },
            {
                id: 1,
                name: 'Shirt',
                filename: [`${dir}/Shirt/tiedye\ front.svg`, `${dir}/Shirt/tiedye\ back.svg`],
                colorScheme: 'any',
                rarityRating: 0
            },
        ]
    },
]


const CollectionLength = 10;
const ImgHeightPx = 576;
const ImgWidthPx = 576;

const ColorClasses: string[] = [
    'white',
    // 'black',
];


export {
    CollectionLength,
    ImgHeightPx,
    ImgWidthPx,
    ColorClasses,
    AssetLayers
}