import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AwsCdkAmplifyConsole from '../lib/aws-cdk-amplify-console-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsCdkAmplifyConsole.AwsCdkAmplifyConsoleStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
