import React, { addons } from 'react';
import { expect } from 'chai';
import WelcomeSection from '../common/views/WelcomeSection.jsx';

const { TestUtils } = addons;

describe('WelcomeSection', () => {
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
});
