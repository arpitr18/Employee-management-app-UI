# 👨‍💼 Employee Management App

A full-featured **Employee Management mobile application** built using **React Native + Expo Router**. This app provides a seamless experience with **authentication**, a **custom splash screen**, and a modern layout using **Drawer + Bottom Tab Navigation**.

---

## 🌟 Features Overview

✅ Custom **Splash Screen** with async login check  
✅ Persistent **Login Authentication** using AsyncStorage  
✅ **Drawer Navigation** for global menu access  
✅ **Bottom Tab Navigation** inside drawer for sectioned access  
✅ Live **current date and time UI**  
✅ Clean and interactive **Home Page** for employees  
✅ Fully responsive mobile design  
✅ Well-structured navigation flow with Expo Router  

---

## 📲 App Flow: From Splash to Dashboard

### 1. 🌀 Splash Screen

- The app opens with a custom splash screen (`SplashScreen.jsx`)
- Displays a welcome message and loader for **2 seconds**
- During this time, it checks if a user is already logged in using `AsyncStorage`

```jsx
// Simulate splash delay and fetch login state
await new Promise(resolve => setTimeout(resolve, 2000));
````

---

### 2. 🔐 Login Page (`index.js`)

* If the user is **not logged in**, the app navigates to the **login screen**
* Upon successful login, `AsyncStorage.setItem("isLoggedIn", "true")` is called to persist login state
* On re-launch, this login state is read to skip login

---

### 3. 🏠 Home Page

* Once logged in, the user is taken to the **Home screen**
* Displays current day, date, year
* Includes a **“Punch Out”** button for employee attendance logic
* Minimal and intuitive UI

---

### 4. 🧭 Drawer Navigation (`(drawer)/_layout.jsx`)

* Custom drawer layout shows the global navigation
* Contains:

  * Home
  * Profile
  * Logout (optional)

---

### 5. 📑 Tab Navigation (`(tabs)/home.jsx`, `profile.jsx`)

* Nested inside Drawer using `expo-router`
* Allows switching between:

  * Dashboard / Home
  * Profile Page

---

## 🧾 Folder Structure

```
app/
├── _layout.jsx              # Root layout with splash + routing logic
├── SplashScreen.jsx         # Custom splash screen UI
├── index.js                 # Login / Welcome screen
├── (drawer)/                # Drawer navigation layout
│   ├── _layout.jsx
│   └── index.js             # Home screen after login
    └── (tabs)/              # Tab screens inside drawer
      ├── home.jsx
      └── profile.jsx
```

---

## 📦 Dependencies Used

| Package                                             | Purpose                                  |
| --------------------------------------------------- | ---------------------------------------- |
| `expo-router`                                       | File-based routing and nested navigators |
| `@react-navigation/drawer`                          | Drawer-based navigation                  |
| `@react-navigation/bottom-tabs`                     | Bottom tab navigation                    |
| `@react-native-async-storage/async-storage`         | Persist login/auth state                 |
| `expo-status-bar`                                   | Control status bar color and visibility  |
| `react-native-vector-icons` or `@expo/vector-icons` | Icons in navigation and buttons          |
| `react-native-safe-area-context`                    | For safe area handling                   |
| `react-native-gesture-handler`                      | For navigation gestures                  |
| `react-native-reanimated`                           | Drawer/tab animation support             |

---

## 🛠 How It Works (Logic Flow)

```js
// Inside app/_layout.jsx
if (isLoading) {
  return <SplashScreen />;
}

return (
  <Stack>
    {isLoggedIn ? (
      <Stack.Screen name="(drawer)" />
    ) : (
      <Stack.Screen name="index" />
    )}
  </Stack>
);
```

* App checks login status using `AsyncStorage.getItem('isLoggedIn')`
* If true → goes to `(drawer)` layout
* Else → shows login page at `index.js`
* Drawer screen contains bottom tabs (home & profile)


## 🚀 Getting Started

### 🧱 Prerequisites

* Node.js installed
* Expo CLI (`npm install -g expo-cli`)

### 🔧 Setup

```bash
git clone https://github.com/yourusername/employee-management-app.git
cd employee-management-app
npm install
npx expo start
```

---

## 🧠 What I Learned

* Structuring React Native apps with nested navigation
* Using `AsyncStorage` for login state
* Managing conditional routing in `expo-router`
* Creating responsive and modern UI layouts
* Implementing a splash screen delay with async logic

---

## 👤 About the Developer

Made with ❤️ by **Arpit Rai**

📬 [arpitrai@example.com](mailto:arpitrai@example.com)
🌐 [LinkedIn](https://linkedin.com/in/arpitrai) | [GitHub](https://github.com/arpitr18)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

> *Feel free to fork, contribute or use this project as inspiration for your own learning journey.*


