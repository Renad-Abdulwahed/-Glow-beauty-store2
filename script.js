/* ==========================================
   ✨ GLOW BEAUTY STORE - CORE JAVASCRIPT ✨
   ========================================== */

// دالة مساعدة لجلب مصفوفة المنتجات من اللوكال ستورج
function getStoreProducts() {
    var data = localStorage.getItem("my_glow_products");
    return data ? JSON.parse(data) : [];
}

function login() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var errorMsg = document.getElementById("errorMsg");

    // تنظيف قبل التحقق
    username.classList.remove("error-field");
    password.classList.remove("error-field");
    errorMsg.innerHTML = "";

    var valid = true;

    if (username.value.trim() === "") {
        username.classList.add("error-field");
        valid = false;
    }

    if (password.value.trim() === "") {
        password.classList.add("error-field");
        valid = false;
    }

    if (!valid) {
        errorMsg.innerHTML = "⚠️ You must fill in the required field";
        return;
    }

    // إذا كل شيء صحيح يدخل الهوم
    window.location.href = "index.html";
    
localStorage.setItem("username", username.value.trim());
window.location.href = "index.html";
}


// 2. دالة إضافة منتج جديد (النسخة الأصلية المعتمدة على الروابط النصية المباشرة)
function addProduct() {
    var nameField = document.getElementById("name");
    var priceField = document.getElementById("price");
    var catField = document.getElementById("category");
    var imgField = document.getElementById("image"); // رجع حقل نصي للروابط
    var resultDiv = document.getElementById("result");

    // إزالة كلاسات الخطأ قبل الفحص الجديد
    nameField.classList.remove("error-field");
    priceField.classList.remove("error-field");
    catField.classList.remove("error-field");
    imgField.classList.remove("error-field");

    var checkValid = true;

    // الفحص التقليدي: لو الحقل فارغ نضيف الكلاس الأحمر
    if (nameField.value.trim() == "") { nameField.classList.add("error-field"); checkValid = false; }
    if (priceField.value.trim() == "") { priceField.classList.add("error-field"); checkValid = false; }
    if (catField.value.trim() == "") { catField.classList.add("error-field"); checkValid = false; }
    if (imgField.value.trim() == "") { imgField.classList.add("error-field"); checkValid = false; }

    if (checkValid == false) {
        resultDiv.innerHTML = "<p style='color:#ff4d6d; font-weight:bold;'> Please fill all fields marked in red!</p>";
        return;
    }

    var products = getStoreProducts();

    // حفظ المنتج بالرابط النصي المباشر كما هو بدون أي فلسفة أو تعديل
    products.push({
        name: nameField.value.trim(),
        price: priceField.value.trim(),
        category: catField.value.trim(),
        image: imgField.value.trim() 
    });

    localStorage.setItem("my_glow_products", JSON.stringify(products));

    resultDiv.innerHTML = "<p style='color:green; font-weight:bold;'>✨ Product Added Successfully!</p>";
    
    // تفريغ الحقول بعد النجاح
    nameField.value = "";
    priceField.value = "";
    catField.value = "";
    imgField.value = "";
}
// 3. دالة عرض المنتجات المخزنة ديناميكياً داخل شبكة الكروت
function displayProducts() {
    var grid = document.getElementById("productsGrid");
    if (!grid) return;

    var products = getStoreProducts();
    grid.innerHTML = ""; 

    if (products.length == 0) {
        grid.innerHTML = "<h3>The store database is currently empty! ✨</h3>";
        return;
    }

    // طباعة الكروت المخزنة الحقيقية بالتنسيق السليم
    products.forEach(function(item) {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.price} SAR</p>
                <p class="category">${item.category}</p>
            </div>
        `;
    });
}

// 4. دالة حذف المنتج بالاسم مع الفحص بالأحمر (تم إصلاح الفلتر المكسور)
function deleteProduct() {
    var delField = document.getElementById("deleteName");
    var resultDiv = document.getElementById("deleteResult");
    delField.classList.remove("error-field");

    if (delField.value.trim() == "") {
        delField.classList.add("error-field");
        resultDiv.innerHTML = "<p style='color:#ff4d6d;'>Please enter a product name!</p>";
        return;
    }

    var products = getStoreProducts();
    
    // إصلاح الفلتر الناقص هنا بالكامل
    var filtered = products.filter(function(item) {
        return item.name.toLowerCase() != delField.value.trim().toLowerCase();
    });

    if (products.length == filtered.length) {
        resultDiv.innerHTML = "<p style='color:#ff4d6d;'> Product Not Found in Store!</p>";
    } else {
        localStorage.setItem("my_glow_products", JSON.stringify(filtered));
        resultDiv.innerHTML = "<h2>Product Deleted Successfully </h2><p>" + delField.value + " has been removed.</p>";
        delField.value = "";
    }
}

// 5. دالة تعديل اسم المنتج مع الفحص بالأحمر
function updateProduct() {
    var oldField = document.getElementById("oldName");
    var newField = document.getElementById("newName");
    var resultDiv = document.getElementById("updateResult");

    oldField.classList.remove("error-field");
    newField.classList.remove("error-field");

    var isValid = true;
    if (oldField.value.trim() == "") { oldField.classList.add("error-field"); isValid = false; }
    if (newField.value.trim() == "") { newField.classList.add("error-field"); isValid = false; }

    if (!isValid) {
        resultDiv.innerHTML = "<p style='color:#ff4d6d;'>Please fill both name fields!</p>";
        return;
    }

    var products = getStoreProducts();
    var found = false;

    products.forEach(function(item) {
        if (item.name.toLowerCase() == oldField.value.trim().toLowerCase()) {
            item.name = newField.value.trim();
            found = true;
        }
    });

    if (found == false) {
        resultDiv.innerHTML = "<p style='color:#ff4d6d;'>Current Product Name Not Found!</p>";
    } else {
        localStorage.setItem("my_glow_products", JSON.stringify(products));
        resultDiv.innerHTML = "<h2>Product Updated Successfully </h2><p>" + oldField.value + " changed to " + newField.value + "</p>";
        oldField.value = "";
        newField.value = "";
    }
}

// 6. دالة البحث الديناميكي في اللوكال ستورج
function searchProduct() {
    var searchField = document.getElementById("searchName");
    var resultDiv = document.getElementById("searchResult");
    searchField.classList.remove("error-field");

    if (searchField.value.trim() == "") {
        searchField.classList.add("error-field");
        resultDiv.innerHTML = "<p style='color:#ff4d6d; width:100%;'>Please enter a query!</p>";
        return;
    }

    var products = getStoreProducts();
    resultDiv.innerHTML = "";
    var found = false;

    products.forEach(function(item) {
        if (item.name.toLowerCase().includes(searchField.value.trim().toLowerCase())) {
            found = true;
            resultDiv.innerHTML += 
                "<div class='product-card'>" +
                    "<img src='" + item.image + "'>" +
                    "<h2>" + item.name + "</h2>" +
                    "<p>" + item.price + " SAR</p>" +
                    "<p class='category'>" + item.category + "</p>" +
                "</div>";
        }
    });

    if (found == false) {
        resultDiv.innerHTML = "<h2>Product Not Found </h2>";
    }
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // نحفظ الوضع عشان يبقى ثابت
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// تشغيل الوضع عند فتح الصفحة
window.onload = function () {
    var theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }

    // كود اليوزر حقك (الترحيب)
    var name = localStorage.getItem("username");
    if (name && document.getElementById("welcome")) {
        document.getElementById("welcome").innerHTML = "Welcome " + name + " 👋";
    }
};
window.onload = function () {

    var theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }

};
