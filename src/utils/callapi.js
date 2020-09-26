import { API_URL } from "../config/index.js";

const callapi = (urid, method = "GET", data) =>{
    return axios ({
        url: API_URL + urid,
        method,
        data,
    });
};

const getListProductService = () => {
    return axios ({
        url:"https://5f5c7a355e3a4d0016249430.mockapi.io/api/NguoiDung",
        method: "GET",
    });
};

const deleteProductService = (id) =>{
    return axios ({
        url: `https://5f5c7a355e3a4d0016249430.mockapi.io/api/NguoiDung/${id}`,
        method: "DELETE",
    });
};

const addProductService = (product) =>{
    return axios ({
        url: `https://5f5c7a355e3a4d0016249430.mockapi.io/api/NguoiDung`,
        method: "POST",
        data: product,
    });
};

const getProductById = (id) =>{
    return axios ({
        url: `https://5f5c7a355e3a4d0016249430.mockapi.io/api/NguoiDung/${id}`,
        method: "GET",
    });
};

const updateProductService = (product) =>{
    return axios ({
        url: `https://5f5c7a355e3a4d0016249430.mockapi.io/api/NguoiDung/${product.id}`,
        method: "PUT",
        data: product, //update len data
    });
};

export {callapi, getListProductService, deleteProductService, addProductService, getProductById, updateProductService};

// https://5f5c7a355e3a4d0016249430.mockapi callapi