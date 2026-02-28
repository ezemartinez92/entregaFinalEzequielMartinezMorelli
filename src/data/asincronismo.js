import { zapatos } from './zapatos'; 
export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(zapatos);
        }, 500);
    });
};

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(zapatos.filter(prod => prod.categoria === categoryId));
        }, 500);
    });
};

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(zapatos.find(prod => prod.id === parseInt(productId)));
        }, 500);
    });
};