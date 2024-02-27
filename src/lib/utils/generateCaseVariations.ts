export default function generateCaseVariations(query: string) {
  const lowerCase = query.toLowerCase();
  const upperCase = query.toUpperCase();
  const titleCase = query.charAt(0).toUpperCase() + query.slice(1);
  const camelCase = query.replace(/\s(\w)/g, (_, match) => match.toUpperCase());
  const pascalCase = query.replace(
    /(\w)(\w*)/g,
    (_, first, rest) => first.toUpperCase() + rest.toLowerCase()
  );
  const kebabCase = query.replace(/\s/g, "-").toLowerCase();
  const snakeCase = query.replace(/\s/g, "_").toLowerCase();
  const dotNotation = query.replace(/\s/g, ".").toLowerCase();

  return Array.from(
    new Set([
      query,
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
