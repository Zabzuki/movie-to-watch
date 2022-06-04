export const setUpScrollListeners = (self, sentinel, callback, params) => {
  let intersectionObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.intersectionRatio > 0)) {
      callback.call(self, params);
    }
  });
  intersectionObserver.observe(sentinel);
  return intersectionObserver;
};

export const tearDownScrollListeners = (intersectionObserver, sentinel) => {
  intersectionObserver.unobserve(sentinel);
};
