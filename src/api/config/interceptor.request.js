const requestInterceptor = (config) => {
  if (localStorage.getItem('token')) {
    config.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  
  return config;
};

export default requestInterceptor;
