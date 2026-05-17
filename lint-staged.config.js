export default {
  '*.{js,jsx,ts,tsx,vue}': ['vp lint --fix', 'vp fmt --write'],
  '*.{json,md,yml,yaml,css,html}': ['vp fmt --write'],
};
