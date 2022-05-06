
# AWS Code Build Project
resource "aws_codebuild_project" "my_project" {
  name          = "pokemon-cicd-codebuild"
  description   = "Pokemon pep Project"
  build_timeout = "5"
  service_role  = aws_iam_role.tf-codebuild-iam-role.arn

  artifacts {
    type     = "S3"
    location = aws_s3_bucket.tf_codebuild_s3_bucket.bucket

  }
  cache {
    type     = "S3"
    location = aws_s3_bucket.tf_codebuild_s3_bucket.bucket
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux2-x86_64-standard:3.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = "true"

    environment_variable {
      name  = "CLIENT_ECR_IMAGE_URL"
      value = "967411324500.dkr.ecr.eu-west-1.amazonaws.com/pokemon-client-ecr-repo"
    }

    environment_variable {
      name  = "SERVER_ECR_IMAGE_URL"
      value = "967411324500.dkr.ecr.eu-west-1.amazonaws.com/pokemon-server-ecr-repo"
    }

    environment_variable {
      name  = "CLIENT_ECR_ENDPOINT"
      value = "967411324500.dkr.ecr.eu-west-1.amazonaws.com"
    }
    environment_variable {
      name  = "SERVER_ECR_ENDPOINT"
      value = "967411324500.dkr.ecr.eu-west-1.amazonaws.com"
    }
  }

  logs_config {
    cloudwatch_logs {
      group_name  = "CodeBuild"
      stream_name = "codebuild-log-stream"
    }

    s3_logs {
      status   = "ENABLED"
      location = "${aws_s3_bucket.tf_codebuild_s3_bucket.id}/build-log"
    }
  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/livhu2015/pokeman-challenge.git"
    git_clone_depth = 1

    git_submodules_config {
      fetch_submodules = true
    }
  }
}

resource "aws_vpc" "pokemon_main_vpc" {
  cidr_block = "10.1.0.0/16"
  tags = {
    Name = "code pipeline main vpc"
  }
}

resource "aws_default_security_group" "security_group_default" {
  vpc_id = aws_vpc.pokemon_main_vpc.id

  ingress {
    protocol  = -1
    self      = true
    from_port = 0
    to_port   = 0
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_codestarconnections_connection" "code_star_connection" {
  name          = "git-pokemon-project-connection"
  provider_type = "GitHub"
}

data "aws_kms_alias" "s3kmskey" {
  name = "alias/aws/s3"
}

data "aws_codestarconnections_connection" "code_star_connection_data" {
  arn = aws_codestarconnections_connection.code_star_connection.arn
}