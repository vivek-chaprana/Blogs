export default function generateCaseVariations(query: string) {
  const string = decodeURIComponent(query);

  const lowerCase = string.toLowerCase();
  const upperCase = string.toUpperCase();
  const titleCase = string.charAt(0).toUpperCase() + string.slice(1);
  const camelCase = string.replace(/\s(\w)/g, (_, match) =>
    match.toUpperCase()
  );
  const pascalCase = string.replace(
    /(\w)(\w*)/g,
    (_, first, rest) => first.toUpperCase() + rest.toLowerCase()
  );
  const kebabCase = string.replace(/\s/g, "-").toLowerCase();
  const snakeCase = string.replace(/\s/g, "_").toLowerCase();
  const dotNotation = string.replace(/\s/g, ".").toLowerCase();
  return Array.from(
    new Set([
      string,
      lowerCase,
      upperCase,
      titleCase,
      camelCase,
      pascalCase,
      kebabCase,
      snakeCase,
      dotNotation,
    ])
  );
}
