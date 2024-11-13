class ProductModel {
    constructor({ barcode, name, description, categoryId, subcategoryId, sizeId, colorId, price, stock, iva, image, status, user = '', userUpdate = '' }) {
        
        this.barcode = barcode;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.subcategoryId = subcategoryId;
        this.sizeId = sizeId;
        this.colorId = colorId;
        this.price = price;
        this.stock = stock;
        this.iva = iva;
        this.image = image;
        this.status = status;
        this.user = user;
        this.date = new Date();;
        this.userUpdate = userUpdate;
        this.dateUpdate = new Date();
    }
}

export default ProductModel;