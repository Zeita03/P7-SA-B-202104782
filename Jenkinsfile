pipeline {
    agent any

    environment {
        MS1_USERS_IMAGE = "zeita/ms1-p7"
        MS2_PRODUCTS_IMAGE = "zeita/ms2-p7"
        MS3_ORDERS_IMAGE = "zeita/ms3-p7"
        MS4_PAYMENTS_IMAGE = "zeita/ms4-p7"
        
        PROJECT_ID = 'proyecto-sa-455021'
        CLUSTER_NAME = 'cluster-p6'
        LOCATION = 'us-central1-a'
        CREDENTIALS_ID = 'gcp-p7'
        NAMESPACE = 'sa-p7'
    }

    tools {
        nodejs 'node22'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

            stage('Create images name') {
                steps {
                    script {
                        // Obtenemos el hash del commit actual
                        def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                        
                        // Variable de entorno con commit hash
                        env.GIT_HASH = commitHash

                        env.MS1_TAG = "${env.MS1_USERS_IMAGE}:${env.GIT_HASH}"
                        env.MS2_TAG = "${env.MS2_PRODUCTS_IMAGE}:${env.GIT_HASH}"   
                        env.MS3_TAG = "${env.MS3_ORDERS_IMAGE}:${env.GIT_HASH}"
                        env.MS4_TAG = "${env.MS4_PAYMENTS_IMAGE}:${env.GIT_HASH}"                 
                    }
                }
            }

            stage('Docker Build Images') {
                steps {
                    dir('microservice_1') {
                        sh "docker build -t ${MS1_TAG} ."
                    }
                    dir ('microservice_2') {
                        sh "docker build -t ${env.MS2_TAG} ."
                    }
                    dir ('microservice_3') {
                        sh "docker build -t ${env.MS3_TAG} ."
                    }
                    dir ('microservice_4') {
                        sh "docker build -t ${env.MS4_TAG} ."
                    }
                }
            }


            

            stage('Pull a DOCKER HUB') {
                steps {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker push $MS1_TAG
                        '''
                    }
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker push $MS2_TAG
                        '''
                    }
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker push $MS3_TAG
                        '''
                    }
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker push $MS4_TAG
                        '''
                    }
                }
            }
             
        
        stage('Google K8s Engine') {
            steps {
                sh "sed -i 's|image_ms1|${MS1_TAG}|g' ./k8s/microservice_1.yaml"

                step([$class: 'KubernetesEngineBuilder', 
                        projectId: env.PROJECT_ID, 
                        clusterName: env.CLUSTER_NAME, 
                        location: env.LOCATION,
                        manifestPattern: './k8s/microservice_1.yaml',
                        credentialsId: env.CREDENTIALS_ID,
                        verifyDeployments: false])

                sh "sed -i 's|image_ms2|${MS2_TAG}|g' ./k8s/microservice_2.yaml"

                step([$class: 'KubernetesEngineBuilder', 
                        projectId: env.PROJECT_ID, 
                        clusterName: env.CLUSTER_NAME, 
                        location: env.LOCATION,
                        manifestPattern: './k8s/microservice_2.yaml',
                        credentialsId: env.CREDENTIALS_ID,
                        verifyDeployments: false])

                sh "sed -i 's|image_ms3|${MS3_TAG}|g' ./k8s/microservice_3.yaml"

                step([$class: 'KubernetesEngineBuilder', 
                        projectId: env.PROJECT_ID, 
                        clusterName: env.CLUSTER_NAME, 
                        location: env.LOCATION,
                        manifestPattern: './k8s/microservice_3.yaml',
                        credentialsId: env.CREDENTIALS_ID,
                        verifyDeployments: false])

                sh "sed -i 's|image_ms4|${MS4_TAG}|g' ./k8s/microservice_4.yaml"

                step([$class: 'KubernetesEngineBuilder', 
                        projectId: env.PROJECT_ID, 
                        clusterName: env.CLUSTER_NAME, 
                        location: env.LOCATION,
                        manifestPattern: './k8s/microservice_4.yaml',
                        credentialsId: env.CREDENTIALS_ID,
                        verifyDeployments: false])
            }
        }
    }

    post {
        always {
            echo 'Done pipeline'
        }
        success {
            echo 'Everything went well ✅'
        }
        failure {
            echo 'Fail ❌'
        }
    }
}