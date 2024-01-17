import * as cdk from 'aws-cdk-lib';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class CdkStaticsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'my-bucket-id', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const distribution = new Distribution(this, 'my-distribution-id', {
      defaultBehavior: { origin: new S3Origin(bucket) },
      defaultRootObject: 'index.html'
    });

    new CfnOutput(this, 'Distribution Domain', {
      value: distribution.distributionDomainName
    });

    new CfnOutput(this, 'Bucket name', {
      value: bucket.bucketName
    });
  }
}
