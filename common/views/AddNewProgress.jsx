import React from 'react';
import mui, { RaisedButton, DatePicker, TextField, SelectField } from 'material-ui';
import pptColors from '../styles/color';
import pptSpacing from '../styles/spacing';

const { AutoPrefix } = mui.Styles;
const debug = require('debug')('ppt:AddNewProgress');

class AddNewProgress extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      source: '',
      brief: '',
      date: undefined,
      selectedGovernor: undefined,
      relatedCommitment: undefined,
    };
  }

  getStyles() {
    return {
      root: {
        paddingTop: pptSpacing.appBarHeight,
        height: '100%',
        width: '100%',
      },
      section: {
        width: '100%',
        maxWidth: 960,
        margin: 'auto',
        padding: '0 15px',
        boxSizing: 'border-box',
      },
      middleSection: {
        width: '100%',
        marginTop: 24,
        position: 'relative',
      },
      notFullWidth: {
        display: 'inline-block',
        width: '50%',
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const governorMenu = [
      { payload: '1', text: '桃園市政府' },
      { payload: '2', text: '台中市政府' },
      { payload: '3', text: '台北市政府' },
    ];
    return (
      <div style={styles.root}>
        <section style={AutoPrefix.all(styles.section)}>
          <TextField
            hintText="請貼上政府公告或新聞的 URL"
            floatingLabelText="資訊出處"
            fullWidth={true}
            inputStyle={{color: pptColors.black}}
            value={this.state.source}
            onChange={::this.handleTextInput('source')} />
          <TextField
            hintText="請大概節錄出處文章的相關文字"
            floatingLabelText="資訊摘要"
            fullWidth={true}
            inputStyle={{color: pptColors.black}}
            value={this.state.brief}
            onChange={::this.handleTextInput('brief')} />
          <div style={styles.middleSection}>
            <DatePicker
              textFieldStyle={{width: '80%'}}
              style={{...styles.notFullWidth}}
              hintText="新進度發生時間"
              showYearSelector={true}
              onChange={::this.handleDateChange} />
            <SelectField
              style={{...styles.notFullWidth, position: 'absolute'}}
              value={this.state.selectedGovernor}
              onChange={::this.handleTextInput('selectedGovernor')}
              hintText="請選擇執政者"
              menuItems={governorMenu} />
          </div>
          <TextField
            hintText="請先選擇執政者"
            floatingLabelText="相關承諾"
            fullWidth={true}
            inputStyle={{color: pptColors.black}}
            value={this.state.relatedCommitment}
            onChange={::this.handleTextInput('relatedCommitment')}
            multiLine={true} />
          <div style={{float: 'right'}}>
            <RaisedButton
              backgroundColor={pptColors.background}
              label="下一步"
              onTouchTap={::this.handleSubmit} />
          </div>
        </section>
      </div>
    );
  }

  handleTextInput(stateAttr) {
    return (e) => {
      this.setState({
        [stateAttr]: e.target.value,
      });
    };
  }

  handleDateChange(nill, selectedDate) {
    this.setState({
      date: selectedDate,
    });
  }

  handleSubmit() {
    debug(this.state);
  }
}

export default AddNewProgress;
