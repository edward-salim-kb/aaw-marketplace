import http from "k6/http";
import { check, sleep } from "k6";

function generateStages(
  totalDurationSec,
  intervalSec,
  baseline,
  amplitude,
  periodSec
) {
  let stages = [];
  const numIntervals = Math.floor(totalDurationSec / intervalSec);
  for (let i = 0; i < numIntervals; i++) {
    let t = i * intervalSec;
    let target = Math.round(
      baseline + amplitude * Math.sin(((2 * Math.PI) / periodSec) * t)
    );
    if (target < 0) target = 0;
    stages.push({ duration: `${intervalSec}s`, target: target });
  }
  return stages;
}

const stages = generateStages(900, 30, 100, 50, 300);

export let options = {
  stages: stages,
  thresholds: {
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<800"],
  },
};

const apiEndpoints = [
  {
    name: "login",
    method: "POST",
    url: "http://localhost:8000/v2/auth/login",
    payload: JSON.stringify({ username: "user1", password: "password123" }),
    weight: 10,
  },
  {
    name: "register",
    method: "POST",
    url: "http://localhost:8000/v2/users/register",
    payload: JSON.stringify({
      username: "user2",
      email: "user2@example.com",
      password: "Password123",
      full_name: "User Two",
      address: "Jalan Raya 2",
      phone_number: "0812345678",
    }),
    weight: 5,
  },
  {
    name: "verifyToken",
    method: "POST",
    url: "http://localhost:8000/v2/auth/verify",
    payload: JSON.stringify({ token: "dummy-token" }),
    weight: 5,
  },
  {
    name: "verifyAdminToken",
    method: "POST",
    url: "http://localhost:8000/v2/auth/verify-admin",
    payload: JSON.stringify({ token: "dummy-admin-token" }),
    weight: 5,
  },
  {
    name: "getAllOrders",
    method: "GET",
    url: "http://localhost:8001/order",
    payload: null,
    weight: 15,
  },
  {
    name: "getOrderDetail",
    method: "GET",
    url: "http://localhost:8001/order/{orderId}",
    payload: null,
    weight: 10,
  },
  {
    name: "placeOrder",
    method: "POST",
    url: "http://localhost:8001/order",
    payload: JSON.stringify({
      shipping_provider: "JNE",
    }),
    weight: 15,
  },
  {
    name: "payOrder",
    method: "POST",
    url: "http://localhost:8001/order/{orderId}/pay",
    payload: JSON.stringify({
      payment_method: "credit_card",
      payment_reference: "ref123",
      amount: 100000,
    }),
    weight: 5,
  },
  {
    name: "cancelOrder",
    method: "POST",
    url: "http://localhost:8001/order/{orderId}/cancel",
    payload: null,
    weight: 5,
  },
  {
    name: "getAllCartItems",
    method: "GET",
    url: "http://localhost:8001/cart",
    payload: null,
    weight: 10,
  },
  {
    name: "addItemToCart",
    method: "POST",
    url: "http://localhost:8001/cart",
    payload: JSON.stringify({
      product_id: "prod1",
      quantity: 2,
    }),
    weight: 10,
  },
  {
    name: "editCartItem",
    method: "PUT",
    url: "http://localhost:8001/cart",
    payload: JSON.stringify({
      cart_id: "cart1",
      quantity: 3,
    }),
    weight: 5,
  },
  {
    name: "deleteCartItem",
    method: "DELETE",
    url: "http://localhost:8001/cart",
    payload: JSON.stringify({
      product_id: "prod1",
    }),
    weight: 5,
  },
  {
    name: "getAllProducts",
    method: "GET",
    url: "http://localhost:8002/v2/product",
    payload: null,
    weight: 10,
  },
  {
    name: "getAllCategory",
    method: "GET",
    url: "http://localhost:8002/v2/product/category",
    payload: null,
    weight: 10,
  },
  {
    name: "getProductById",
    method: "GET",
    url: "http://localhost:8002/v2/product/{id}",
    payload: null,
    weight: 5,
  },
  {
    name: "getManyProductDatasById",
    method: "POST",
    url: "http://localhost:8002/v2/product/many",
    payload: JSON.stringify({ ids: ["prod1", "prod2"] }),
    weight: 5,
  },
  {
    name: "getProductByCategory",
    method: "GET",
    url: "http://localhost:8002/v2/product/category/{category_id}",
    payload: null,
    weight: 5,
  },
  {
    name: "createProduct",
    method: "POST",
    url: "http://localhost:8002/v2/product",
    payload: JSON.stringify({
      name: "New Product",
      description: "Deskripsi produk",
      price: 50000,
      quantity_available: 100,
      category_id: "cat1",
    }),
    weight: 5,
  },
  {
    name: "createCategory",
    method: "POST",
    url: "http://localhost:8002/v2/product/category",
    payload: JSON.stringify({ name: "New Category" }),
    weight: 5,
  },
  {
    name: "editProduct",
    method: "PUT",
    url: "http://localhost:8002/v2/product/{id}",
    payload: JSON.stringify({
      name: "Updated Product",
      description: "Deskripsi baru",
      price: 55000,
      quantity_available: 90,
      category_id: "cat1",
    }),
    weight: 5,
  },
  {
    name: "editCategory",
    method: "PUT",
    url: "http://localhost:8002/v2/product/category/{category_id}",
    payload: JSON.stringify({ name: "Updated Category" }),
    weight: 5,
  },
  {
    name: "deleteProduct",
    method: "DELETE",
    url: "http://localhost:8002/v2/product/{id}",
    payload: null,
    weight: 5,
  },
  {
    name: "deleteCategory",
    method: "DELETE",
    url: "http://localhost:8002/v2/product/category/{category_id}",
    payload: null,
    weight: 5,
  },
  {
    name: "getTenant",
    method: "GET",
    url: "http://localhost:8003/tenant/{tenant_id}",
    payload: null,
    weight: 5,
  },
  {
    name: "createTenant",
    method: "POST",
    url: "http://localhost:8003/tenant",
    payload: JSON.stringify({ owner_id: "user1", name: "New Tenant" }),
    weight: 5,
  },
  {
    name: "editTenant",
    method: "PUT",
    url: "http://localhost:8003/tenant/{old_tenant_id}",
    payload: JSON.stringify({
      tenant_id: "tenant2",
      owner_id: "user1",
      name: "Updated Tenant",
    }),
    weight: 5,
  },
  {
    name: "deleteTenant",
    method: "DELETE",
    url: "http://localhost:8003/tenant",
    payload: JSON.stringify({ tenant_id: "tenant1" }),
    weight: 5,
  },
  {
    name: "getAllUserWishlist",
    method: "GET",
    url: "http://localhost:8004/api/wishlist",
    payload: null,
    weight: 10,
  },
  {
    name: "getWishlistById",
    method: "GET",
    url: "http://localhost:8004/api/wishlist/{id}",
    payload: null,
    weight: 5,
  },
  {
    name: "createWishlist",
    method: "POST",
    url: "http://localhost:8004/api/wishlist",
    payload: JSON.stringify({ name: "My Wishlist" }),
    weight: 5,
  },
  {
    name: "updateWishlist",
    method: "PUT",
    url: "http://localhost:8004/api/wishlist/{id}",
    payload: JSON.stringify({ name: "Updated Wishlist" }),
    weight: 5,
  },
  {
    name: "deleteWishlist",
    method: "DELETE",
    url: "http://localhost:8004/api/wishlist/{id}",
    payload: null,
    weight: 5,
  },
  {
    name: "addProductToWishlist",
    method: "POST",
    url: "http://localhost:8004/api/wishlist/add",
    payload: JSON.stringify({
      wishlist_id: "wishlist1",
      product_id: "prod1",
    }),
    weight: 5,
  },
  {
    name: "removeProductFromWishlist",
    method: "DELETE",
    url: "http://localhost:8004/api/wishlist/remove",
    payload: JSON.stringify({ id: "wishlistDetail1" }),
    weight: 5,
  },
];

