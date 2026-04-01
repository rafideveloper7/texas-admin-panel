
# Texas Grill Restaurant API Documentation

## 📋 Overview

Texas Grill API is a RESTful backend service for the Texas Grill restaurant management system. It handles menu management, orders, reservations, user authentication, email notifications via FormSubmit, and more.

**Base URL:** `https://texas-api.vercel.app/api`

**Environment:** Production

**Version:** 1.1.0

---

## 📑 Table of Contents

1. [Authentication](#-authentication)
2. [Auth Routes](#-auth-routes)
3. [Categories](#-categories)
4. [Menu Items](#-menu-items)
5. [Orders](#-orders)
6. [Reservations](#-reservations)
7. [Contact Messages](#-contact-messages)
8. [Dashboard Stats](#-dashboard-stats)
9. [Health Check](#-health-check)
10. [Email Notifications](#-email-notifications)
11. [Error Codes](#-error-codes)
12. [Example Usage](#-example-usage)

---

## 🔐 Authentication

Most endpoints require a JWT token. Include it in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Login to Get Token

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f2a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

## 👤 Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | ❌ No |
| POST | `/auth/login` | Login user | ❌ No |
| POST | `/auth/admin/login` | Admin login | ❌ No |
| GET | `/auth/me` | Get current user profile | ✅ Yes |
| PUT | `/auth/update` | Update user profile | ✅ Yes |
| POST | `/auth/change-password` | Change password | ✅ Yes |

### Register User

**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "03001234567",
  "address": {
    "street": "Main Street",
    "city": "Kohat",
    "area": "City Center"
  }
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f2a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Admin Login

**POST** `/auth/admin/login`

**Request Body:**
```json
{
  "email": "admin@texasgrill.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f2a1b2c3d4e5f6a7b8c9d0",
    "name": "Master Admin",
    "email": "admin@texasgrill.com",
    "role": "admin"
  }
}
```

### Get Current User

**GET** `/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "65f2a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "03001234567",
    "role": "user",
    "address": {
      "street": "Main Street",
      "city": "Kohat",
      "area": "City Center"
    }
  }
}
```

### Update Profile

**PUT** `/auth/update`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "03009876543",
  "address": {
    "street": "New Street",
    "city": "Kohat",
    "area": "New Area"
  }
}
```

### Change Password

**POST** `/auth/change-password`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

## 🍽️ Categories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all active categories | ❌ No |
| GET | `/categories?includeInactive=true` | Get all categories (including inactive) | ❌ No |
| GET | `/categories/:slug` | Get category by slug | ❌ No |
| POST | `/categories` | Create new category | ✅ Admin |
| PUT | `/categories/:id` | Update category | ✅ Admin |
| DELETE | `/categories/:id` | Delete category | ✅ Admin |

### Get All Categories

**GET** `/categories`

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "65f2a1b2c3d4e5f6a7b8c9d0",
      "name": "BBQ & Kababs",
      "slug": "bbq-kababs",
      "description": "Charcoal grilled perfection - tender, smoky, and authentic",
      "image": {
        "url": "https://res.cloudinary.com/...",
        "publicId": "categories/bbq-kababs"
      },
      "isActive": true,
      "order": 2,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Category by Slug

**GET** `/categories/special-dishes`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65f2a1b2c3d4e5f6a7b8c9d1",
    "name": "Special Dishes",
    "slug": "special-dishes",
    "description": "Our chef's signature creations",
    "image": { ... },
    "isActive": true,
    "order": 1
  }
}
```

### Create Category (Admin)

**POST** `/categories`

**Headers:** `Authorization: Bearer <admin_token>`

**Body:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Category name |
| slug | string | Yes | URL-friendly slug |
| description | string | No | Category description |
| image | file | No | Category image (jpg/png) |
| order | number | No | Display order (default 0) |
| isActive | boolean | No | Active status (default true) |

---

## 🍕 Menu Items

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/menu` | Get all available menu items | ❌ No |
| GET | `/menu?includeUnavailable=true` | Get all items (including unavailable) | ❌ No |
| GET | `/menu/popular` | Get popular items | ❌ No |
| GET | `/menu/:id` | Get item by ID | ❌ No |
| GET | `/menu/category/:categoryId` | Get items by category | ❌ No |
| POST | `/menu` | Create new menu item | ✅ Admin |
| PUT | `/menu/:id` | Update menu item | ✅ Admin |
| DELETE | `/menu/:id` | Delete menu item | ✅ Admin |
| PUT | `/menu/:id/availability` | Toggle availability | ✅ Admin |

### Get All Menu Items

**GET** `/menu`

**Response:**
```json
{
  "success": true,
  "count": 48,
  "data": [
    {
      "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
      "name": "Chicken Karahi",
      "category": {
        "_id": "65f2a1b2c3d4e5f6a7b8c9d0",
        "name": "Karahi & Handi",
        "slug": "karahi-handi"
      },
      "price": 1400,
      "description": "Traditional karahi with tomatoes, ginger, and green chilies.",
      "image": {
        "url": "https://res.cloudinary.com/...",
        "publicId": "menu-items/chicken-karahi"
      },
      "isPopular": true,
      "isAvailable": true,
      "customization": {
        "sizes": [
          { "name": "Regular", "price": 0, "multiplier": 1 },
          { "name": "Large", "price": 300, "multiplier": 1.3 },
          { "name": "Family", "price": 600, "multiplier": 1.6 }
        ],
        "spiceLevels": ["Mild", "Medium", "Hot", "Extra Hot"],
        "addOns": [
          { "name": "Extra Cheese", "price": 100 },
          { "name": "Extra Meat", "price": 200 }
        ]
      },
      "nutritionalInfo": {
        "calories": 850,
        "protein": 45,
        "carbs": 35,
        "fat": 28
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Popular Items

**GET** `/menu/popular`

**Response:** Returns up to 8 popular items

### Get Item by ID

**GET** `/menu/65f2a1b2c3d4e5f6a7b8c9d2`

### Create Menu Item (Admin)

**POST** `/menu`

**Headers:** `Authorization: Bearer <admin_token>`

**Body:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Item name |
| category | string | Yes | Category ID |
| price | number | Yes | Price in PKR |
| description | string | Yes | Item description |
| image | file | No | Item image |
| isPopular | boolean | No | Mark as popular (default false) |
| isAvailable | boolean | No | Available status (default true) |
| customization | json | No | Customization options JSON |
| nutritionalInfo | json | No | Nutritional info JSON |

### Update Menu Item (Admin)

**PUT** `/menu/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Body:** `multipart/form-data` (same as create)

### Toggle Availability

**PUT** `/menu/:id/availability`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
    "isAvailable": false
  }
}
```

---

## 📦 Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create new order (with email) | Optional |
| GET | `/orders` | Get user's orders | ✅ Yes |
| GET | `/orders/admin/all` | Get all orders | ✅ Admin |
| GET | `/orders/:id` | Get order by ID | ✅ Yes (owner or admin) |
| PUT | `/orders/:id/status` | Update order status | ✅ Admin |
| PUT | `/orders/:id/payment` | Update payment status | ✅ Admin |
| DELETE | `/orders/:id` | Cancel order | ✅ Yes (owner) |

### Create Order

**POST** `/orders`

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "phone": "03001234567",
    "email": "john@example.com",
    "address": "Main Street, Kohat"
  },
  "items": [
    {
      "menuItem": "65f2a1b2c3d4e5f6a7b8c9d2",
      "name": "Chicken Karahi",
      "price": 1400,
      "quantity": 2,
      "customization": {
        "size": "Large",
        "spiceLevel": "Medium",
        "addOns": ["Extra Cheese"]
      }
    }
  ],
  "orderType": "delivery",
  "deliveryFee": 150,
  "subtotal": 2800,
  "discount": 0,
  "total": 2950,
  "paymentMethod": "cod",
  "specialInstructions": "Please make it less spicy"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65f2a1b2c3d4e5f6a7b8c9d3",
    "orderNumber": "TG-7XK2P9",
    "customer": { ... },
    "items": [ ... ],
    "orderType": "delivery",
    "status": "pending",
    "paymentStatus": "pending",
    "subtotal": 2800,
    "deliveryFee": 150,
    "total": 2950,
    "createdAt": "2024-01-15T14:30:00.000Z"
  },
  "emailSent": true,
  "emailStatus": "delivered"
}
```

### Get All Orders (Admin)

**GET** `/orders/admin/all`

**Headers:** `Authorization: Bearer <admin_token>`

### Get Order by ID

**GET** `/orders/:id`

**Headers:** `Authorization: Bearer <token>`

### Update Order Status (Admin)

**PUT** `/orders/:id/status`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Status Options:**
- `pending` - Order received, waiting for confirmation
- `confirmed` - Order confirmed by restaurant
- `preparing` - Food is being prepared
- `ready` - Order is ready for pickup/delivery
- `delivered` - Order delivered to customer
- `cancelled` - Order cancelled

### Update Payment Status (Admin)

**PUT** `/orders/:id/payment`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "paymentStatus": "paid"
}
```

**Payment Status Options:**
- `pending` - Payment not yet processed
- `paid` - Payment completed
- `failed` - Payment failed

### Cancel Order (User)

**DELETE** `/orders/:id`

**Headers:** `Authorization: Bearer <token>`

---

## 📅 Reservations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/reservations` | Create reservation (with email) | ❌ No |
| GET | `/reservations` | Get user's reservations | ✅ Yes |
| GET | `/reservations/availability` | Check table availability | ❌ No |
| GET | `/reservations/admin/all` | Get all reservations | ✅ Admin |
| PUT | `/reservations/:id` | Update reservation | ✅ Yes (owner or admin) |
| DELETE | `/reservations/:id` | Cancel reservation | ✅ Yes (owner or admin) |

### Create Reservation

**POST** `/reservations`

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "phone": "03001234567",
    "email": "john@example.com",
    "guests": 4
  },
  "date": "2024-01-20T00:00:00.000Z",
  "time": "19:30",
  "duration": 120,
  "tableType": "family",
  "specialRequests": "Window seat preferred",
  "occasion": "birthday"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65f2a1b2c3d4e5f6a7b8c9d4",
    "customer": { ... },
    "date": "2024-01-20T00:00:00.000Z",
    "time": "19:30",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "emailSent": true
}
```

### Check Availability

**GET** `/reservations/availability?date=2024-01-20&time=19:30`

**Response:**
```json
{
  "success": true,
  "available": true
}
```

**Reservation Status Options:**
- `pending` - Waiting for confirmation
- `confirmed` - Reservation confirmed
- `cancelled` - Reservation cancelled
- `completed` - Reservation completed

**Table Type Options:**
- `regular` - Standard table (2-4 persons)
- `family` - Family table (4-6 persons)
- `private` - Private room (6-10 persons)

**Occasion Options:**
- `regular` - Regular dining
- `birthday` - Birthday celebration
- `anniversary` - Anniversary celebration
- `corporate` - Corporate event

---

## 📧 Contact Messages

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/contact` | Submit contact message (with email) | ❌ No |
| GET | `/contact` | Get all contact messages | ✅ Admin |
| PUT | `/contact/:id/status` | Update message status | ✅ Admin |
| DELETE | `/contact/:id` | Delete contact message | ✅ Admin |

### Submit Contact Message

**POST** `/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "03001234567",
  "subject": "Catering Inquiry",
  "message": "Do you offer catering services for corporate events?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "emailSent": true
}
```

### Get All Messages (Admin)

**GET** `/contact`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "_id": "65f2a1b2c3d4e5f6a7b8c9d5",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "03001234567",
      "subject": "Catering Inquiry",
      "message": "Do you offer catering services for corporate events?",
      "status": "unread",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Update Message Status (Admin)

**PUT** `/contact/:id/status`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "status": "read"
}
```

**Status Options:**
- `unread` - New message (default)
- `read` - Message has been read
- `replied` - Message has been replied to

---

## 📊 Dashboard Stats

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard/stats` | Get admin dashboard statistics | ✅ Admin |

**GET** `/dashboard/stats`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 1250,
    "totalRevenue": 875000,
    "totalUsers": 342,
    "totalMenuItems": 48,
    "pendingOrders": 12,
    "todayReservations": 8,
    "unreadContacts": 5,
    "orderStatusCounts": [
      { "_id": "pending", "count": 12 },
      { "_id": "confirmed", "count": 5 },
      { "_id": "preparing", "count": 3 },
      { "_id": "ready", "count": 2 },
      { "_id": "delivered", "count": 1228 }
    ]
  }
}
```

---

## 🩺 Health Check

**GET** `/health`

**Response:**
```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-01-15T14:30:00.000Z"
}
```

---

## 📧 Email Notifications

The API integrates with **FormSubmit** to send email notifications automatically.

### Email Configuration

Add to your `.env` file:

```env
FORMSUBMIT_EMAIL=admin@texasgrill.pk
```

### Email Triggers

| Event | Email Sent To | Email Content |
|-------|---------------|---------------|
| New Order | `FORMSUBMIT_EMAIL` | Order details with items, customer info, total |
| New Contact Message | `FORMSUBMIT_EMAIL` | Contact form submission |
| New Reservation | `FORMSUBMIT_EMAIL` | Reservation details with date, time, guests |

### Email Format Example (Order)

```
🍖 TEXAS GRILL - NEW ORDER 🍖
━━━━━━━━━━━━━━━━━━━━
🆔 Order ID: TG-7XK2P9
📋 Order Type: DELIVERY
💳 Payment: COD
━━━━━━━━━━━━━━━━━━━━
👤 Customer: John Doe
📱 Phone: 03001234567
📍 Address: Main Street, Kohat
📝 Note: Please make it less spicy
━━━━━━━━━━━━━━━━━━━━
🍽️ ORDER ITEMS:
1. 2x Chicken Karahi (Large) - Rs. 2800
━━━━━━━━━━━━━━━━━━━━
💰 Subtotal: Rs. 2800
🚚 Delivery: Rs. 150
━━━━━━━━━━━━━━━━━━━━
💎 GRAND TOTAL: Rs. 2950
```

---

## 🔢 Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input or missing fields |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server-side issue |

### Error Response Format

```json
{
  "success": false,
  "message": "Error description here",
  "stack": "(only in development mode)"
}
```

### Common Error Messages

| Error | Message |
|-------|---------|
| Invalid token | "Not authorized to access this route" |
| User not found | "User not found" |
| Duplicate email | "User already exists" |
| Invalid credentials | "Invalid credentials" |
| Missing fields | "Please provide all required fields" |
| Admin access | "Admin access required" |

---

## 📝 Example Usage

### Complete Order Flow

```javascript
// 1. Login to get token
const loginRes = await fetch('https://texas-api.vercel.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});
const { token, user } = await loginRes.json();

// 2. Get menu items
const menuRes = await fetch('https://texas-api.vercel.app/api/menu');
const { data: menuItems } = await menuRes.json();

// 3. Create an order
const orderRes = await fetch('https://texas-api.vercel.app/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    customer: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address
    },
    items: [
      {
        menuItem: menuItems[0]._id,
        name: menuItems[0].name,
        price: menuItems[0].price,
        quantity: 2
      }
    ],
    orderType: 'delivery',
    deliveryFee: 150,
    subtotal: menuItems[0].price * 2,
    total: (menuItems[0].price * 2) + 150,
    paymentMethod: 'cod'
  })
});
const order = await orderRes.json();
console.log('Order created:', order.data.orderNumber);
```

### Admin Dashboard Fetch

```javascript
// Admin login
const loginRes = await fetch('https://texas-api.vercel.app/api/auth/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@texasgrill.com',
    password: 'Admin@123'
  })
});
const { token } = await loginRes.json();

