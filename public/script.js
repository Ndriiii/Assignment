document.addEventListener("DOMContentLoaded", () => {
  const categoryBtn = document.getElementById("categoryBtn");
  const categoryMenu = document.getElementById("categoryMenu");
  document.getElementById("year").textContent = new Date().getFullYear()

  categoryBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    categoryMenu.style.display =
      categoryMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!categoryMenu.contains(e.target) && e.target !== categoryBtn) {
      categoryMenu.style.display = "none";
    }
  });

  loadHomePageData();
});

const API_BASE_URL = 'http://localhost:3000/api';

async function loadHomePageData() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/home`);
    const data = await response.json();
    
    if (response.ok) {
      populateSection('new', data.newProducts);
      populateSection('bestsellers', data.bestSellerProducts);
      populateSection('offer', data.discountProducts);
      populateSection('mountain', data.mountainBikes);
      populateSection('road', data.roadBikes);
      populateSection('electric', data.electricBikes);
      
      initializeModals();
    } else {
      console.error('Error loading home page data:', data.error);
    }
  } catch (error) {
    console.error('Error fetching home page data:', error);
  }
}

function populateSection(sectionId, products) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const productList = section.querySelector('.product-list');
  if (!productList) return;
  
  productList.innerHTML = '';
  
  if (!products || products.length === 0) {
    productList.innerHTML = '<p> No products available </p>';
    return;
  }
  
  products.forEach(product => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });
}

function formatPrice(value) {
  return new Intl.NumberFormat('id-ID').format(value);
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  const discountBadge = product.is_discount ? 
    `<div class = "discount-badge">-${product.discount_percentage}%</div>` : '';
  
  const priceDisplay = product.is_discount ? 
    `<div class = "price-wrapper">
      <span class = "original-price"> Rp. ${formatPrice(product.original_price)} </span>
      <p class = "product-price"> Rp. ${formatPrice(product.price)} </p>
    </div>` :
  `<p style = "margin-top: 50px;" class = "product-price"> Rp. ${formatPrice(product.price)}</p>`;

  
  card.innerHTML = `
    ${discountBadge}
    <img src = "/img/${product.image_name}" alt = "${product.name}" class = "product-image" onerror = "this.src='/img/placeholder.jpg'"/>
    <div class = "product-info">
      <h3 class = "product-name"> ${product.name} </h3>
      <p class = "product-category"> ${product.category} </p>
      <p class = "product-description"> ${product.description} </p>
      ${priceDisplay}
    </div>
    <button class = "view-button" data-product-id="${product.id}"> View Details </button>
  `;
  
  return card;
}

function initializeModals() {
  const modal = document.getElementById("productModal");
  const closeBtn = document.querySelector(".close-btn");
  const viewButtons = document.querySelectorAll(".view-button");

  viewButtons.forEach(button => {
    button.addEventListener("click", async function() {
      const productId = this.getAttribute('data-product-id');
      await showProductModal(productId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      closeModal(modal);
    });
  }

  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}

async function showProductModal(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    const product = await response.json();
    
    if (response.ok) {
      document.getElementById("modalTitle").textContent = product.name;
      document.getElementById("modalImage").src = `/img/${product.image_name}`;
      document.getElementById("modalCategory").textContent = `Category: ${product.category}`;
      document.getElementById("modalDescription").textContent = `Description: ${product.description}`;
      
      if (product.is_discount) {
        document.getElementById("modalPrice").innerHTML = 
          `<span style = "color: #0a0a0a;"> Price: Rp. ${formatPrice(product.price)} </span> <span class = "original-price"> Rp. ${formatPrice(product.original_price)}</span> <span style = "color: red;"> (${product.discount_percentage}% off) </span>`;
      } else {
        document.getElementById("modalPrice").innerHTML = `<span style = "color: #0a0a0a;"> Price: Rp. ${formatPrice(product.price)} </span>`;
      }
      
      const modal = document.getElementById("productModal");
      modal.style.display = "flex";
      modal.style.visibility = "visible";
      document.body.style.overflow = "hidden";
    } else {
      console.error('Error loading product details:', product.error);
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
}

function closeModal(modal) {
  modal.style.display = "none";
  modal.style.visibility = "hidden";
  document.body.style.overflow = "auto";
}

const productLists = document.querySelectorAll('.product-list');
productLists.forEach(productList => {
  let isScrolling = false;
  
  productList.addEventListener('wheel', function (e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      if (!isScrolling) {
        isScrolling = true;
        productList.scrollBy({
          left: e.deltaY,
          behavior: 'smooth'
        });
        setTimeout(() => isScrolling = false, 200);
      }
    }
  });
});

async function loadCategoryProducts(category) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    const products = await response.json();
    
    if (response.ok) {
      populateSection(category, products);
      initializeModals();
    } else {
      console.error(`Error loading ${category} products:`, products.error);
    }
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
  }
}