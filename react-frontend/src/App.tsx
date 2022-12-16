import React from "react";
import "./App.css";
import {Routes, Route} from "react-router-dom";

import {Index} from "./pages/Index";
import {Product} from "./pages/Product";
import {LoginPage} from "./pages/auth/LoginPage";
import {Dashboard} from "./pages/user/Dashboard";
import {PrivateRoute} from "./routes/PrivateRoute";
import {CategoryShow} from "./pages/category/CategoryShow";
import {ProductShow} from "./pages/product/ProductShow";
import {CartShow} from "./pages/cart/CartShow";
import {CheckoutShow} from "./pages/checkout/CheckoutShow";
import {CheckoutShippingAddressShow} from "./pages/checkout/CheckoutShippingAddressShow";
import {CheckoutPaymentShow} from "./pages/checkout/CheckoutPaymentShow";
import {CheckoutShippingShow} from "./pages/checkout/CheckoutShippingShow";
import { CheckoutSummaryShow } from "./pages/checkout/CheckoutSummaryShow";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/category/:slug" element={<CategoryShow/>}/>
                <Route path="/product/:slug" element={<ProductShow/>}/>
                <Route path="/cart" element={<CartShow/>}/>
                <Route path="/checkout" element={<CheckoutShow/>}/>
                <Route path="/checkout/shipping-address" element={<CheckoutShippingAddressShow/>}/>
                <Route path="/checkout/shipping" element={<CheckoutShippingShow/>}/>
                <Route path="/checkout/payment" element={<CheckoutPaymentShow/>}/>
                <Route path="/checkout/summary" element={<CheckoutSummaryShow/>}/>

                {/* ***********  User Navigation Routes or Protected routes ************  */}
                <Route path="/user" element={<PrivateRoute/>}>
                    <Route path="" element={<Dashboard/>}/>
                </Route>

                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </>
    );
}

export default App;
