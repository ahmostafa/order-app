import { Product } from './product';

export const PRODUCTS: Product[] = [
    {
        sku: 1111 ,
        name: '5-Euro-Münzen 2016–2021',
        regularPrice: 12.9,
        onSale: true,
        isAvailable: true,
        salePrice: 4.33,
        delivaryFees:7.33,
        quantityLimitToOrder: 3 ,
         currency: 'EUR',
        // salePercentage: number;
        shortDescription: 'Die offiziellen deutschen 5-Euro-Münzen 2016–2021 komplett',
        shortDescriptionHtml: '',
        lognDescription: '',
        longDescriptionHtml: '',
        wight: 9 ,
        wightUnit: 'g',
        dimension: 27.25,
        dimensionUnit: 'mm',
        // tslint:disable-next-line:max-line-length
        imageThumbUrl: 'https://mdm.scene7.com/is/image/MDM/mf_liste_Sammlung_folderabo_rund_neu_miniwarenkorb?$miniwarenkorb$&$muenze_1=subtropische_zone_vs&$muenze_2=Subtropisch_A&$muenze_3=5-Euro-Motiv&$muenze_4=5-E-Klimazone-VS_neu&$muenze_5=Planet_Erde&$muenze_6=Planet_Erde_5&$muenze_7=G_350044-001_350045-001_350046-001_1&$muenze_8=350044_1&$muenze_9=350044_2_1&$muenze_11=350044_3&$wa_1=1303260103_geschlossen&$wa_2=subtropische_zone_ehz', // thumnail image url
        imagesUrls: [],
        preOwned: false // if there is old owner
    }
];
