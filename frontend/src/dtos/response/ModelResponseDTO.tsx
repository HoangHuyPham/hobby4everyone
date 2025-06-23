export interface ModelResponseDTO{
    modelId:string;
    name:string;
    description:string;
    price:number;
    quantity:number;
    see:boolean;
    isDelete:boolean;
    images:Array<string>
}