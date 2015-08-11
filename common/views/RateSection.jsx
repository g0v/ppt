import React from 'react';
import mui, { RaisedButton, TextField } from 'material-ui';
import ForwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import ProgressButton from './ProgressButton.jsx';
import pptColors from '../styles/color';

const { Transitions } = mui.Styles;
const debug = require('debug')('ppt:RateSection');

export default class RateSection extends React.Component {

  static propTypes = {
    home: React.PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      reason: '',
      selectedIndex: 0,
      shouldSubmitOpen: false,
    };
  }

  componentDidUpdate() {
    this.determineHeight(this.refs.submitSection, this.refs.wrapper);
  }

  getStyles(home = false) {
    const common = {
      source: {
        display: 'inline-block',
        fontSize: 15,
        color: pptColors.lightBlack,
      },
      forwardIcon: {
        width: 15,
        height: 15,
        fill: pptColors.black,
        opacity: 0.53,
        marginRight: '5%',
      },
    };

    const ratingPage = {
      submitRoot: {
        paddingTop: 10,
      },
      button: {
        marginRight: 8,
      },
    };

    const homeRatingSection = {
      quote: {
        fontSize: 20,
        color: pptColors.faintBlack,
      },
      content: {
        fontSize: 15,
        color: '#37474f',
      },
      buttonRoot: {
        margin: '8px 0 10px',
      },
      submitRoot: {
        paddingTop: 10,
        overflow: 'hidden',
        transition: Transitions.easeOut('300ms', 'height'),
        height: 0,
      },
      button: {
        minWidth: 82,
        marginRight: 8,
      },
    };

    return home ? {...common, ...homeRatingSection} : {...common, ...ratingPage};
  }

  render() {
    const { props: { home }, state: { selectedIndex } } = this;
    const styles = this.getStyles(home);
    return (
      <section>
        <span style={styles.quote}>❝</span>
        <p style={styles.content}>
          104 年度規劃擴大辦理 65 歲以上特約醫生幫老人裝假牙(原住民 55 歲以上) 其綜合所得稅稅率未達
          20%家戶之長者補助健保費，每月每人最高可補助 749 元，預計 12 萬人受惠。
        <span style={{...styles.quote, float: 'right'}}>❞</span>
        </p>
        <div style={{margin: '7px 0'}}>
          <ForwardIcon style={{...styles.source, ...styles.forwardIcon}}/>
          <a style={{...styles.source, cursor: 'pointer'}} href={""}>
            佐證資訊出處
          </a>
        </div>
        <p style={{ fontSize: 15, color: pptColors.primaryBlue }}>看完以上資料，你認為台中市政府的承諾</p>
        <p style={{ fontSize: 14, color: pptColors.darkBlack, marginTop: 8, fontWeight: 'bold' }}>65 歲以上老人健保免費</p>
        <div style={{margin: '7px 0'}}>
        <ForwardIcon style={{...styles.source, ...styles.forwardIcon}}/>
          <a style={{...styles.source, cursor: 'pointer'}} href={""}>
            看2014年的詳細承諾
          </a>
        </div>
        <p style={{ fontSize: 15, color: pptColors.primaryBlue }}>的達成率是？</p>
        <div style={styles.buttonRoot}>
          <ProgressButton progressIndex={1} selectedIndex={selectedIndex} style={styles.button}
             backgroundColor={pptColors.primaryRed} label="沒有做" handleTouchTap={::this.handleProgressTouchTap}/>
           <ProgressButton progressIndex={2} selectedIndex={selectedIndex} style={styles.button}
             backgroundColor={pptColors.primaryYellow} label="還在做" handleTouchTap={::this.handleProgressTouchTap}/>
           <ProgressButton progressIndex={3} selectedIndex={selectedIndex} style={styles.button}
             backgroundColor={pptColors.primaryBlue} label="已完成" handleTouchTap={::this.handleProgressTouchTap}/>
        </div>
        <div ref="submitSection" style={styles.submitRoot}>
          <div ref="wrapper">
            <p style={{ fontSize: 12, color: pptColors.lightBlack}}>認為此政見「已完成」的原因</p>
            <TextField hintText="（非必要）" inputStyle={{color: pptColors.black}} onChange={::this.handleReasonChange} />
            <div style={{marginTop: 12}}>
              <p style={{display: 'inline-block', marginRight: 20, fontSize: 12, color: pptColors.lightBlack}}>「送出達成率」需要您登入</p>
              <RaisedButton onTouchTap={::this.handleSubmit} style={{display: 'inline-block'}}
                labelColor={pptColors.white} backgroundColor={pptColors.primaryBlue} label="送出達成率" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  determineHeight(reHeight, target) {
    if (reHeight && target) {
    // ex scrollHeight: 115, height : 0, so we need add + 'px' to make height with unit
      React.findDOMNode(reHeight).style.height = this.state.shouldSubmitOpen ?
        React.findDOMNode(target).scrollHeight + 'px' : 0;
    }
  }

  handleProgressTouchTap(key) {
    return () => {
      this.setState({
        selectedIndex: key,
        shouldSubmitOpen: true,
      });
    };
  }

  handleReasonChange(e) {
    this.setState({
      reason: e.target.value.trim(),
    });
  }

  handleSubmit() {
    // const progress = ['notyet', 'doing', 'done'];
    debug(this.state);
  }
}
