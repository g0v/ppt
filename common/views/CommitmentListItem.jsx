import React from 'react';
import mui from 'material-ui';

const { Colors, Typography, Transitions } = mui.Styles,
      { ColorManipulator } = mui.Utils,
      { StylePropable } = mui.Mixins;

let CommitmentListItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    leftIcon: React.PropTypes.element,
    onKeyboardFocus: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primaryText: React.PropTypes.node,
    secondaryText: React.PropTypes.node,
    secondaryTextLines: React.PropTypes.oneOf([1, 2]),
  },

  getDefaultProps() {
    return {
      secondaryTextLines: 1,
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
    };
  },

  render() {
    let {
      leftIcon,
      onKeyboardFocus,
      onMouseLeave,
      onMouseEnter,
      onTouchStart,
      primaryText,
      secondaryText,
      secondaryTextLines,
      style,
      ...other,
    } = this.props;

    let textColor = this.context.muiTheme.palette.textColor,
        hoverColor = ColorManipulator.fade(textColor, 0.1),
        singleAvatar = !secondaryText && leftIcon,
        singleNoAvatar = !secondaryText && !leftIcon,
        twoLine = secondaryText && secondaryTextLines === 1,
        threeLine = secondaryText && secondaryTextLines > 1,

    styles = {
      root: {
        backgroundColor: (this.state.isKeyboardFocused || this.state.hovered) &&
          !this.state.rightIconButtonHovered &&
          !this.state.rightIconButtonKeyboardFocused ? hoverColor : null,
        color: textColor,
        display: 'block',
        fontSize: 16,
        lineHeight: '16px',
        position: 'relative',
        transition: Transitions.easeOut(),
        cursor: 'pointer',
      },

      innerDiv: {
        paddingLeft: leftIcon ? 72 : 16,
        paddingBottom: singleAvatar ? 20 : 16,
        paddingTop: singleNoAvatar || threeLine ? 16 : 20,
        position: 'relative',
      },

      icons: {
        height: 24,
        width: 24,
        display: 'block',
        position: 'absolute',
        top: twoLine ? 12 : singleAvatar ? 4 : 0,
        padding: 12,
      },

      leftIcon: {
        color: Colors.grey600,
        fill: Colors.grey600,
        left: 4,
      },

      primaryText: {
        margin: 0,
      },

      secondaryText: {
        fontSize: 14,
        lineHeight: threeLine ? '18px' : '16px',
        height: threeLine ? 36 : 16,
        margin: 0,
        marginTop: 4,
        color: Typography.textLightBlack,

        //needed for 2 and 3 line ellipsis
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: threeLine ? null : 'nowrap',
        display: threeLine ? '-webkit-box' : null,
        WebkitLineClamp: threeLine ? 2 : null,
        WebkitBoxOrient: threeLine ? 'vertical' : null,
      },
    },

        primaryTextIsAnElement = React.isValidElement(primaryText),
        secondaryTextIsAnElement = React.isValidElement(secondaryText),

        mergedRootStyles = this.mergeAndPrefix(styles.root, style),
        mergedInnerDivStyles = styles.innerDiv,

        mergedPrimaryTextStyles = primaryTextIsAnElement ?
          this.mergeStyles(styles.primaryText, primaryText.props.style) : null,
        mergedSecondaryTextStyles = secondaryTextIsAnElement ?
          this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

    let contentChildren = [];

    React.Children.forEach(this.props.children, (child) => {
      if (child === null) {
        return;
      }

      if (React.isValidElement(child) && child.type.displayName === 'CommitmentListItem') {
        nestedListItems.push(child);
      } else {
        contentChildren.push(child);
      }
    });

    this._pushElement(contentChildren, leftIcon, this.mergeStyles(styles.icons, styles.leftIcon));

    if (primaryText) {
      contentChildren.push(
        React.isValidElement(primaryText) ?
          React.cloneElement(primaryText, {key: 'primaryText', style: mergedPrimaryTextStyles}) :
          <div key="primaryText" style={styles.primaryText}>{primaryText}</div>
      );
    }

    if (secondaryText) {
      contentChildren.push(
        React.isValidElement(secondaryText) ?
          React.cloneElement(secondaryText, {key: 'secondaryText', style: mergedSecondaryTextStyles}) :
          <div key="secondaryText" style={styles.secondaryText}>{secondaryText}</div>
      );
    }

    return (
        <li
          {...other}
          onKeyboardFocus={this._handleKeyboardFocus}
          onMouseLeave={this._handleMouseLeave}
          onMouseEnter={this._handleMouseEnter}
          onTouchStart={this._handleTouchStart}
          style={mergedRootStyles}>
          <div style={mergedInnerDivStyles}>
            {contentChildren}
          </div>
        </li>
    );

  },

  _pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      let styles = this.mergeStyles(baseStyles, element.props.style);
      children.push(
        React.cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps,
        })
      );
    }
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    if (this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(e, isKeyboardFocused);
    }
  },

  _handleMouseEnter(e) {
    if (!this.state.touch) {
      this.setState({hovered: true});
    }
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }
  }

});

module.exports = CommitmentListItem;
