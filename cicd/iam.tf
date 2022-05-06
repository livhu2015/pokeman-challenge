# AWS Code IAM Role for Pipeline
resource "aws_iam_role" "tf-codepipeline-iam-role" {
  name = "pokemon_codepipeline_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Sid": ""
    }
  ]
}
EOF
}


#AWS IAM Policy document for Pipeline
data "aws_iam_policy_document" "tf-cicd-pipeline-policies" {
  statement {
    sid       = ""
    actions   = ["codestar-connections:UseConnection"]
    resources = ["*"]
    effect    = "Allow"
  }
  statement {
    sid       = ""
    actions   = ["cloud-watch:*", "s3:*", "codebuild:*"]
    resources = ["*"]
    effect    = "Allow"
  }
}

resource "aws_iam_policy" "pokemon-cicd-pipeline-policy" {
  name        = "pokemon-cicd-pipeline-policy"
  path        = "/"
  description = "pipeline policy"
  policy      = data.aws_iam_policy_document.tf-cicd-pipeline-policies.json
}

resource "aws_iam_role_policy_attachment" "tf-cicd-pipeline-attachment" {
  policy_arn = aws_iam_policy.pokemon-cicd-pipeline-policy.arn
  role       = aws_iam_role.tf-codepipeline-iam-role.id
}

# AWS Code IAM Role for Codebuild
resource "aws_iam_role" "tf-codebuild-iam-role" {
  name = "pokemon_codebuild_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Sid": ""
    }
  ]
}
EOF
}

#AWS IAM Policy document for CodeBuild
data "aws_iam_policy_document" "tf-cicd-codebuild-policies" {
  statement {
    sid       = ""
    actions   = ["logs:*", "s3:*", "codebuild:*", "secretsmanager:*", "iam:*"]
    resources = ["*"]
    effect    = "Allow"
  }
}

#AWS IAM Policy for CodeBuild
resource "aws_iam_policy" "pokeman-cicd-codebuild-policy" {
  name        = "pokemon-tf-cicd-codebuild-policy"
  path        = "/"
  description = "codebuild policy"
  policy      = data.aws_iam_policy_document.tf-cicd-codebuild-policies.json
}


resource "aws_iam_role_policy_attachment" "tf-cicd-codebuild-attachment-1" {
  policy_arn = aws_iam_policy.pokeman-cicd-codebuild-policy.arn
  role       = aws_iam_role.tf-codebuild-iam-role.id
}

resource "aws_iam_role_policy_attachment" "tf-cicd-codebuild-attachment2" {
  policy_arn = "arn:aws:iam::aws:policy/PowerUserAccess"
  role       = aws_iam_role.tf-codebuild-iam-role.id
}
