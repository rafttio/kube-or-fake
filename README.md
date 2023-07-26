![Kube or Fake?](resources/kube-or-fake.gif)

---

<p align="center">
<a href="https://github.com/rafttio/kube-or-fake/actions/workflows/pages/pages-build-deployment"><img src="https://github.com/rafttio/kube-or-fake/actions/workflows/pages/pages-build-deployment/badge.svg"></a>
<br><br>
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue">

<center><b>Kube or Fake?</b> is an entertaining mini-game, where the player's goal is to correctly guess whether a ChatGPT generated word is a real Kubernetes term, or made up.

<h6 align="center">Play @ https://kube-or-fake.raftt.io</h6>
Don't forget to share your results on LinkedIn / Twitter !</center>

---

## Create Your Own *Kube or Fake?* 🧑‍💻

### Requirements

- Python

- npm

- Docker

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)  
```shell
brew install aws/tap/aws-sam-cli
```

### Getting Started

1. Fork this repository
2. Install dependencies  
```shell
npm install
```

### Developing the ChatGPT Generator AWS Lambda

This repository includes the files needed to run the AWS Lambda locally, and deploy it to AWS using a CloudFormation template.

#### Configuring the AWS Lambda

1. In `template.yml`, provide values for the environment variables `OPENAI_API_KEY` and `OPENAI_MODEL_NAME`.

2. Create a local Lambda Layer for the `openai` Python package:  
```shell
pip install -r requirements.txt -t libs/python
```

#### Running the AWS Lambda Locally

The Lambda can be run locally using `sam`:
```shell
sam local start-api
```

This command starts a server running in `localhost:3000`. The command output should look like this:
```
Mounting GenerateKubernetesTermFunction at http://127.0.0.1:3000/generate [GET]                                                                                                                                    
You can now browse to the above endpoints to invoke your functions. You do not need to restart/reload SAM CLI while working on your functions, changes will be reflected instantly/automatically. If you used sam  
build before running local commands, you will need to re-run sam build for the changes to be picked up. You only need to restart SAM CLI if you update your AWS SAM template                                       
2023-07-20 11:58:51 WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:3000
2023-07-20 11:58:51 Press CTRL+C to quit
```

When the Lambda is invoked via `localhost:3000/generate`, some more logs are shown:
```
Invoking lambda.lambda_handler (python3.10)
OpenAILambdaLayer is a local Layer in the template
Local image is up-to-date
Building image.....................
Using local image: samcli/lambda-python:3.10-x86_64-b22538ac72603f4028703c3d1.

Mounting kube-or-fake/lambda as /var/task:ro,delegated, inside runtime container
START RequestId: b1c733b3-8449-421b-ae6a-fe9ac2c86022 Version: $LATEST
END RequestId: b1c733b3-8449-421b-ae6a-fe9ac2c86022
REPORT RequestId: b1c733b3-8449-421b-ae6a-fe9ac2c86022
```

_Note:_ You may be requested to provide your local machine credentials to allow `sam` interacting with your local docker daemon.

The Lambda code exists in `lambda/lambda.py`, with `lambda_handler` being the, well, handler. Feel free to explore with it!

Be aware that the Lambda docker image will be built upon each invocation, and as such there's no need to re-run `sam  local start-api` when making changes to the Lambda code (changes to `template.yml` _do_ require a re-run though).

#### Deploying to AWS Lambda

We do this using `sam` as well:

```shell
sam build
sam deploy
```

Follow the command's output to see where your new Lambda is created.

### Invoking the Lambda from Game Code (JS)

In `scripts/words.js`, change `GENERATOR_URL` to either `http://127.0.0.1:3000/generate` (if running locally) or your remote Lambda URL.

Open up `index.html` on any browser and start playing. If configured correctly, you should see the Lambda invocations (either via local logs or CloudWatch).

