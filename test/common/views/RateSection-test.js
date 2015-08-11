import React, { addons } from 'react/addons';
import { expect } from 'chai';
import RateSection from '../../../common/views/RateSection.jsx';
import pptColors from '../../../common/styles/color';

const { TestUtils } = addons;

describe('RateSection', () => {

  describe('ProgressButton Part', () => {
    let shallowRenderer;
    let createNotyetButton;

    before(() => {
      shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(<RateSection />);
      createNotyetButton = () => {
        return shallowRenderer.getRenderOutput().props.children[7].props.children[0];
      };
    });

    it('should set progressIndex and selectedIndex correctly', () => {
      const notyet = createNotyetButton();
      expect(notyet.props.selectedIndex).to.equal(0);
      expect(notyet.props.progressIndex).to.equal(1);
    });

    it('should change backgroundColor and selectedIndex when button touchTaped', () => {
      require('../../utils/document.js');
      const notyet = createNotyetButton();
      notyet.props.handleTouchTap(notyet.props.progressIndex)();
      const notyetRerendered = createNotyetButton();
      expect(notyetRerendered.props.selectedIndex).to.equal(notyetRerendered.props.progressIndex);
      expect(notyetRerendered.props.backgroundColor).to.equal(pptColors.primaryRed);
    });
  });
});
