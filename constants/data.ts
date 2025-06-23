import { images } from "./images";

export const designTypeList = [
    {
        name: 'Modern',
        image: images.modernImg,
    },
    {
        name: 'Industrial',
        image: images.industrialImg,
    },
    {
        name: 'Bohemian',
        image: images.bohemianImg,
    },
    {
        name: 'Traditional',
        image: images.traditionalImg,
    },
    {
        name: 'Rustic',
        image: images.rusticImg,
    },
    {
        name: 'Minimalist',
        image: images.minimalistImg,
    }
]

// 产品名
export const prodName = 'Room AI'

export const model = {
    interior: 'jschoormans/interior-v2:8372bd24c6011ea957a0861f0146671eed615e375f038c13259c1882e3c8bac7',
    stableInterior: 'youzu/stable-interiors-v2:4836eb257a4fb8b87bac9eacbef9292ee8e1a497398ab96207067403a4be2daf'
}