// Get dashboard stats
const statsRes = await fetch('https://texas-api.vercel.app/api/dashboard/stats', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const { data: stats } = await statsRes.json();
console.log(`Total Orders: ${stats.totalOrders}`);
console.log(`Total Revenue: Rs. ${stats.totalRevenue}`);
```

### Create Category with Image

```javascript
const formData = new FormData();
formData.append('name', 'New Category');
formData.append('slug', 'new-category');
formData.append('description', 'Category description');
formData.append('order', '5');
formData.append('isActive', 'true');

// Add image file
const imageFile = document.getElementById('image').files[0];
formData.append('image', imageFile);

const res = await fetch('https://texas-api.vercel.app/api/categories', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${adminToken}` },
  body: formData
});
```

---

## 🧪 Test Credentials

### Admin Account
| Field | Value |
|-------|-------|
| Email | `admin@texasgrill.com` |
| Password | `Admin@123` |

### User Account
Register via `/auth/register` endpoint

---

## 🌐 Environment Variables

```env
# Server Configuration
PORT=5001
NODE_ENV=production

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/texas_grill

# JWT Secret
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# FormSubmit Email (for notifications)
FORMSUBMIT_EMAIL=admin@texasgrill.pk

# Restaurant Info
RESTAURANT_NAME=Texas Grill Kohat
RESTAURANT_PHONE=+923000000000
RESTAURANT_EMAIL=info@texasgrill.pk

# Admin Default Credentials
ADMIN_EMAIL=admin@texasgrill.com
ADMIN_PASSWORD=********
```

---

## 📞 Support

For API support or questions:

- **Email:** info@texasgrill.pk
- **Phone:** +92 300 0000000
- **Address:** Village Togh Bala, Kohat, Pakistan

---

**Last Updated:** 01/4/2026  
**Version:** 1.1.0  
**API Status:** ✅ Production Ready
```