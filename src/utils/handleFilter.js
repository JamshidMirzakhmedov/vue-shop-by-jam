import { SEARCH_API, CATEGORY_API, PRODUCTS_API } from "@/constants/apiURL";

const handleFilter = (filterQuery, productsData) => {
  const { search, filterBy } = filterQuery;
  if (search) {
    fetch(`${SEARCH_API}${search}`)
      .then((res) => res.json())
      .then((data) => (productsData.value = data));
  }
  if (filterBy) {
    fetch(`${CATEGORY_API}${filterBy}`)
      .then((res) => res.json())
      .then((data) => (productsData.value = data));
  }
  if (filterBy === "") {
    fetch(PRODUCTS_API)
      .then((res) => res.json())
      .then((data) => (productsData.value = data));
    return;
  }
};

export default handleFilter;
