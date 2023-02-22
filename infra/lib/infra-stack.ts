import {
  RemovalPolicy,
  aws_s3 as s3,
  aws_s3_deployment as s3Deployment,
  aws_cloudfront as cloudFront,
  aws_cloudfront_origins as origins,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as lambda_node from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class InfraStack extends cdk.Stack {
  public readonly api: apigateway.RestApi;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const link = new lambda_node.NodejsFunction(this, "LinkHandler", {
      entry: "api/link.ts",
      handler: "lambdaHandler",
    });

    const thankYouMsg = new lambda_node.NodejsFunction(
      this,
      "ThankYouMsgHandler",
      {
        entry: "api/thankYouMsg.ts",
        handler: "lambdaHandler",
      }
    );
    // Code to generate an api gateway for the ThankYouMsg Lambda
    this.api = new apigateway.RestApi(this, "get description", {
      restApiName: "get description",
      description: "thank You message for sign up",
      binaryMediaTypes: ["*/*"],
      minimumCompressionSize: 0,
    });

    const apiResource = this.api.root.addResource("api");
    const thankYouMsgResource = apiResource.addResource("thankYou");
    const getThankYouMsg = new apigateway.LambdaIntegration(thankYouMsg, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    });

    thankYouMsgResource.addMethod("GET", getThankYouMsg);

    const myBuck = new s3.Bucket(this, "sign-up-bucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html",
      removalPolicy: RemovalPolicy.DESTROY,
      accessControl: s3.BucketAccessControl.PRIVATE,
      autoDeleteObjects: true,
    });

    //Deployment
    new s3Deployment.BucketDeployment(this, "CdkDeployBucket", {
      sources: [s3Deployment.Source.asset("../frontend/out")],
      destinationBucket: myBuck,
    });

    // create an Output
    const buckOutput = new cdk.CfnOutput(this, "bucketName", {
      value: myBuck.bucketName,
      description: "The name of the s3 bucket",
      exportName: "avatarsBucket",
    });

    console.log("output", buckOutput.value);
    //CD = CDN of AWS
    // Handles buckets whether or not they are configured for website hosting
    const cloud = new cloudFront.CloudFrontWebDistribution(
      this,
      "CfDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: { s3BucketSource: myBuck },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        enabled: true,
        defaultRootObject: "index.html",
      }
    );
  }
}