export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'EUR',
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  return ['all', ...new Set(unique)];
};

export const getLocalStorage = (key) => {
  let item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  } else {
    if (key === 'user') {
      return null;
    }
    if (key === 'cart') {
      return [];
    }
    if (key === 'cart_id') {
      return '';
    }
    return;
  }
};
