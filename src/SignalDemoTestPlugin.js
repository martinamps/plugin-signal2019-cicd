import React from 'react';
import Rollbar from 'rollbar';

import { FlexPlugin } from 'flex-plugin';
import SignalView from './components/SignalView/SignalView';

const PLUGIN_NAME = 'SignalDemoTestPlugin';

export default class SignalDemoTestPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerLogger();

    flex.CRMContainer.Content.replace(
      <SignalView key='signalView'
        manager={manager}
        workerClient={manager.workerClient}
        rollbarClient={this.Rollbar}
      />
    );
  }

  registerLogger() {
    this.Rollbar = new Rollbar({
      reportLevel: 'debug',
      accessToken: '8e2ab7acc8644bc38bcd7775306a1a33',
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
          environment: 'production'
      }
    });

    const myLogManager = new window.Twilio.Flex.Log.LogManager({
        spies: [{
                type: window.Twilio.Flex.Log.PredefinedSpies.ClassProxy,
                target: window.console,
                targetAlias: 'Proxied window.console',
                methods: ['log', 'debug', 'info', 'warn', 'error'],
                onStart: (proxy) => {
                    window.console = proxy;
                }
        }],
        storage: () => null,
        formatter: () => (entries) => entries[0],
        transport: () => ({
            flush: (entry) => {
                const collectedData = entry && entry.subject && entry.args;
                if (!collectedData) {
                    return;
                }

                const args = entry.args.join();
                const isRollbarMethod = typeof this.Rollbar[entry.subject] === 'function';

                if (isRollbarMethod) {
                    this.Rollbar[entry.subject](args);
                } else {
                    this.Rollbar.log(args);
                }
            }
        })
    });

    myLogManager.prepare().then(myLogManager.start);
  }
}
