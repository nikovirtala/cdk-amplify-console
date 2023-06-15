import { Stack, StackProps, SecretValue, aws_amplify, aws_codebuild } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as aws_amplify_alpha from '@aws-cdk/aws-amplify-alpha';

export class AwsCdkAmplifyConsoleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const amplifyApp = new aws_amplify_alpha.App(this, 'AmplifyConsoleDemo', {
      sourceCodeProvider: new aws_amplify_alpha.GitHubSourceCodeProvider({
        owner: 'nikovirtala',
        repository: 'amplify-console-demo',
        oauthToken: SecretValue.secretsManager('github-access-token'),
      }),
      autoBranchCreation: {
        patterns: ['*'],
        basicAuth: aws_amplify_alpha.BasicAuth.fromGeneratedPassword('username'),
      },
      autoBranchDeletion: true,
      buildSpec: aws_codebuild.BuildSpec.fromObject({
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
      basicAuth: aws_amplify_alpha.BasicAuth.fromGeneratedPassword('username'),
    });

    const domain = amplifyApp.addDomain('amplified.host');
    domain.mapRoot(master);
    domain.mapSubDomain(master, 'www');
    domain.mapSubDomain(dev);
  }
}
