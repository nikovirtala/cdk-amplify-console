import { Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from 'aws-cdk-lib/aws-amplify';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class AwsCdkAmplifyConsoleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const amplifyApp = new amplify.App(this, 'AmplifyConsoleDemo', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'nikovirtala',
        repository: 'amplify-console-demo',
        oauthToken: SecretValue.secretsManager('github-access-token'),
      }),
      autoBranchCreation: {
        patterns: ['*'],
        basicAuth: amplify.BasicAuth.fromGeneratedPassword('username'),
      },
      autoBranchDeletion: true,
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
    const dev = amplifyApp.addBranch('dev', {
      basicAuth: amplify.BasicAuth.fromGeneratedPassword('username'),
    });

    const domain = amplifyApp.addDomain('amplified.host');
    domain.mapRoot(master);
    domain.mapSubDomain(master, 'www');
    domain.mapSubDomain(dev);
  }
}
