# Configure AWS Amplify Console with AWS CDK

## TL;DR

In this example, I'll show you how to configure AWS Amplify Console using the AWS Cloud Development Kit (CDK).

This example enables the following configuration:

- Connect to the page [source repository](https://github.com/nikovirtala/amplify-console-demo/) in GitHub
- Enable deployment from `master` and `dev` branches
- Enable feature branch preview deployments
- Deploy artifacts from source repository root and subfolders
- Configure custom domain `amplified.host`
  - `master` branch: https://amplified.host
  - `dev` branch: https://dev.amplified.host

All this configuration is done on: `lib/aws-cdk-amplify-console-stack.ts`

The sample code reads the GitHub Personal Access Token from AWS Secrets Manager. You can store the secret there, using the following CLI command:

`aws secretsmanager create-secret --name github-access-token --secret-string <github-personal-access-token>`

## The Stack

### AWS Amplify Console

> The [AWS Amplify Console](https://aws.amazon.com/amplify/console/) provides a Git-based workflow for hosting fullstack serverless web apps with continuous deployment. A fullstack serverless app consists of a backend built with cloud resources such as GraphQL or REST APIs, file and data storage, and a frontend built with single page application frameworks such as React, Angular, Vue, or Gatsby.
>
> AWS Amplify Console supports common Single Page App (SPA) frameworks (e.g. React, Angular, Vue.js, Ionic, Ember), as well as static-site generators like Gatsby, Eleventy, Hugo, VuePress, and Jekyll.

### AWS Cloud Development Kit

> The [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/index.html) (AWS CDK) is a software development framework for defining your cloud infrastructure in code and provisioning it through AWS CloudFormation.

In my example we use Typescript, and the project was inited with the command: `cdk init app --language typescript`

### `aws-amplify` CDK Module

In this example we use [aws-amplify CDK module](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-amplify-readme.html).

### GitHub Actions

![](https://github.com/nikovirtala/aws-cdk-amplify-console/workflows/Deploy%20to%20AWS%20Amplify%20Console/badge.svg)

## To-Do

- [ ] Complete the GitHub Actions workflow

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with the current state
- `cdk synth` emits the synthesized CloudFormation template
