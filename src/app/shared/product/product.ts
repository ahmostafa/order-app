export class Product {
    sku: number; // uniq id for the product
    name: string; // name of the product
    regularPrice: number;
    onSale: boolean;
    salePrice: number;
    quantityLimitToOrder: number; // max number allowed to order from this product
    // currency: string;
    // salePercentage: number;
    shortDescription: string;
    shortDescriptionHtml: string;
    lognDescription: string;
    longDescriptionHtml: string;
    wight: number;
    imageThumbUrl: string; // thumnail image url
    imagesUrls: string[];
    preOwned: boolean; // if there is old owner

}
