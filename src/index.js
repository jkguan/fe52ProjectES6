import {
  callapi,
  getListProductService,
  deleteProductService,
  addProductService,
  getProductById,
  updateProductService}
  from "./utils/callapi.js";
import Product from "./models/product.js";
// truoc khi import vao thì phai 

const renderHTML = () => {
  const contentHTML = `
    <div class="card text-white bg-dark">
      <div class="card-body"></div>
        <h4 class="card-title">Danh sách sản phẩm</h4>
        <div class='container'>
          <div class="row">
            <div class="col-md-3">
              <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
            </div>
            <div class="col-md-3">
              <input id="tenSP" class="form-control" placeholder="Tên SP" />
            </div>
            <div class="col-md-3">
              <input id="gia" class="form-control" placeholder="Giá" />
            </div>
            <div class="col-md-3">
              <input id="hinhAnh" class="form-control" placeholder="Link hình" />
            </div>
          </div>
          <br />
          <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
          <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
        </div>
      </div>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Mã SP</th>
            <th>Tên SP</th>
            <th>Giá </th>
            <th>Hình ảnh</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tblDanhSachNguoiDung">

        </tbody>
      </table>
    </div>
    `;
  getEle("root").innerHTML = contentHTML;
};

// renderHTML();

const renderTable = (listProduct) => {
  console.log(listProduct);
  if (listProduct && listProduct.length > 0) {
    let contentHTML = "";
    listProduct.map((product) => {
      console.log(product)
      contentHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.tenSP}</td>
                    <td>${product.gia}</td>
                    <td>
                        <img src="${product.hinhAnh}" width="50">
                    </td>
                    <td>
                        <button class="btn btn-info" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `;
    });
    return contentHTML;
  }

}


const renderListProduct = () => {
  // getListProductService()
    callapi("NguoiDung", "GET", null)
    .then((result) => {
      console.log(result.data);
      //DOM Tbody
      const contentTbody = renderTable(result.data);
      console.log(contentTbody);
      getEle("tblDanhSachNguoiDung").innerHTML = contentTbody;
    })
    .catch((errs) => {
      console.log(errs);
    });
};

renderHTML();
renderListProduct();

/* 
DELETE
*/
window.deleteProduct = deleteProduct;
console.log(window);

function deleteProduct(id) {
// const deleteProduct = (id) => { // KHONG THE VIET THANH ARROW FUNCTION
  console.log(id);
  // deleteProductService(id)
    callapi(`NguoiDung/${id}`, "DELETE", null)
    .then(() => {
      alert("Da Xoa Thanh Cong");
      renderListProduct();
    })
    .catch((errs) => {
      console.log(errs);
    });
};


/* 
ADD
*/
getEle("btnThem").addEventListener("click", function () {
  // let maSP = getEle("maSP").value; THEM SP KHONG CAN KHAI BAO ID, VI HE THONG TU SINH RA
  let tenSP = getEle("tenSP").value;
  let gia = getEle("gia").value;
  let hinhAnh = getEle("hinhAnh").value;

  const product44 = new Product("", tenSP, gia, hinhAnh);

  // addProductService(product)
    callapi("NguoiDung", "POST", product44)
    .then(() => {
      alert("Them Thanh Cong");
      renderListProduct();
    })
    .catch((errs) => {
      console.log(errs);
    });
});

/* 
EDIT
*/
window.editProduct = editProduct;
function editProduct(id) {
  // console.log(id);
  // getProductById(id)
    callapi(`NguoiDung/${id}`, "GET", null)
    .then((result) => {
      getEle("maSP").value = result.data.id;
      getEle("tenSP").value = result.data.tenSP;
      getEle("gia").value = result.data.gia;
      getEle("hinhAnh").value = result.data.hinhAnh;
    })
    .catch((errs) => {
      console.log(errs);
    });
}

/* 
UPDATE
*/
getEle("btnCapNhat").addEventListener("click", function () {
  let id = getEle("maSP").value;
  let tenSP = getEle("tenSP").value;
  let gia = getEle("gia").value;
  let hinhAnh = getEle("hinhAnh").value;

  const product55 = new Product(id, tenSP, gia, hinhAnh);

  updateProductService(product55)
  // callapi(`NguoiDung/${product55.id}`, "PUT", product55)
    .then(() => {
      alert("Cap Nhat Thanh Cong");
      renderListProduct();
    })
    .catch((errs) => {
      console.log(errs);
    });
});

function getEle(id) {
  return document.getElementById(id);
}






