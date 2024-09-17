export const convertJson = (text: string): string => {
  try {
    const textParsed = JSON.parse(text);
    return JSON.stringify(textParsed, null, 2);
  } catch (error) {
    return text;
  }
};

export const prettierTextArea = (query: string[], tab = 2): string => {
  let level = 0;
  let parenthesesIsOpen = false;
  let bracesIsOpen = false;
  let writeInLine = false;

  const getPadding = () => ' '.repeat(level * tab);

  const result: string[] = query.map((element, i, arr) => {
    const nextElement = arr[i + 1];

    if (element === '{') bracesIsOpen = true;
    if (element === '}') bracesIsOpen = false;
    if (element === '(') parenthesesIsOpen = true;
    if (element === ')') parenthesesIsOpen = false;
    if (element === '...' || nextElement === '@') writeInLine = true;

    if (/[()$!@]/.test(element)) {
      return element;
    }

    if (element === ',') {
      if (nextElement === ',') return '';
      return parenthesesIsOpen ? `${element} ` : `\n${getPadding()}`;
    }

    if (/[:]/.test(element)) {
      return `${element} `;
    }

    if (i === 0 && element === '{') {
      level++;
      return `${element}\n${getPadding()}`;
    } else if (element === '{') {
      writeInLine = false;
      level++;
      return ` ${element}\n${getPadding()}`;
    }

    if (element === '}') {
      level--;

      if (level === 0 && nextElement) return `\n${element}\n\n`;

      const padding = getPadding();
      return nextElement === '}' ? `\n${padding}${element}` : `\n${padding}${element}\n${padding}`;
    }

    if (!/[:,!${}()]/.test(nextElement)) {
      if (!bracesIsOpen || writeInLine) return `${element} `;
      if (!parenthesesIsOpen) return `${element}\n${getPadding()}`;
    }

    return element;
  });

  return result.join('');
};

export const getArr = (element: string): string[] => {
  return element
    .replace(/#.*(?=\n|$)|[\r\n\s]+/g, ' ')
    .replace(/[{}():,!$@]/g, (match) => ` ${match} `)
    .split(' ')
    .filter((symbol) => symbol !== '');
};

export const isBrackets = (element: string[]): boolean => {
  const stack: string[] = [];

  if (!element.includes('{')) return false;

  for (let i = 0; i < element.length; i++) {
    const current = element[i];

    if (/[{(]/.test(element[i])) {
      stack.push(current);
    }

    if (/[})]/.test(current)) {
      if (stack.length === 0) {
        return false;
      }

      const last = stack.pop();

      if ((last === '(' && current !== ')') || (last === '{' && current !== '}')) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
