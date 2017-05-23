const { shallow, mount } = require('enzyme');
const React = require('react');

const toMatchElement = require('../toMatchElement');

function Fixture() {
  return (
    <div>
      <span id="child" className="foo" />
    </div>
  );
}

describe('toMatchElement', () => {
  const wrapper = shallow(<Fixture />);
  const truthyResults = toMatchElement(wrapper, <Fixture />);
  const truthyResults2 = toMatchElement(wrapper,
    <div>
      <span id="child" className="foo" />
    </div>
  );
  const falsyResults = toMatchElement(wrapper, <div />);
  const badInputResults = toMatchElement(mount(<Fixture />));

  it('returns the pass flag properly', () => {
    expect(truthyResults.pass).toBeTruthy();
    expect(truthyResults2.pass).toBeTruthy();
    expect(falsyResults.pass).toBeFalsy();
    expect(badInputResults.pass).toBeFalsy();
  });

  it('returns the message with the proper pass verbage', () => {
    expect(truthyResults.message).toMatchSnapshot();
    expect(truthyResults2.message).toMatchSnapshot();
    expect(falsyResults.message).toMatchSnapshot();
    expect(badInputResults.message).toMatchSnapshot();
  });

  it('returns the message with the proper fail verbage', () => {
    expect(truthyResults.negatedMessage).toMatchSnapshot();
    expect(truthyResults2.negatedMessage).toMatchSnapshot();
    expect(falsyResults.negatedMessage).toMatchSnapshot();
    expect(badInputResults.negatedMessage).toMatchSnapshot();
  });

  it('provides contextual information for the message', () => {
    expect(truthyResults.contextualInformation).toMatchSnapshot();
    expect(truthyResults2.contextualInformation).toMatchSnapshot();
    expect(falsyResults.contextualInformation).toMatchSnapshot();
    expect(badInputResults.contextualInformation).toMatchSnapshot();
  });
});
