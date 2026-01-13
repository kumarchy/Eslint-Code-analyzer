pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        SF_DISABLE_TELEMETRY = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                  node -v
                  npm -v
                  npm install --legacy-peer-deps
                '''
            }
        }

        stage('Install Salesforce Code Analyzer') {
            steps {
                bat '''
                  sf plugins install @salesforce/code-analyzer
                  sf plugins
                '''
            }
        }

        stage('Run ESLint (LWC JS)') {
            steps {
                bat '''
                  npx eslint "force-app/**/*.js" -f html -o eslint-report.html || true
                '''
            }
        }

        stage('Run Salesforce Code Analyzer') {
            steps {
                bat '''
                  sf scanner run --format=csv --outfile=CodeScanReport.csv --target "./force-app" || true
                  sf scanner run dfa --format=csv --outfile=DFA_Report.csv --target "./force-app" || true
                  sf scanner run pmd --format=csv --outfile=PMD_Report.csv --target "./force-app" || true
                  sf scanner run lwc --format=csv --outfile=LWC_Report.csv --target "./force-app" || true
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '*.html, *.csv', fingerprint: true
        }

        unstable {
            echo '⚠️ Code quality issues detected'
        }

        failure {
            echo '❌ Pipeline failed'
        }

        success {
            echo '✅ Code quality scan completed successfully'
        }
    }
}
