# Integrify WebStore - Final assigment
![Generic badge](https://img.shields.io/badge/JS-ES6-yellow.svg)
![Generic badge](https://img.shields.io/badge/SCSS-v.1.57-red.svg)
![Generic badge](https://img.shields.io/badge/Redux-v.8.0.5-orangered.svg)
![Generic badge](https://img.shields.io/badge/MUI-v.5.11-darkblue.svg)
![Generic badge](https://img.shields.io/badge/TS-v.4.9-blue.svg)
![Generic badge](https://img.shields.io/badge/React-v.18.2-orange.svg)
![Generic badge](https://img.shields.io/badge/Jest-v.29.0.3-white.svg)
![Generic badge](https://img.shields.io/badge/Router-v.6.6-lightyellow.svg)

## Technologies
* React 
* React Router
* Redux
* TypeScript
* Material UI
* JS
* API
* SCSS
* Jest

### WebStore with Fake API
Functional WebStore was created with calls to Fake API.

### Pages
* Homepage
* Checkout page
* Page with chosen category
* Product page
* Login/Registration page
* User (Personal account) page

### Functionality
* User can create account or login to existing account as customer or admin
  * User data and auth token is saved to localstorage to keep data after reload/refresh page, on logout localstorage is emptied
  * User auth token is saved as global state with Redux
  * Customer features: 
    * Add Product (from personal page)
    * Edit own profile(only for created users, not on the ones existing in API already)
    * Checkout Page 
    * Personal Page
  * Admin features:
    * Create, edit and delete products (Can delete products from categories, home or product page, can edit only from product page, create product on personal page)
    * Edit own profile(only for created users, not on the ones existing in API already)
    * Create, edit categories(from personal page)
    * Checkout Page
    * On personal page admin can review whole store content, filter it, see all users, products, categories
* Cart
    * Cart is saved as global state with Redux
    * Cart features
      * Items can be added/deleted from cart
      * Cart can be cleared with 1 button 'clear cart'
      * If there are several same items in cart, user can add/remove 1 by 1, or press on bin icon and delete all same items
      * Cart is saved to localstorage to keep data after reload/refresh page
* Product list
    * Product list are saved as global state with Redux  
    * Can be filtered on categories page by
      * Alphabetical order
      * Descending alphabetical order
      * Lowest to highest
      * Highest to lowest
      * Default(without any filters)
      * Price range with range input
      * Search by name
    * Filters 'search by name' and 'range' work with .5s delay with useDebounce hook to unload API and user interface, if product list is too heavy (waiting for user to finish input)
    * If logged as admin, can delete items directly from product page(special icon appears near every product)
* Product page
  * Product page contains custom slider and item description
  * If logged as admin, user can edit or delete item on this page
* Unit tests
  * Jest unit tests to check functionality and correctness of all functions related to API
  * Tested all Redux global states, and service component with async calls to API
  * 5 suits, 21 test total
* Dark theme
  * Dark theme status is saved in LocalStorage to avoid reset after page refresh
* Extra features:
  * Users can upload images to server from their PC, while creating, editing product or category
  * Protected Routes (Without logging in user can't get into checkout or personal page) with useAuth hook
  * Pagination with dynamic pages count on HomePage
  * Redux is also used for categories(as header component, shortened to 6 due to design purposes)
* Hooks used in project
  * useContext - for DarkTheme
  * useState
  * useEffect
  * useDebounce - for filters delay
  * useAuth - for Protected Routes
  * useAppDispatch - for Redux
  * useAppSelector - for Redux
* Upcoming features
  * Full form validations
  * Notifications

## Project Structure
<details>
<summary>Open Project Structure</summary>

``` bash
│
├───public
│       favicon.ico
│       index.html
│
└───src
    │   index.scss
    │   index.tsx
    │
    ├───assets
    │   └───img
    │       │   404.png
    │       │
    │       ├───categories
    │       │       no-network.bmp
    │       │       no-product.png
    │       │
    │       ├───checkout
    │       │       empty-cart.png
    │       │
    │       ├───header
    │       │       logo-black.png
    │       │       logo-white.png
    │       │
    │       └───intro
    │           │   cloths.jpg
    │           │   women.jpg
    │           │
    │           └───categories
    │                   cloths.webp
    │                   electronics.jpg
    │                   furniture.jpg
    │                   shoes.jpg
    │
    ├───components
    │   │   ThemeContext.tsx
    │   │   types-interfaces.tsx
    │   │
    │   ├───App
    │   │       App.tsx
    │   │
    │   ├───ErrorImageComponent
    │   │       ErrorImageComponent.tsx
    │   │
    │   ├───Footer
    │   │       Footer.tsx
    │   │       _footer.scss
    │   │
    │   ├───Header
    │   │   │   Header.tsx
    │   │   │   ThemeSwitchIcon.tsx
    │   │   │   _header.scss
    │   │   │
    │   │   └───ShoppingCart
    │   │           shopping-cart.scss
    │   │           ShoppingCart.tsx
    │   │
    │   ├───NotificationMessage
    │   │       NotificationMessage.tsx
    │   │
    │   ├───pages
    │   │   ├───Category
    │   │   │       CategoryPage.tsx
    │   │   │       _categoryPage.scss
    │   │   │
    │   │   ├───CheckoutPage
    │   │   │       CheckoutPage.tsx
    │   │   │       _checkout.scss
    │   │   │
    │   │   ├───HomePage
    │   │   │   │   HomePage.tsx
    │   │   │   │
    │   │   │   ├───CategorySection
    │   │   │   │       CategorySection.tsx
    │   │   │   │       _categorySection.scss
    │   │   │   │
    │   │   │   ├───IntroSection
    │   │   │   │       IntroSection.tsx
    │   │   │   │       _intro-section.scss
    │   │   │   │
    │   │   │   ├───ProductCard
    │   │   │   │       ProductCard.tsx
    │   │   │   │       _productCard.scss
    │   │   │   │
    │   │   │   └───ProductsSection
    │   │   │           ProductsSection.tsx
    │   │   │           _products.scss
    │   │   │
    │   │   ├───ProductPage
    │   │   │   │   ProductImageSlider.tsx
    │   │   │   │   ProductPage.tsx
    │   │   │   │   _product-page.scss
    │   │   │   │
    │   │   │   └───EditProductModal
    │   │   │           EditProductModal.tsx
    │   │   │           _edit-product.scss
    │   │   │
    │   │   └───UserPage
    │   │       ├───AuthPage
    │   │       │       AuthPage.tsx
    │   │       │       _login.scss
    │   │       │
    │   │       ├───EditCategoryModal
    │   │       │       EditCategoryModal.tsx
    │   │       │
    │   │       ├───Login
    │   │       │       LoginComponent.tsx
    │   │       │
    │   │       ├───NewCategoryModal
    │   │       │       NewCategoryModal.tsx
    │   │       │
    │   │       ├───NewItemModal
    │   │       │       NewItemModal.tsx
    │   │       │
    │   │       ├───PersonData
    │   │       │   │   PersonData.tsx
    │   │       │   │   _profile.scss
    │   │       │   │
    │   │       │   ├───GridDataContent
    │   │       │   │       GridDataContent.tsx
    │   │       │   │
    │   │       │   └───ProfileFunctionality
    │   │       │           ProfileFunctionality.tsx
    │   │       │           _profile-functionality.scss
    │   │       │
    │   │       ├───Registration
    │   │       │       RegistrationComponent.tsx
    │   │       │
    │   │       └───UserContentContainer
    │   │               UserContent.tsx
    │   │
    │   ├───StoreServices
    │   │       createDateFunction.ts
    │   │       StoreServices.ts
    │   │
    │   └───UserValidation
    │           UserValidation.tsx
    │
    ├───hooks
    │       reduxHook.ts
    │       useAuth.ts
    │       useDebounce.tsx
    │
    ├───redux
    │   │   store.ts
    │   │
    │   └───slices
    │           cartReducer.ts
    │           categoryReducer.ts
    │           productReducer.ts
    │           userReducer.ts
    │
    ├───tests
    │   │   storeServices.test.ts
    │   │
    │   ├───reducers
    │   │       cartReducer.test.ts
    │   │       categoriesReducer.test.ts
    │   │       productReducer.test.ts
    │   │       userReducer.test.ts
    │   │
    │   └───shared
    │           fakeData.ts
    │           server.ts
    │
    └───utility
            _mixins.scss
            _variables.scss


```
</details>

## Getting Started
#### Website is deployed on Netlify and [can be viewed here](https://cheerful-malasada-f9dc2f.netlify.app/) <br>

### Cloning and launch
Clone the repository from GitHub with `git clone https://github.com/Rmk-kk/FS13-React-TS-WebStore`. <br>
Check public repository on `https://github.com/Rmk-kk/FS13-React-TS-WebStore`

* `npm install` - install all project dependencies
* `npm start` - launch SPA on localhost:3000
* `npm test` - run test process, total 5 suits, 21 test

## Credits
Website was created by Roman Demianchuk and uses Platzi FakeStore API([can be view here](https://fakeapi.platzi.com/))