function substitutePlaceholders(url) {
  return url
    .replace(/{orderId}/g, "order123")
    .replace(/{id}/g, "id123")
    .replace(/{category_id}/g, "cat123")
    .replace(/{tenant_id}/g, "tenant123")
    .replace(/{old_tenant_id}/g, "tenantOld");
}

function selectWeightedEndpoint() {
  let totalWeight = apiEndpoints.reduce(
    (acc, endpoint) => acc + (endpoint.weight || 1),
    0
  );
  let randomWeight = Math.random() * totalWeight;
  for (let endpoint of apiEndpoints) {
    randomWeight -= endpoint.weight || 1;
    if (randomWeight < 0) {
      return endpoint;
    }
  }
  return apiEndpoints[0];
}

function poissonSleep(lambda) {
  const u = Math.random();
  return -Math.log(1 - u) / lambda;
}

export default function () {
  const api = selectWeightedEndpoint();
  const url = substitutePlaceholders(api.url);
  const params = { headers: { "Content-Type": "application/json" } };
  let res;

  switch (api.method) {
    case "GET":
      res = http.get(url, params);
      break;
    case "POST":
      res = http.post(url, api.payload, params);
      break;
    case "PUT":
      res = http.put(url, api.payload, params);
      break;
    case "DELETE":
      res = http.del(url, api.payload, params);
      break;
    default:
      res = http.get(url, params);
  }

  console.log(`Request to ${api.name}`);

  check(res, {
    "status 200": (r) => r.status === 200,
    "response < 800ms": (r) => r.timings.duration < 800,
  });

  sleep(poissonSleep(0.5));
}
