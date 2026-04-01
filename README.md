# Texas Grill Admin Panel User Guide

## 📋 Overview

The Texas Grill Admin Panel is a comprehensive dashboard for managing restaurant operations, menu items, orders, reservations, and customer communications. This guide covers all features and functionalities.

**Admin Panel URL:** `https://your-domain.com/admin`

**Default Credentials:**
- Email: `admin@texasgrill.com`
- Password: `Admin@123`

---

## 📑 Table of Contents

1. [Getting Started](#-getting-started)
2. [Dashboard](#-dashboard)
3. [Order Management](#-order-management)
4. [Category Management](#-category-management)
5. [Menu Management](#-menu-management)
6. [Add New Items](#-add-new-items)
7. [Add New Categories](#-add-new-categories)
8. [Edit Items & Categories](#-edit-items--categories)
9. [Mobile Navigation](#-mobile-navigation)
10. [Email Notifications](#-email-notifications)
11. [Troubleshooting](#-troubleshooting)

---

## 🚀 Getting Started

### Login to Admin Panel

1. Navigate to `/admin` in your browser
2. Enter your admin credentials:
   - **Email:** `admin@texasgrill.com`
   - **Password:** `Admin@123`
3. Click **"Access Control Panel"**

![Login Screen](https://via.placeholder.com/400x500?text=Login+Screen)

### First Time Setup

After login, you'll see the dashboard. If no data exists:
1. Use the **Add Category** button to create menu categories
2. Use the **Add New Item** button to populate your menu
3. Orders will appear automatically when customers place orders

---

## 📊 Dashboard

The dashboard provides a real-time overview of your restaurant's performance.

### Stats Cards

The dashboard displays 8 key metrics:

| Card | Description |
|------|-------------|
| **Total Revenue** | Total sales revenue from all orders |
| **Total Orders** | Total number of orders placed |
| **Completed Orders** | Successfully delivered orders |
| **Menu Items** | Total items in your menu |
| **Total Customers** | Registered users |
| **Pending Orders** | Orders awaiting confirmation |
| **Today's Reservations** | Table bookings for today |
| **Active Orders** | Orders in progress (pending/confirmed/preparing) |

### Recent Orders Section

Shows the latest 4 orders with:
- Customer name
- Order number
- Order total
- Current status

### Performance Summary

- **Avg Order Value:** Average amount spent per order
- **Completion Rate:** Percentage of orders successfully delivered

### Quick Actions (Mobile)

On mobile devices, quick action buttons appear:
- **View Orders** - Go to orders management
- **Manage Menu** - Go to menu management

---

## 📦 Order Management

Navigate to **Orders** in the sidebar or bottom menu.

### Orders List View

All orders are displayed with:
- Order ID (last 6 digits)
- Customer name and phone
- Items ordered (truncated view)
- Order total
- Current status (color-coded)

### Order Statuses

| Status | Color | Description |
|--------|-------|-------------|
| **Pending** | Yellow | Order received, waiting for confirmation |
| **Confirmed** | Blue | Order confirmed by restaurant |
| **Preparing** | Orange | Food is being prepared |
| **Ready** | Purple | Order ready for pickup/delivery |
| **Delivered** | Green | Order delivered to customer |
| **Cancelled** | Red | Order cancelled |

### Updating Order Status

1. Locate the order in the list
2. Click the status dropdown menu
3. Select the new status
4. Status updates automatically

### Searching Orders

Use the search bar to find orders by:
- Customer name
- Phone number
- Order ID

### Filtering Orders

Use the filter buttons to show orders by status:
- All
- Pending
- Confirmed
- Preparing
- Ready
- Delivered

---

## 🏷️ Category Management

Navigate to **Categories** in the sidebar or bottom menu.

### Categories List

Each category card displays:
- Category image (or icon)
- Category name
- Slug (URL-friendly name)
- Description
- Active/Inactive status

### Category Actions

| Action | Icon | Description |
|--------|------|-------------|
| **Edit** | ✏️ Blue | Modify category details |
| **Delete** | 🗑️ Red | Remove category (orphans items) |
| **View Items** | → | View all items in this category |

### Active vs Inactive

- **Active:** Category visible to customers
- **Inactive:** Hidden from customer view

### Creating New Category

1. Click **"New Category"** button
2. Fill in:
   - Category name
   - Description
   - Upload category image (optional)
3. Click **"Create Category"**

---

## 🍽️ Menu Management

Navigate to **Menu** in the sidebar or bottom menu.

### Menu Items Grid

Items display as cards with:
- Item image
- Item name
- Description
- Price
- Availability status (green = available, red = unavailable)
- Category label

### Filtering Items

Two ways to filter:

1. **Search Bar:** Type item name
2. **Category Filters:** Scroll horizontally to select a category

### Availability Toggle

Click the status icon on any item card to:
- Toggle between available/unavailable
- Immediate effect on customer menu

### Item Actions

| Action | Icon | Description |
|--------|------|-------------|
| **Edit** | ✏️ | Modify item details |
| **Delete** | 🗑️ | Remove item from menu |

---

## ➕ Add New Items

Navigate to **Add Item** in the sidebar or bottom menu.

### Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **Item Name** | Text | Yes | Name displayed on menu |
| **Price (PKR)** | Number | Yes | Price in Pakistani Rupees |
| **Category** | Select | Yes | Category from existing list |
| **Description** | Textarea | Yes | Detailed item description |
| **Image** | File | No | Item photo (1:1 ratio recommended) |

### Image Tips

- Use high-quality images (1:1 ratio)
- File formats: PNG, JPG, WebP
- Max size: 5MB
- Clear, appetizing photos increase sales

### Submission

Click **"Add Menu Item"** to save. The item appears immediately in the menu.

---

## 🆕 Add New Categories

Navigate to **Add Category** in the sidebar or bottom menu.

### Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **Category Name** | Text | Yes | Name displayed on menu |
| **Description** | Textarea | No | Category description |
| **Image** | File | No | Category icon/thumbnail |

### Category Tips

- Keep names short and descriptive
- Slugs auto-generate from names
- Order determines display sequence
- All categories start as active

---

## ✏️ Edit Items & Categories

### Editing Menu Items

1. Navigate to **Menu** page
2. Find the item to edit
3. Click the **Edit (✏️)** button
4. Update fields as needed
5. Click **"Save Changes"**

### Editing Categories

1. Navigate to **Categories** page
2. Find the category to edit
3. Click the **Edit (✏️)** button
4. Update fields as needed
5. Click **"Save Changes"**

### Image Updates

When editing:
- New image replaces old image
- Leave image field empty to keep current image
- Upload new image to replace

---

## 📱 Mobile Navigation

The admin panel is fully responsive with three layout modes:

### Mobile View (<640px)

- **Bottom Navigation Bar:** Quick access to main sections
  - Dashboard
  - Orders
  - Categories
  - Menu
  - More (opens full menu)

- **More Menu:** Tap to open additional options:
  - Add Item
  - Add Category
  - Exit (Logout)

### Tablet View (640px - 1024px)

- **Collapsible Sidebar:** Tap the menu icon to show/hide
- **Icon-only sidebar** when collapsed
- **Full labels** when expanded

### Desktop View (>1024px)

- **Full sidebar** with labels
- **All navigation items** always visible
- **Wider content area**

### Mobile-Specific Features

- **Scrollable Category Filters:** Swipe horizontally to see all categories
- **Touch-friendly buttons:** Minimum 44px tap targets
- **Bottom padding:** Content scrolls above bottom nav
- **Responsive grids:** Cards stack in 2 columns on mobile

---

## 📧 Email Notifications

The system automatically sends email notifications via FormSubmit.

### Configure Email

Add to your `.env` file:
```
FORMSUBMIT_EMAIL=your-email@example.com
```

### Email Triggers

| Event | Recipient | Content |
|-------|-----------|---------|
| **New Order** | Admin email | Order details, customer info, total |
| **New Contact Message** | Admin email | Contact form submission |
| **New Reservation** | Admin email | Reservation details, date, time |

### Email Format Example

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
━━━━━━━━━━━━━━━━━━━━
🍽️ ORDER ITEMS:
1. 2x Chicken Karahi - Rs. 2800
━━━━━━━━━━━━━━━━━━━━
💰 GRAND TOTAL: Rs. 2950
```

---

## 🔧 Troubleshooting

### Common Issues

#### No Data Showing on Mobile
- **Cause:** CSS overflow issues
- **Fix:** Refresh page, ensure `overflow-visible` is applied

#### Categories Not Scrolling
- **Cause:** Missing scroll styles
- **Fix:** Use horizontal swipe on category bar

#### Orders Not Loading
- **Cause:** Network issue or authentication
- **Fix:** Check token in localStorage, refresh page

#### Images Not Uploading
- **Cause:** File too large or wrong format
- **Fix:** Use PNG/JPG under 5MB

#### Email Not Sending
- **Cause:** Missing FormSubmit config
- **Fix:** Add `FORMSUBMIT_EMAIL` to .env

### Error Messages

| Error | Solution |
|-------|----------|
| **401 Unauthorized** | Re-login to get new token |
| **403 Forbidden** | Ensure admin role |
| **500 Server Error** | Check backend logs |
| **Network Error** | Check internet connection |

### Clear Cache

If experiencing display issues:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Clear localStorage: `localStorage.clear()`

### Session Expired

If token expires:
1. Automatically redirects to login
2. Re-enter credentials
3. Session restored

---

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Focus search bar |
| `Esc` | Close modals |
| `Enter` | Submit forms |

---

## 📊 Best Practices

### Menu Management

- Update availability daily based on stock
- Add new items regularly to keep menu fresh
- Use high-quality images for all items
- Keep descriptions concise but descriptive

### Order Management

- Update order status promptly
- Confirm orders within 5 minutes
- Mark as preparing when kitchen starts
- Update to ready when food is done

### Category Organization

- Limit to 10-12 categories
- Order categories logically (starters → mains → desserts)
- Use active/inactive for seasonal categories

### Data Backup

- Regular exports recommended
- Check dashboard stats weekly
- Monitor revenue trends

---

## 🔒 Security

- Always log out on shared devices
- Keep admin credentials secure
- Use strong passwords
- Monitor login attempts
- Regular password updates

---

## 📞 Support

### Contact Information

- **Technical Support:** `support@texasgrill.pk`
- **Admin Issues:** `admin@texasgrill.pk`
- **Phone:** +92 300 0000000

### Report Issues

When reporting issues, include:
- Screen size/resolution
- Browser version
- Steps to reproduce
- Error messages (if any)
- Screenshots

---