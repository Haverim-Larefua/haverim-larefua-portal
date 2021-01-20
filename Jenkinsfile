/*
    Jenkins file for building the 'Friends For Help' project
    Author    : Yaron Golan <yaron.golan@intl.att.com>
	Created   : 24-Mar-2020
    Component : Portal
*/



//      +-----------------------------
//      |  Hard coded variables.
//      +-----------------------------
String dockerName        = "ffh_portal"
String gitRepoUrl        = "git@github.com:Haverim-Larefua/haverim-larefua-portal.git"
def    buildServers      = ['Dev': 'Dev', 'Prod': 'Prod']
def    backendAddresses  = ['Dev': 'http://40.123.217.231:3001', 'Prod': 'http://40.123.209.114:3001']




//      +-----------------------------
//      |  Jenkins job parameters.
//      +-----------------------------
properties ([
    parameters([
        choice (name: 'TARGET_ENV', choices: 'Dev\nProd', description: "Environment name"),
    ]),
])

String prmTargetEnv = params.TARGET_ENV
String nodeName     = buildServers[prmTargetEnv]



//      +-----------------------------
//      |  Global variables.
//      +-----------------------------
String backendUrl
String dockerVersion




node (nodeName) {
	
	try {

        stage ("Init") {

            banner(env.STAGE_NAME)


            currentBuild.result = 'SUCCESS'


            // Set the build server's name.
            currentBuild.description = "Environment = ${nodeName}"

			// Set the backend URL according to the env.
			backendUrl = backendAddresses[prmTargetEnv]
		}


		
		stage ("Source control") {
			
			banner (env.STAGE_NAME)
			
			git credentialsId: 'ffh_user', url: gitRepoUrl
		}
		
		
		
		stage ("Compilation") {
			
			banner (env.STAGE_NAME)
			
			// Get the application version
			dockerVersion = sh returnStdout: true, script: """
				jq -r ".version" package.json
			"""
			
			// Build the docker image.
			sh """
				docker build . --build-arg BACKEND_URL=${backendUrl} -t ${dockerName}:${dockerVersion}
			"""
		}
		
		
		
		stage ("Deploy") {
			
			banner (env.STAGE_NAME)
			
			sh """
				
				### Remove the old container, if exists.
				containers=\$(docker ps -a | grep ${dockerName} | wc -l)
				if [ \${containers} -eq 1 ]; then
					docker rm -f ${dockerName}
				fi
				
				
				### Create a container from the image
				docker run -d --name ${dockerName} -p 80:80 --restart=unless-stopped ${dockerName}:${dockerVersion}
			"""
		}
	}
	catch (Exception ex) {
		errorMessage = ex.getMessage()
		error (String.format("Exception was caught - [%s]", errorMessage))
	}
} // node






@NonCPS
def banner(message) {

    int MAX_MESSAGE_LENGTH = 100

    int messageLength = message.length();

    String dashesLine = ""

    String messageFormat

    if (messageLength <= MAX_MESSAGE_LENGTH) {

        messageFormat = '\t\t\n%s\n|    %s    |\n%s\n'

        for (int i=0 ; i<messageLength+8 ; i++) {
            dashesLine += "-"
        }

        dashesLine = "+" + dashesLine + "+"
    }
    else {
        messageFormat = '\t\t\n%s\n|    %s\n%s\n'
        dashesLine = "+----"
    }

    message = String.format (messageFormat, dashesLine, message, dashesLine)
    println (message)
}




