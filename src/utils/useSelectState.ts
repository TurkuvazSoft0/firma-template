import * as React from 'react';

const useSelectState = (initialState = undefined) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return {selectedIndex, onSelect: setSelectedIndex};
};
export default useSelectState;
