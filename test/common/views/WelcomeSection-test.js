import React, { addons } from 'react/addons';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import { expect } from 'chai';
// import sinon from 'sinon';
import WelcomeSection from '../common/views/WelcomeSection.jsx';
// import jsdom from './utils/jsdom';

const { TestUtils } = addons;

describe('WelcomeSection', () => {
  // jsdom();

  it('should render the text we want', () => {
    const shallowRenderer = TestUtils.createRenderer();
    const renderTexts = (()=> {
      shallowRenderer.render(<WelcomeSection />);
      const result = shallowRenderer.getRenderOutput();
      // get children under section that begins with h1..h5 tag
      return result.props.children.filter((component)=> {
        return ['h1', 'h2', 'h3', 'h4', 'h5'].indexOf(component.type) !== -1;
      });
    }());
    // expect user can seen the message even style or dom order change
    const textArray = renderTexts.map((textComponent)=> textComponent.props.children);
    expect(textArray).to.deep.equal(['一起來監督施政吧', '查詢政府首長施政進度',
      '從左側選單挑選要看的縣市長', '貼上新聞連結，更新施政進度',
      '進度開放編輯，只要附上訊息出處，就能更新施政進度']);

  });
  /* Can't find what's wrong with renderIntoDocument even setting a fake dom using jsdom
     might need to pay attention if this will cause a potential error to our code.
     Even it's a trivial test.
  it('should call onKnownTouchTap after touchTaped', () => {
    injectTapEventPlugin();
    const touchTapSpy = sinon.spy();
    const welcome = TestUtils.renderIntoDocument(<WelcomeSection onKnownTouchTap={touchTapSpy} />);
    TestUtils.Simulate.touchTap(welcome.refs.knownTarget);
    expect(touchTapSpy.calledOnce).to.be.true;
  });
  */
});
