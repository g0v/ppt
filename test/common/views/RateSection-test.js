import React, { addons } from 'react/addons';
import { expect } from 'chai';
import getInstance from '../../utils/getInstance';
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

    it('should change backgroundColor and selectedIndex when button is touchTapped', () => {
      require('../../utils/document.js');
      const notyet = createNotyetButton();
      notyet.props.handleTouchTap(notyet.props.progressIndex)();
      const notyetRerendered = createNotyetButton();
      expect(notyetRerendered.props.selectedIndex).to.equal(notyetRerendered.props.progressIndex);
      expect(notyetRerendered.props.backgroundColor).to.equal(pptColors.primaryRed);
    });

    it('should change backgroundColor and selectedIndex when button is touchTapped', () => {
      require('../../utils/document.js');
      const notyet = createNotyetButton();
      notyet.props.handleTouchTap(notyet.props.progressIndex)();
      const notyetRerendered = createNotyetButton();
      expect(notyetRerendered.props.selectedIndex).to.equal(notyetRerendered.props.progressIndex);
      expect(notyetRerendered.props.backgroundColor).to.equal(pptColors.primaryRed);
    });

    it('should set shouldSubmitOpen to true', () => {
      require('../../utils/document.js');
      const notyet = createNotyetButton();
      notyet.props.handleTouchTap(notyet.props.progressIndex)();
      shallowRenderer.getRenderOutput();
      expect(getInstance(shallowRenderer).state.shouldSubmitOpen).to.be.true;
    });

    it('determineHeight should function well', () => {
      let testCase = {
        reHeight: {style: {height: 0}},
        target: {scrollHeight: 115},
      };
      RateSection.prototype.determineHeight(testCase.reHeight, testCase.target, true);
      expect(testCase.reHeight.style.height).to.equal('115px');
    });
  });

  describe('TextField part', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<RateSection />);
    const createTextField = () => {
      return shallowRenderer.getRenderOutput().props.children[8].props.children.props.children[1];
    };
    it('handleReasonChange should change state reason', () => {
      createTextField().props.onChange({target: {value: '  hello world!  '}});
      expect(getInstance(shallowRenderer).state.reason).to.equal('hello world!');
    });
  });

  describe('Submit part', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<RateSection />);
    const createSubmitButton = () => {
      return shallowRenderer.getRenderOutput().props.children[8].props.children.
        props.children[2].props.children[1];
    };
    it('handleReasonChange should change state reason', () => {
      const testCase = {
        state: {
          reason: 'not so bad!',
          selectedIndex: 3,
        }
      };
      const submitResult = RateSection.prototype.handleSubmit.bind(testCase)();
      expect(submitResult).to.deep.equal({
        reason: 'not so bad!',
        progress: 'done',
      });
    });
  });
});
