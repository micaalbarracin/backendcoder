

class ProductManager {
    constructor(){
        this.products= []
    }
    getProducts(){
        return this.products
    }

    addProduct(product){
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            return "llenar campos productos"
        }
        const result = this.products.find (prod => prod.code === product.code)

        if (result){
            return "Existe el producto con ese código"
        }

        if (this.products.length === 0){
            product.id = 1
            this.products.push (product)

        }else{
            product.id = this.products.length + 1
            this.products.push(product)
        }
        return "producto agregado"
    }

    getProductById (pid) {
        const result = this.products.find( prod => prod.id === pid)
        if (!result){
            return "no existe el producto"

        }
        return result
    }

}


const products = new ProductManager()
console.log(products.addProduct({ title: "Cartera Mika", description: "material eco-cuero", price: 7000, thumbnail: "imagen", stock: 14, code:"232345"}))
console.log(products.addProduct({ title: "Mochila Kika", description: "material eco-cuero", price: 9000, thumbnail: "imagen", stock: 10, code:"232346"}))

console.log(products.getProductById(3))
