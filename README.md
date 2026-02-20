# 🏧 ATM Demo Web App
A simple **ATM simulation web application** built with **Vanilla JavaScript, Bootstrap, and LocalStorage**.  
It allows users to log in using a card number and PIN, then perform common ATM operations such as withdrawing, depositing, checking balance, and viewing transaction history.

---

## 📌 Overview

This project simulates the workflow of an ATM machine with a multi-screen interface.  
User data is stored locally using **LocalStorage**, and all operations update the stored data in real time.

The app is designed for learning purposes to practice:

- DOM manipulation  
- Form validation  
- State management  
- LocalStorage as a lightweight database  

---

## ✨ Features

- 🔐 User login with card number and PIN validation  
- 💸 Withdraw money with amount validation  
- 💰 Deposit money  
- 📊 Check current balance  
- 🧾 View transaction history (date, type, amount)  
- 🔄 Persistent data using LocalStorage  
- 🖥️ Multi-screen ATM-like UI  

---

## 🧱 Tech Stack

- **HTML5** — structure  
- **CSS3** — custom styling  
- **Bootstrap 5** — layout & UI components  
- **Vanilla JavaScript (ES6)** — logic  
- **LocalStorage** — data persistence  

---

## 📂 Project Structure

```

project/
│
├── index.html        # Main UI and screens
├── index.js          # Frontend logic & UI control
├── backend.js        # LocalStorage database layer
├── DB.json           # Initial mock users data
├── css/
│   └── style.css     # Custom styles
└── node_modules/     # Dependencies (Bootstrap, FontAwesome)

````

---

## 🔄 Application Flow (How the App Works)

The ATM app follows a simple state-based flow where the user moves between screens depending on the selected operation.

### 1️⃣ App Initialization
- When the app loads, the `main()` function runs.
- The database layer checks if users exist in **LocalStorage**.
- If not, it loads initial data from `DB.json`.
- The app then stores all users locally and sets the system ready.

### 2️⃣ Login Process
1. The user enters:
   - Card number (6 digits)
   - PIN (4 digits)
2. Inputs are validated using regular expressions.
3. The app calls the database method `get_user()`.
4. If credentials match:
   - The user object is saved in LocalStorage as `currentUser`.
   - The app navigates to the **Options screen**.
5. If not:
   - An error message appears and inputs reset.

### 3️⃣ Operations Flow

#### 💸 Withdraw
- User enters an amount (50 → 5000, step 50).
- The app validates the value.
- `withdraw()` is called in the database layer.
- Balance is reduced and a transaction record is created.
- User sees the success screen.

#### 💰 Deposit
- User enters an amount (50 → 10000, step 50).
- The database updates the balance.
- A transaction record is added.
- Success screen appears.

#### 📊 Check Balance
- The app calls `get_Balance()`.
- The returned balance is displayed on the balance screen.

#### 🧾 Transaction History
- The app calls `get_history()`.
- All transaction objects are rendered into a table dynamically.

### 4️⃣ Transaction System
Each operation creates a transaction object:

- **type** → withdraw or deposit  
- **amount** → transaction value  
- **date** → timestamp  

These records are stored in the user’s `transactions` array and shown in the history page.

### 5️⃣ Data Persistence
All updates (balance or transactions):

✔️ Update the in-memory database  
✔️ Sync to LocalStorage  

This ensures data remains even after page refresh.

### 6️⃣ Navigation System
The UI behaves like a real ATM using a **screen controller**:

- All screens are hidden by default  
- The `show(screenId)` function activates one screen  
- This creates a smooth multi-step workflow  

---

## ⚙️ How to Run

1. Clone or download the project  

2. Install dependencies (if using npm)

```bash
npm install
````

3. Run using a local server (recommended)

```bash
npx live-server
```

or open `index.html` directly in your browser.

---

## 🧪 Example Transaction Object

```json
{
  "amount": 200,
  "type": "withdraw",
  "date": "2026-02-20T12:30:00"
}
```

---

## 🧠 Architecture Summary

The app is structured into two main layers:

**1️⃣ UI Layer (index.js)**
Handles:

* Screens navigation
* Input validation
* Rendering data

**2️⃣ Data Layer (backend.js)**
Handles:

* User lookup
* Balance updates
* Transaction storage
* LocalStorage synchronization

This separation makes the app easier to maintain and extend.

---

## 🔮 Possible Improvements

* Add transfer between accounts
* Add authentication session timeout
* Add charts for spending analytics
* Replace LocalStorage with a real backend (Node.js + DB)
* Add unit tests

---

## 👨‍💻 Author

**Mostafa Ehab**
Faculty of Electronic Engineering — Computer Science

---

## 📜 License

This project is for educational purposes and can be freely used or modified.

```