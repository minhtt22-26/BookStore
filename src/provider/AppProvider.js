import React, { useEffect, useState } from 'react';
import AppContext from './Context';
import axios from 'axios';


function AppProvider({ children }) {
const [cart, setCart] = useState([]);
    // khai báo và quản lí 1 đối tượng như này
   const [authors, setAuthors] = useState([]);
   const [genres,setGenres] = useState([])
   const [book,setBook] = useState([])
   const [orders,setOrders] = useState([])
    useEffect(() => {
        const fetData = async () => {
            try {
                const responseA = await axios.get(
                  "http://localhost:9999/authors"
                );
                setAuthors(responseA.data);

                   const responseG = await axios.get(
                     "http://localhost:9999/genres"
                   );
                   setGenres(responseG.data);

                     const responseB = await axios.get(
                       "http://localhost:9999/books"
                     );
                     setBook(responseB.data);

                       const responseO = await axios.get(
                         "http://localhost:9999/orders"
                       );
                       setOrders(responseO.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetData();
    }, []); // chạy đúng 1 lần thôi 

    const data = {
      // mặc định truyền cho con ở đây cứ thế áp dụng ,
      //sau khi lấy và set xong thì vất nó vào đây
      authors,
      setAuthors,
      genres,
      setGenres,
      book,
      setBook,
      cart,
      setCart,
      orders,
      setOrders,
    };

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
