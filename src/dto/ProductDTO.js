
class ProductDTO {
    constructor(product) {
        // Validación básica de datos.
        const { id, barcode, name, description, categoryId, subcategoryId, sizeId, colorId, price, stock,  iva, image, status } = product;

        this.id = id;
        this.barcode = barcode;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.sizeId = sizeId;
        this.colorId = colorId;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.iva = iva;
        this.status = status;


        if (!id || !name) {
            throw new Error("Invalid data for ProductDTO");
        }
    }

    static fromModel(productModel) {
        return new ProductDTO({
            id: productModel.id,
            barcode: productModel.barcode,
            name: productModel.name,
            description: productModel.description,
            categoryId: productModel.categoryId,
            subcategoryId: productModel.subcategoryId,
            sizeId: productModel.sizeId,
            colorId: productModel.colorId,
            price: productModel.price,
            stock: productModel.stock,
            iva: productModel.iva,
            image: productModel.image,
            status: productModel.status
        });
    }

    static toModel(productDTO) {
        return {

            barcode: productDTO.barcode,
            name: productDTO.name,
            description: productDTO.description,
            categoryId: productDTO.categoryId,
            subcategoryId: productDTO.subcategoryId,
            sizeId: productDTO.sizeId,
            colorId: productDTO.colorId,
            price: productDTO.price,    
            stock: productDTO.stock,
            iva: productDTO.iva,
            image: productDTO.image,    
            status: productDTO.status
        };
    }
}

export default ProductDTO;
