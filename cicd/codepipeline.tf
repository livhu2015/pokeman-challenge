
# AWS Code Pipeline
resource "aws_codepipeline" "tf_codepipeline" {
  name     = "pokemon-cicd-pipeline"
  role_arn = aws_iam_role.tf-codepipeline-iam-role.arn


  artifact_store {
    location = aws_s3_bucket.tf_codepipeline_s3_bucket.bucket
    type     = "S3"

    encryption_key {
      id   = data.aws_kms_alias.s3kmskey.arn
      type = "KMS"
    }
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["sourceOut"]

      configuration = {
        ConnectionArn    = aws_codestarconnections_connection.code_star_connection.arn
        FullRepositoryId = "livhu2015/pokeman-challenge"
        BranchName       = "main"

      }
    }
  }

  stage {
    name = "Build"

    action {
      name            = "Build"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      input_artifacts = ["sourceOut"]
      # output_artifacts = ["buildOut"]
      version = "1"

      configuration = {
        ProjectName = "pokemon-cicd-codebuild"
      }
    }
  }
}