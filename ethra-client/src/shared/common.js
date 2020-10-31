export const UPDATE_INPUT = "UPDATE_INPUT";

export function renderItems(Component, items, handlers) {
  const renderedItems = items.map((item) => (
    <Component key={item._id} {...item} {...handlers} />
  ));
}

export const handleFormChange = (key, value) => {
  dispatch({
    type: UPDATE_INPUT,
    payload: {
      key,
      value,
    },
  });
};
