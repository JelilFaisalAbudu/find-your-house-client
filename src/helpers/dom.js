export const spyHeaderScroll = distance => {
  const headerEl = document.querySelector('.site-header');

  if (headerEl && headerEl.classList.contains('remove-absolute')) {
    headerEl.classList.remove('remove-absolute');
  }

  const spyScroll = distance => {
    if ((headerEl && document.body.scrollTop >= distance)
    || document.documentElement.scrollTop >= distance) {
      headerEl.classList.add('remove-absolute');
    } else if (headerEl) {
      headerEl.classList.remove('remove-absolute');
    }
  };

  spyScroll(distance);
  document.addEventListener('scroll', () => {
    spyScroll(distance);
  });
};

export const spyNoScroll = () => {
  const headerEl = document.querySelector('.site-header');

  const spyScroll = () => {
    if (headerEl && !headerEl.classList.contains('remove-absolute')) {
      headerEl.classList.add('remove-absolute');
    }

    if (headerEl && document.body.scrollTop >= 0) {
      headerEl.classList.add('remove-absolute');
    }
  };

  spyScroll();
  document.addEventListener('scroll', () => {
    spyScroll();
  });
};

export default spyHeaderScroll;
