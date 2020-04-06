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
def    buildServers      = ['Dev': 'master',         'Prod': 'HL-PROD']
def    backendAddresses  = ['Dev': '40.122.211.186', 'Prod': '40.83.20.23']




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
			
			git credentialsId: 'HL_Aadmin', url: gitRepoUrl
		}
		
		
		
		stage ("Compilation") {
			
			banner (env.STAGE_NAME)
			
			// Get the application version
			dockerVersion = sh returnStdout: true, script: """
				jq -r ".version" package.json
			"""
			
			// Build the docker image.
			sh """
				docker build . -t ${dockerName}:${dockerVersion}
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
				docker create --name ${dockerName} -p 3000:3000 -e REACT_APP_BACKEND_URL=http://${backendUrl}:3001 ${dockerName}:${dockerVersion}


				### Start the container.
				docker start ${dockerName}
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



