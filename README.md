# 🐾 PetMitra

**PetMitra** is a full-stack web platform that connects pet owners with veterinarians and NGOs, making pet healthcare and support easily accessible and organized.

---

## 🚀 Features

- 👨‍⚕️ Doctor registration and profile management  
- 🐶 Pet owners can book appointments with doctors  
- 🏥 NGO support and visibility  
- 🗓️ Real-time appointment booking system  
- 🔒 Secure user authentication (JWT-based)  
- 📸 Image uploads using Cloudinary  
- ✉️ Contact and feedback system  

---

## 🛠️ Tech Stack

### 🧠 Frontend

- **React.js** (Vite)
- **Tailwind CSS** – Utility-first styling
- **React Router** – Routing and navigation
- **Axios** – API requests

### 🔧 Backend

- **Node.js**
- **Express.js**
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **JWT** – Authentication
- **Cloudinary** – Image uploads
- **Multer** – File upload middleware

### 📁 Admin Panel 

- Separate frontend (React + Tailwind) for admin dashboard

---

## 📂 Folder Structure
```
petmitra2/
├── frontend/       # React frontend for users
├── backend/        # Node.js + Express backend
├── admin/          # Admin panel frontend (optional)
└── README.md       # Project documentation
```
---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- Cloudinary account

---

### 📥 1. Clone the Repo

```bash
git clone https://github.com/KartikTotlani/petmitra2.git
cd petmitra2
```
---

### 📦 2. Install Dependencies
```
cd frontend
npm install

cd ../backend
npm install

cd ../admin
npm install
```

---

### 🔐 3. Configure Environment Variables

Create `.env` files in each folder (`frontend/`, `backend/`, `admin/`) and add the following:

**backend/.env**
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
**frontend/.env**
```
VITE_BACKEND_URL=http://localhost:4000
```
**admin/.env**
```
VITE_BACKEND_URL=http://localhost:4000
```

### 🧪 4. Run the Project
**Start the backend**
```
cd backend
npm run dev
```
**Start the frontend**
```
cd frontend
npm run dev
```
### 📸 Screenshots
Coming soon...

### 🤝 Contributors
@KartikTotlani
@SumitSuryavanshi
@NupurThakre

### 📄 License
This project is licensed under the MIT License.

### 🌟 Show Your Support
If you found this helpful, give it a ⭐ on GitHub and share it with others!


