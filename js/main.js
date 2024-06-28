let name = document.getElementById('name');
let category = document.getElementById('category');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let total = document.getElementById('total');
let create = document.getElementById('create');

let mood = 'Create';

let temp;


//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value ) - +discount.value;
        total.innerHTML = result;
    }
}

//create product
let dataPro ;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [];
}

create.onclick = function create(){
        let newPro = {
            name:name.value.toLowerCase(),
            category:category.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            discount:discount.value,
            count:count.value,
            total:total.innerHTML
        };
        if (name.value != '' && count.value <= 100) {
            if (mood === 'Create') {
                if (newPro.count > 1) {
                    for (let i = 0; i < newPro.count; i++) {
                        dataPro.push(newPro);
                    }
                }else{
                    dataPro.push(newPro);
                }

            }else{
                // Update
                dataPro[temp] = newPro;
                mood ='Create';
                create.innerHTML = 'Create';
                count.style.display = 'block';
            }
        //save local Stoarage
        localStorage.setItem('product',JSON.stringify(dataPro));
    
        clearData();
    
        showData();
        }else {
            alert("PLEASE ENTER ANY NAME");
        }
        if (price.value == '') {
            alert("PLEASE ENTER ANY PRICE");
        }
}

//Clear Inputs
function clearData() {
    name.value = '';
    category.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    count.value = '';
    total.innerHTML = '';
}

//Read
function showData() {
    let table = '';
        for (let i = 0; i < dataPro.length; i++) {
            table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].name}</td>
                    <td>${dataPro[i].category}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td><button onclick="updateData(${i})" class="btn btn-primary">Update</button></td>
                    <td><button onclick="delPro(${i})" class="btn btn-danger">Delete</button></td>
                    </tr>
                    `
                }
                document.getElementById('tBoody').innerHTML = table;
                
                let btnDelAll = document.getElementById('deleteAll');
                if (dataPro.length > 0) {
                    btnDelAll.innerHTML = `<button onclick="delAll()" class="btn btn-danger mb-2 w-100">Delete All (${dataPro.length})</button>`
                }else{
                    btnDelAll.innerHTML = '';
                }
}

    showData();


//Delete
function delPro(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function delAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//Update
function updateData(i) {
    mood = 'Update';
    create.innerHTML = 'Update';
    name.value = dataPro[i].name;
    category.value = dataPro[i].category;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    discount.value = dataPro[i].discount;
    count.style.display = "none";
    getTotal();
    temp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
//Search

let searchMood = 'Name'; 

function getSearchMood(id) {

    let search = document.getElementById('search'); 
    
    if (id == 'searchName') {
        searchMood = 'Name';
    }else{
        searchMood = 'Category';
    }
    search.placeholder = 'Search By '+searchMood;
    search.focus();
    search.value ='';
    showData();
}

function searchData(value) { 
        let table = '';
        for (let i = 0; i < dataPro.length; i++) {
            if (searchMood == 'Name') {
                if (dataPro[i].name.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].name}</td>
                    <td>${dataPro[i].category}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td class="bg-light text-dark ">${dataPro[i].total}</td>
                    <td><button onclick="updateData(${i})" class="btn btn-primary">Update</button></td>
                    <td><button onclick="delPro(${i})" class="btn btn-danger">Delete</button></td>
                    </tr>
                    `
                }
            }else{
                if (dataPro[i].category.includes(value.toLowerCase())) {
                    table += `
                    <tr> 
                    <td>${i+1}</td>
                    <td>${dataPro[i].name}</td>
                    <td>${dataPro[i].category}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td class="bg-light text-dark ">${dataPro[i].total}</td>
                    <td><button onclick="updateData(${i})" class="btn btn-primary">Update</button></td>
                    <td><button onclick="delPro(${i})" class="btn btn-danger">Delete</button></td>
                    </tr>
                    `
                }
            }  
        }
        document.getElementById('tBoody').innerHTML = table;
}

//Clean data
