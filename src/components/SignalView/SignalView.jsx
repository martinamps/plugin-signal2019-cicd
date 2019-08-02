import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { SignalViewComponentStyles } from './SignalView.Styles';

class SignalView extends React.Component {
  
  constructor() {
    super();
    this.state = {
      attributes: {},
      logLevel: 'error'
    }
  }

  setLogLevel(level) {
    if (['trace', 'debug', 'info', 'warn', 'error', 'critical'].includes(level)) {
      console.log(`setting log level to ${level}`);
      this.props.manager.updateConfig({logLevel: level});
      this.props.rollbarClient.configure({reportLevel: level});
    }
  }

  componentDidMount() {
    const wc = this.props.workerClient;
    if (wc.attributes.logLevel !== this.state.logLevel) {
      this.setLogLevel(wc.attributes.logLevel);
    }

    wc.on('attributesUpdated', (e) => {
      this.setState({attributes: e.attributes});
      if (e.attributes.logLevel) {
         this.setLogLevel(e.attributes.logLevel);
      }
    });

    this.props.rollbarClient.configure({
      payload: {
        person: {
          id: wc.sid,
          account: wc.accountSid,
          workspace: wc.workspaceSid,
          identity: wc.attributes.contact_uri,
          branch: wc.attributes.branch
        }
      }
    });
  }

  render() {
    const attrs = this.props.workerClient.attributes;
    return (
      <SignalViewComponentStyles>
        <h1>Signal CICD & Devops</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attribute</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Object.keys(attrs).map((k, i) => (
              <TableRow key={i}>
                <TableCell>{k}</TableCell>
                <TableCell>{attrs[k]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SignalViewComponentStyles>
    );
  }
};

export default SignalView;
