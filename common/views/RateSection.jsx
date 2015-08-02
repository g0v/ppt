import React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import ForwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import pptColors from '../styles/color';

export default class RateSection extends React.Component {

  static propTypes = {
    home: React.PropTypes.bool
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
        marginRight: '5%'
      },
      button: {
        marginRight: 8
      }
    };

    const ratingPage = {

    };

    const homeRatingSection = {
      quote: {
        fontSize: 20,
        color: pptColors.faintBlack
      },
      content: {
        fontSize: 15,
        color: '#37474f'
      },
      buttonRoot: {
        margin: '8px 0 10px'
      }
    };

    return home ? {...common, ...homeRatingSection} : {...common, ...ratingPage}
  }

  render() {
    const { home } = this.props;
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
          <RaisedButton style={styles.button} labelColor={pptColors.white} backgroundColor={pptColors.primaryRed} label="沒有做" />
          <RaisedButton style={styles.button} labelColor={pptColors.white} backgroundColor={pptColors.primaryYellow} label="還在做" />
          <RaisedButton style={styles.button} labelColor={pptColors.white} backgroundColor={pptColors.primaryBlue} label="已完成" />
        </div>
        <div style={{paddingTop: 10}}>
          <p style={{ fontSize: 12, color: pptColors.lightBlack}}>認為此政見「已完成」的原因</p>
          <TextField hintText="（非必要）" inputStyle={{color: pptColors.black}}/>
          <div style={{marginTop: 12}}>
            <p style={{display: 'inline-block', marginRight: 20, fontSize: 12, color: pptColors.lightBlack}}>「送出達成率」需要您登入</p>
            <RaisedButton style={{display:'inline-block'}} labelColor={pptColors.white} backgroundColor={pptColors.primaryBlue} label="送出達成率" />
          </div>
        </div>
      </section>
    );
  }
}
