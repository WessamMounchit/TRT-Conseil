const fetchData = async (setData, apiCall) => {
  setData({ loading: true, error: false, data: undefined });

  try {
    const response = await apiCall();
    setData({ loading: false, error: false, data: response.data });
  } catch (error) {
    setData({ loading: false, error: true, data: undefined });
  }
};

export default fetchData;
