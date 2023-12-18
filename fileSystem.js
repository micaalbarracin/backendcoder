const {promises: fs} = require('fs')

class ProductManager {
    constructor(){
        this.patch= "./productos.txt";
        this.productos=[]

    }

    static id= 0;

    addProduct= async (title, description, price, imagen, stock)=>{
        
        ProductManager.id ++;
        let newProduct={
            title,
            description,
            price,
            imagen,
            stock,
            id: ProductManager.id
        };

        this.productos.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.productos));

    };

    readProducts= async()=>{
        let respuesta= await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async()=> {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id)=> {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find((product)=> product.id=== id));
        }

    };

    deleteProductsById= async (id)=>{
        let respuesta3= await this.readProducts();
        let productFilter= respuesta3.filter(products=> products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("producto eliminado")

    };


    updateProducts = async({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productId= await this.readProducts();
        let productsModif= [{...producto, id}, ...productId];
        await fs.writeFile(this.patch, JSON.stringify(productsModif) );

    };
}

const products= new ProductManager();

products.addProduct("Nombre", "Descripcion", 7000, "imagen", "stock", 1);
