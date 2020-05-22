import * as cdk from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as amplify from '@aws-cdk/aws-amplify';

export class AwsCdkAmplifyConsoleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, 'AmplifyConsoleDemo', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'nikovirtala',
        repository: 'amplify-console-demo',
        oauthToken: cdk.SecretValue.secretsManager('github-access-token'),
      }),
      autoBranchCreation: {
        patterns: ['*'],
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '1.0',
        frontend: {
          artifacts: {
            baseDirectory: '/',
            files: '**/*',
          },
        },
      }),
    });

    const master = amplifyApp.addBranch('master');
    const dev = amplifyApp.addBranch('dev');

    const domain = amplifyApp.addDomain('amplified.host');
    domain.mapRoot(master);
    domain.mapSubDomain(master, 'www');
    domain.mapSubDomain(dev);
  }
}
