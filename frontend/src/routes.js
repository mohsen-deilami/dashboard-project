import Home from "./Components/Home/Home"
import Products from "./Components/products/Products"
import Comments from "./Components/comments/Comments"
import Rabat from "./Components/rabat/Rabat"
import Users from "./Components/users/Users"
import Orders from "./Components/orders/Orders"
import NotFound from "./Components/NotFound"


const routes=[
    {path:'/' , element:<Home/>},
    {path:'products' , element:<Products/>},
    {path:'comments' , element:<Comments/>},
    {path:'users' , element:<Users/>},
    {path:'orders' , element:<Orders/>},
    {path:'rabat' , element:<Rabat/>},
    {path:'*' , element:<NotFound/>},
];
export default routes