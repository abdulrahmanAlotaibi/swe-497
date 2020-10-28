import LoadingSpinner from "components/loadingIcon/LoadingSpinner";
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
// export default function withFetch(WrappedComponent, path, requiredHeaders) {
//   return function (props) {
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//       getData();
//     }, []);

//     async function getData() {
//       try {
//         const res = await axios.get(`http://localhost:8000${path}`);
//         setData(res);
//       } catch (err) {}
//       setIsLoading(false);
//     }

//     async function handleRemoveItem(id) {
//       try {
//         // TODO: Optimistic update
//         await axios.delete(`/course/cart/${id}`, {
//           headers: requiredHeaders,
//         });
//       } catch (err) {}
//     }
//     if (isLoading) {
//       return <LoadingSpinner />;
//     }
//     return (
//       <WrappedComponent
//         data={data}
//         handlers={{ handleRemoveItem }}
//         {...props}
//       />
//     );
//   };
// }

function useFetch(path, headers) {
  const data = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:8000${path}`);
      setData(res);
    } catch (err) {}
    setIsLoading(false);
  }, []);

  return data;
}
