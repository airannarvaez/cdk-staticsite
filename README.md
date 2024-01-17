# Welcome to your CDK TypeScript Workshop

In this workshop, we will explore the power of the AWS Cloud Development Kit (CDK) and learn how to build infrastructure as code using TypeScript. The CDK is a modern open-source framework that enables developers to define cloud resources using familiar programming languages.

CDK apps are composed of **stacks**. Stacks are logical groupings of cloud resources. Each stack is responsible for deploying a group of cloud resources.

## Prerequisites:

- An AWS account with permissions to create resources
- A local development environment with AWS CLI installed and configured
- A local development environment with NodeJs
- A local development environment with Typescript:

```
    npm install -g typescript
```

- A local development environment with AWS CDK installed:

```
    npm install -g aws-cdk
```

- Prepare environment for CDK deployments:

```
    cdk bootstrap
```

## Step 1: Start new CDK Project

1. Create a new folder for your CDK project in your local environment and navigate to it from your terminal (e.g. `mkdir cdk-workshop; cd cdk-workshop`)
2. Run the following command to create a new CDK project in TypeScript:

```
    cdk init app --language typescript
```

3. Once the initialization is complete, you can open the folder in your favorite code editor.

## Step 2: Add Resources to Stack

1. Find and open the file located in `lib` folder (e.g. `cdk-workshop-stack.ts`)
2. Define a new bucket in the class constructor

```
    const bucket = new Bucket(this, 'my-bucket-id', {
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        encryption: BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        versioned: true,
        removalPolicy: RemovalPolicy.DESTROY
    });
```

3. Define a new cloudfront distribution

```
    const distribution = new Distribution(this, 'my-distribution-id', {
        defaultBehavior: { origin: new S3Origin(bucket) },
        defaultRootObject: 'index.html'
    });
```

4. Define outputs for the resources

```
    new CfnOutput(this, 'Distribution Domain', {
        value: distribution.distributionDomainName
    });


    new CfnOutput(this, 'Bucket name', {
        value: bucket.bucketName
    });
```

5. Save file

## Step 3: Synth and Deploy

1. Synthesize the CDK project:

- From the terminal, run the following command:

```
    cdk synth
```

2. Deploy the CDK project:

- From the terminal, run the following command:

```
    cdk deploy
```

## Step 4: Test

1. Create a `index.html` file with this code:

```
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <title>CDK Workshop</title>
        </meta>

    <body>

        <h1>Welcome to your CDK TypeScript Workshop</h1>
        <p>This is a static site</p>

    </body>

    </html>
```

2. Copy the BucketName from the Output section of the CDK deployment.
3. Upload `index.html` file to bucket with AWS CLI:

```
    aws s3 cp index.html s3://<bucket_name>/
```

4. Copy the DistributionDomainName from the Output section of the CDK deployment.
5. Visit the DistributionDomainName in the browser.
