/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toMatchSelectorAssertion
 * @flow
 */

import { shallow } from 'enzyme';
import type { Matcher } from '../../../../types/Matcher';
import type { EnzymeObject } from '../../../../types/EnzymeObject';
import isShallowWrapper from '../utils/isShallowWrapper';
import single from '../utils/single';

function toMatchElement(actualEnzymeWrapper:EnzymeObject, reactInstance:Object) : Matcher {
  if (!isShallowWrapper(actualEnzymeWrapper)) {
    return {
      pass: false,
      message: 'toMatchElement must be called on a ShallowWrapper',
      negatedMessage: 'toMatchElement must be called on a ShallowWrapper',
      contextualInformation: {},
    };
  }

  const expectedWrapper:EnzymeObject = shallow(reactInstance);
  const actual = actualEnzymeWrapper.debug();
  const expected = expectedWrapper.debug();
  const pass = actual === expected;

  return {
    pass,
    message: 'Expected actual value to match the expected value.',
    negatedMessage: 'Did not expect actual value to match the expected value.',
    contextualInformation: `\nactual:\n${actual}\n\nexpected:\n${expected}\n`,
  };
}

export default single(toMatchElement);
