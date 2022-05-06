# CodeBuild S3 Bucket
resource "aws_s3_bucket" "tf_codebuild_s3_bucket" {
  bucket = "pokemon-s3-build-bucket"
  acl    = "private"

  logging {
    target_bucket = aws_s3_bucket.pokemon-pipeline-s3-logs-bucket.id
    target_prefix = "logs/"
  }

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.pipeline_key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
}

# AWS S3 CodePipeline S3 Bucket
resource "aws_s3_bucket" "tf_codepipeline_s3_bucket" {
  bucket = "pokemon-s3-pipeline-bucket"
  acl    = "private"

  logging {
    target_bucket = aws_s3_bucket.pokemon-pipeline-s3-logs-bucket.id
    target_prefix = "logs/"
  }

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.pipeline_key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
}

resource "aws_s3_bucket" "pokemon-pipeline-s3-logs-bucket" {
  bucket = "pokemon-pipeline-s3-logs-bucket"
  # acl    = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.pipeline_key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }
}

resource "aws_kms_key" "pipeline_key" {
  description             = "This key is used to encrypt bucket objects"
  deletion_window_in_days = 10
  enable_key_rotation     = true
}