# cfn-featurestack

Simple utility for creating AWS CloudFormation featurestacks for feature branches


# Configuration

cfn-featurestack will by default use any locally pre-configured AWS account. You can pre-configure your
account by any of the following methods:

- With [aws-cli](https://aws.amazon.com/cli/), by running `aws-cli configure` (Recommended for
local environments)
- Set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_PROFILE` and `AWS_REGION` environment
variables (Recommended for server/container environments)
- Directly configure to  `.aws\config` and `.aws\credentials` files

Additionally, you can define your AWS access and secret keys as parameters, but this is not
recommended as they A) can end to version control or B) will stay readable in logs.


# Usage

cfn-featurestack will add `IsFeatureStack` parameter to your stack parameters, which enables you
to set conditions for CloudFormation not to create specific resources for featurestacks (such as
CloudFront distributions and Route53 domain names).

## Preparing CloudFormation template

1. Add `IsFeatureStack` parameter and conditions for it.

```yaml
Parameters:
  IsFeatureStack:
    Description: "Is this a feature stack. (Defaults to \"false\")"
    Type: String
    Default: "false"

Conditions:
  IsNotFeatureStack: !Equals [ !Ref IsFeatureStack, "false" ]
  IsFeatureStack: !Equals [ !Ref IsFeatureStack, "true" ]
```

2. Add `IsNotFeatureStack` to any resource that must be unique across stacks and cannot be
duplicated to feature stacks, such as CloudFront distributions and Route53 domain names.

```yaml
Resources:
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Condition: IsNotFeatureStack
    Properties:
      # ...
```


# Command line use

## Install

```bash
npm install cfn-featurestack -g
```

## Usage

```bash
cfn-featurestack --template=./cfn/cfn-stack.yaml
```

See [options](#options) for more details.



# Package.json script use

## Install

```bash
npm install cfn-featurestack --save-dev
```

## Usage

Add deploy script to `package.json`:

```json
{
  "scripts": {
    "deploy": "cfn-featurestack --template=./cfn/cfn-stack.yaml"
  }
}
```

See [options](#options) for more details.


# Options

## template

Path to template file

## parameters

Path to parameters file (.json). Multiple parameters options are allowed and values are combined
in the order they are defined, with values from latter overwriting previous

Valid .json files:

- `aws-cli cloudformation` type:

```json
[
  {
    "ParameterKey": "FirstParam",
    "ParameterValue": "first-param-value"
  },
  {
    "ParameterKey": "SecondParam",
    "ParameterValue": "second-param-value"
  }
]
```

- AWS CodePipeline parameters type:

```json
{
  "Parameters": {
    "FirstParam": "first-param-value",
    "SecondParam": "second-param-value"
  }
}
```

- Plain JSON object

```json
{
  "FirstParam": "first-param-value",
  "SecondParam": "second-param-value"
}
```

__Multiple parameters files__

```bash
cfn-featurestack --template=./cfn/cfn-stack.yaml --parameters=./cfn/params1.json --parameters=./cfn/params2.json
```


## region

AWS region

## capabilities

AWS IAM capabilities

Valid values:

- CAPABILITY_IAM
- CAPABILITY_NAMED_IAM

## profile

Load profile from shared credentials file (in `.aws\credentials`)

## access-key

AWS Access Key

## secret-key

AWS Secret Access Key

## version

Show version number

## help

Show help
