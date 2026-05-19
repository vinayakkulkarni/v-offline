const ignorePatterns = [
  /(?:^|\/)jsr\.json$/,
  /(?:^|\/)CHANGELOG\.md$/,
  /(?:^|\/)pnpm-lock\.yaml$/,
];

const isIgnored = (file) =>
  ignorePatterns.some((pattern) => pattern.test(file));

export default {
  '*.{js,jsx,ts,tsx,vue}': (files) => {
    const filtered = files.filter((f) => !isIgnored(f));
    return filtered.length > 0
      ? [
          `vp lint --fix ${filtered.join(' ')}`,
          `vp fmt --write ${filtered.join(' ')}`,
        ]
      : [];
  },
  '*.{json,md,yml,yaml,css,html}': (files) => {
    const filtered = files.filter((f) => !isIgnored(f));
    return filtered.length > 0 ? [`vp fmt --write ${filtered.join(' ')}`] : [];
  },
};
