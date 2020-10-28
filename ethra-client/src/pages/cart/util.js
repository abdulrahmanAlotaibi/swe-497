// export function renderItems(items, { handleRemoveItem }) {
//   return items.map((item) => {
//     const { _id, name, price } = item;
//     return (
//       <CartItem
//         key={_id}
//         name={name}
//         price={price}
//         removeItem={handleRemoveItem}
//       />
//     );
//   });
// }

export default function renderItems(Component, items, handlers) {
  return items.map((item) => {
    return <Component {...item} {...handlers} />;
  });
}
