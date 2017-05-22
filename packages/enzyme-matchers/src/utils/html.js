import instance from './instance';
/* eslint-disable no-console */
let consoleObject;
try {
  consoleObject = console;
} catch (e) {
  // If no global console object is available, set consoleObject to a dummy object.
  consoleObject = {};
}
const noop = () => {};
const error = consoleObject.error;
import { ShallowWrapper } from 'enzyme';

function mapWrappersHTML(wrapper) : string {
  return wrapper.nodes.map(node => {
    const inst = instance(node);
    const type = node.type || inst._tag;

    consoleObject.error = noop;
    const { children, ...props } = node.props
      ? node.props
      : inst._currentElement.props;
    consoleObject.error = error;

    const transformedProps = Object.keys(props).map(key => `${key}="${props[key]}"`);
    let stringifiedNode = `<${type} ${transformedProps.join(' ')}`;

    if (children) {
      stringifiedNode += `>[..children..]</${node.type}`;
    } else {
      stringifiedNode += '/>';
    }

    return stringifiedNode;
  });
}

export default function printHTMLForWrapper(wrapper) : string {
  switch (wrapper.nodes.length) {
    case 0: {
      return '[empty set]';
    }
    case 1: {
      if (wrapper instanceof ShallowWrapper) {
        return wrapper.debug().replace(/\n/g, '');
      }

      return wrapper.html();
    }
    default: {
      const nodes = mapWrappersHTML(wrapper).reduce(
        (acc, curr, index) => `${acc}${index}: ${curr}\n`,
        ''
      );

      return `Multiple nodes found:\n${nodes}`;
    }
  }
}
